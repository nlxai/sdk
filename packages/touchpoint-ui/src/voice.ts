/* eslint-disable jsdoc/require-jsdoc */
import { type ConversationHandler } from "@nlxai/chat-core";
import {
  Room,
  ParticipantEvent,
  RoomEvent,
  Track,
  type Participant,
  type RemoteTrack,
} from "livekit-client";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebouncedState } from "@react-hookz/web";

type VoiceRoomState = "inactive" | "pending" | "active" | "error";

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
}

interface UseVoiceParams {
  active: boolean;
  micEnabled: boolean;
  speakersEnabled: boolean;
  handler: ConversationHandler;
}

export const useVoice = ({
  active,
  micEnabled,
  speakersEnabled,
  handler,
}: UseVoiceParams): VoiceHookReturn => {
  const roomRef = useRef<Room | null>(null);

  const [roomState, setRoomState] = useState<VoiceRoomState>("inactive");

  const [isUserSpeaking, setIsUserSpeaking] = useDebouncedState<boolean>(
    false,
    600,
  );

  const audioElementRef = useRef<HTMLMediaElement | null>(null);

  const [soundCheck, setSoundCheck] = useState<SoundCheck | null>(null);

  // TODO: evaluate how this can be added reliably
  /* useEffect(() => {
    const room = roomRef.current;
    if (room == null) {
      return;
    }
    room.localParticipant.setMicrophoneEnabled(micEnabled).catch((err) => {
      console.warn(err);
    });
  }, [micEnabled]); */

  // TODO: evaluate how this can be added reliably
  /* useEffect(() => {
    const audioElement = audioElementRef.current;
    if (audioElement == null) {
      return;
    }
    audioElement.volume = speakersEnabled ? 1 : 0;
  }, [speakersEnabled]); */

  useEffect(() => {
    const checkMic = async (): Promise<void> => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setSoundCheck({
          micAllowed: true,
          micNames: devices
            .filter((device) => device.kind === "audioinput")
            .map((device) => device.label),
          speakerNames: devices
            .filter((device) => device.kind === "audiooutput")
            .map((device) => device.label),
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
    roomRef.current?.disconnect().catch((err) => {
      // eslint-disable-next-line no-console
      console.warn(err);
    });
    roomRef.current = null;
  }, []);

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

      const creds = await handler.getLiveKitCredentials();

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

      await room.connect(creds.url, creds.token, { autoSubscribe: true });
      await room.localParticipant.setMicrophoneEnabled(true);
      await room.startAudio();
      setRoomState("active");
    } catch (err) {
      setRoomState("error");
      // eslint-disable-next-line no-console
      console.warn(err);
      handler.terminateLiveKitCall().catch((err: any) => {
        // eslint-disable-next-line no-console
        console.warn(err);
      });
    }
  }, [setRoomState, handler, setIsUserSpeaking, setIsApplicationSpeaking]);

  useEffect(() => {
    if (!active) {
      disconnect();
      return;
    }
    // This function call will never throw, therefore the floating promises rule should not apply
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    setupRoom();
  }, [active, disconnect, setupRoom]);

  return {
    roomState,
    isUserSpeaking,
    isApplicationSpeaking,
    soundCheck,
  };
};
