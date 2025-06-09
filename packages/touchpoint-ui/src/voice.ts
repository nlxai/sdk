/* eslint-disable jsdoc/require-jsdoc */
import type {
  Context,
  ConversationHandler,
  Modalities,
} from "@nlxai/chat-core";
import { useDebouncedState } from "@react-hookz/web";
import {
  ParticipantEvent,
  Room,
  RoomEvent,
  Track,
  type Participant,
  type RemoteTrack,
} from "livekit-client";
import { useCallback, useEffect, useRef, useState } from "react";

type VoiceRoomState =
  | "inactive"
  | "pending"
  | "active"
  | "error"
  | "terminated";

export interface SoundCheck {
  micAllowed: boolean;
  micNames: string[];
  speakerNames: string[];
}

interface VoiceHookReturn {
  roomState: VoiceRoomState;
  isUserSpeaking: boolean;
  isApplicationSpeaking: boolean;
  soundCheck: null | SoundCheck;
  roomData: any;
}

interface UseVoiceParams {
  active: boolean;
  micEnabled: boolean;
  speakersEnabled: boolean;
  handler: ConversationHandler;
  context?: Context;
}

export interface ModalitiesWithContext {
  modalities: Modalities;
  from?: string;
  timestamp: number;
}

const decodeModalities = (val: Uint8Array): Modalities | null => {
  const decoded = new TextDecoder().decode(val);
  if (decoded !== null && typeof decoded === "object") {
    return decoded;
  }
  try {
    const parsed = JSON.parse(decoded);
    if (parsed === null || typeof decoded !== "object") {
      throw new Error("Invalid parsed");
    }
    return parsed;
  } catch (err) {
    return null;
  }
};

export const useVoice = ({
  active,
  micEnabled,
  speakersEnabled,
  handler,
  context,
}: UseVoiceParams): VoiceHookReturn => {
  const roomRef = useRef<Room | null>(null);

  const [roomState, setRoomState] = useState<VoiceRoomState>("inactive");

  const [isUserSpeaking, setIsUserSpeaking] = useDebouncedState<boolean>(
    false,
    600,
  );

  const audioElementRef = useRef<HTMLMediaElement | null>(null);

  const [soundCheck, setSoundCheck] = useState<SoundCheck | null>(null);

  const [roomData, setRoomData] = useState<ModalitiesWithContext | null>(null);

  useEffect(() => {
    const room = roomRef.current;
    if (room == null) {
      return;
    }
    room.localParticipant.setMicrophoneEnabled(micEnabled).catch((err) => {
      // eslint-disable-next-line no-console
      console.warn(err);
    });
  }, [micEnabled]);

  useEffect(() => {
    const audioElement = audioElementRef.current;
    if (audioElement == null) {
      return;
    }
    audioElement.volume = speakersEnabled ? 1 : 0;
  }, [speakersEnabled]);

  useEffect(() => {
    const checkMic = async (): Promise<void> => {
      try {
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const devices = await navigator.mediaDevices.enumerateDevices();
        const speakers = devices
          .filter((device) => device.kind === "audiooutput")
          .map((device) => device.label);
        setSoundCheck({
          micAllowed: true,
          micNames: devices
            .filter((device) => device.kind === "audioinput")
            .map((device) => device.label),
          speakerNames:
            // Safari does not return speaker names, so we default to just assuming there is a system default speaker
            speakers.length > 0 ? speakers : ["System Default Speaker Device"],
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn(err);
        setSoundCheck({
          micAllowed: false,
          micNames: [],
          speakerNames: [],
        });
      }
    };

    // This function call will never throw, therefore the floating promises rule should not apply
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    checkMic();
  }, [setSoundCheck]);

  const [isApplicationSpeaking, setIsApplicationSpeaking] =
    useDebouncedState<boolean>(false, 600);

  const disconnect = useCallback(() => {
    if (roomRef.current == null) {
      return;
    }
    roomRef.current.disconnect().catch((err) => {
      // eslint-disable-next-line no-console
      console.warn(err);
    });
    void handler.terminateVoiceCall();
    roomRef.current = null;
    // Not 100% sure this is necessary but it seems to help
    if (audioElementRef.current != null) {
      audioElementRef.current.pause();
      audioElementRef.current = null;
    }
    setRoomData(null);
  }, [setRoomData]);

  useEffect(() => {
    const handleBeforeUnload = (): void => {
      disconnect();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [disconnect]);

  const setupRoom = useCallback(async (): Promise<void> => {
    try {
      setRoomState("pending");

      const creds = await handler.getVoiceCredentials(context);

      const handleActiveSpeakersChanged = (
        participants: Participant[],
      ): void => {
        const hasAgent = participants.some(
          (participant) => participant.isAgent,
        );
        const hasLocal = participants.some(
          (participant) => participant.isLocal,
        );
        setIsApplicationSpeaking(hasAgent);
        setIsUserSpeaking(hasLocal);
      };

      const handleTrackSubscribed = (track: RemoteTrack): void => {
        if (track.kind === Track.Kind.Audio) {
          const element = track.attach();
          void element.play();
          audioElementRef.current = element;
        }
      };

      const handleIsSpeakingChanged = (speaking: boolean): void => {
        setIsUserSpeaking(speaking);
      };

      const room = new Room();
      roomRef.current = room;

      await room.prepareConnection(creds.url, creds.token);
      room.on(RoomEvent.TrackSubscribed, handleTrackSubscribed);
      room.on(RoomEvent.ActiveSpeakersChanged, handleActiveSpeakersChanged);
      room.localParticipant.on(
        ParticipantEvent.IsSpeakingChanged,
        handleIsSpeakingChanged,
      );
      room.on(RoomEvent.Disconnected, () => {
        setRoomState("terminated");
        setIsUserSpeaking(false);
        setIsApplicationSpeaking(false);
        disconnect();
      });

      // Handle incoming data from the room/agent
      room.on(RoomEvent.DataReceived, (payload, participant) => {
        setRoomData({
          modalities: decodeModalities(payload) ?? {},
          from: participant?.identity,
          timestamp: Date.now(),
        });
      });

      await room.connect(creds.url, creds.token, { autoSubscribe: true });
      await room.localParticipant.setMicrophoneEnabled(true);
      await room.startAudio();
      setRoomState("active");
    } catch (err) {
      setRoomState("error");
      // eslint-disable-next-line no-console
      console.warn(err);
      handler.terminateVoiceCall().catch((err: any) => {
        // eslint-disable-next-line no-console
        console.warn(err);
      });
    }
  }, [setRoomState, handler, setIsUserSpeaking, setIsApplicationSpeaking]);

  useEffect(() => {
    if (active) {
      void setupRoom();
    }
    return disconnect;
  }, [active, disconnect, setupRoom]);

  return {
    roomState,
    isUserSpeaking,
    isApplicationSpeaking,
    soundCheck,
    roomData,
  };
};
