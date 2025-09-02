/* eslint-disable no-console */
/* eslint-disable jsdoc/require-jsdoc */
import type {
  Context,
  ConversationHandler,
  VoiceCredentials,
  ModalityPayloads,
} from "@nlxai/core";
import { useDebouncedState } from "@react-hookz/web";
import {
  ParticipantEvent,
  Room,
  RoomEvent,
  setLogLevel,
  Track,
  type Participant,
  type RemoteTrack,
} from "livekit-client";
import { useCallback, useEffect, useRef, useState } from "react";

export interface SoundCheck {
  micAllowed: boolean;
  micNames: string[];
  speakerNames: string[];
}

export interface ModalitiesWithContext {
  modalities: ModalityPayloads;
  from?: string;
  timestamp: number;
}

if (process.env.NODE_ENV === "development") {
  setLogLevel("info");
} else {
  setLogLevel("error");
}

const decodeModalities = (val: Uint8Array): ModalityPayloads | null => {
  const decoded = new TextDecoder().decode(val);
  if (decoded !== null && typeof decoded === "object") {
    return decoded;
  }
  try {
    const parsed = JSON.parse(decoded);
    if (parsed === null || typeof parsed !== "object") {
      throw new Error("Invalid parsed");
    }
    return parsed;
  } catch (err) {
    return null;
  }
};

// Voice

type VoiceRoomState =
  | "noAudioPermissions"
  | "pending"
  | "active"
  | "error"
  | "terminated";

interface VoiceHookReturn {
  roomState: VoiceRoomState;
  isUserSpeaking: boolean;
  isApplicationSpeaking: boolean;
  modalities: ModalitiesWithContext[];
  retry: () => Promise<void>;
}

interface VoiceHookParams {
  micEnabled: boolean;
  speakersEnabled: boolean;
  handler: ConversationHandler;
  context?: Context;
}

export const useVoice = ({
  handler,
  context,
  speakersEnabled,
  micEnabled,
}: VoiceHookParams): VoiceHookReturn => {
  const [roomState, setRoomState] = useState<VoiceRoomState>("pending");

  const [isUserSpeaking, setIsUserSpeaking] = useDebouncedState<boolean>(
    false,
    100,
  );

  const [isApplicationSpeaking, setIsApplicationSpeaking] =
    useDebouncedState<boolean>(false, 100);

  const [modalities, setModalities] = useState<ModalitiesWithContext[]>([]);

  const roomRef = useRef<Room | null>(null);

  const trackRef = useRef<RemoteTrack | null>(null);

  const streamRef = useRef<MediaStream | null>(null);

  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(
    null,
  );

  const disconnect = useCallback(async () => {
    const room = roomRef.current;
    if (room == null) {
      return;
    }
    if (trackRef.current != null) {
      trackRef.current.stop();
      trackRef.current = null;
    }
    if (streamRef.current != null) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      streamRef.current = null;
    }
    setAudioElement(null);
    roomRef.current = null;
    setModalities([]);
    handler.setRequestOverride(undefined);
    await room.disconnect();
  }, [setModalities, setAudioElement, handler]);

  useEffect(() => {
    const room = roomRef.current;
    if (room == null) {
      return;
    }
    void room.localParticipant.setMicrophoneEnabled(micEnabled);
  }, [micEnabled]);

  useEffect(() => {
    if (audioElement == null) {
      return;
    }
    const newVolume = speakersEnabled ? 1 : 0;
    audioElement.volume = newVolume;
  }, [audioElement, speakersEnabled]);

  const setup = useCallback(async (): Promise<void> => {
    setRoomState("pending");

    let creds: VoiceCredentials | null = null;

    try {
      creds = await handler.getVoiceCredentials(context);
    } catch (err) {
      setRoomState("error");
      return;
    }

    if (creds == null) {
      return;
    }

    const handleActiveSpeakersChanged = (participants: Participant[]): void => {
      const hasAgent = participants.some((participant) => participant.isAgent);
      const hasLocal = participants.some((participant) => participant.isLocal);
      setIsApplicationSpeaking(hasAgent);
      setIsUserSpeaking(hasLocal);
    };

    const handleTrackSubscribed = (track: RemoteTrack): void => {
      if (track.kind === Track.Kind.Audio) {
        trackRef.current = track;
        const element = track.attach();
        setAudioElement(element);
        void element.play();
      }
    };

    const handleIsSpeakingChanged = (speaking: boolean): void => {
      setIsUserSpeaking(speaking);
    };

    try {
      const room = new Room();
      roomRef.current = room;

      // prompt for permissions
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      room.on(RoomEvent.TrackSubscribed, handleTrackSubscribed);
      room.on(RoomEvent.ActiveSpeakersChanged, handleActiveSpeakersChanged);
      room.localParticipant.on(
        ParticipantEvent.IsSpeakingChanged,
        handleIsSpeakingChanged,
      );
      room.on(RoomEvent.MediaDevicesError, () => {
        console.info("media devices error");
      });
      room.on(RoomEvent.Disconnected, () => {
        setRoomState("terminated");
        setIsUserSpeaking(false);
        setIsApplicationSpeaking(false);
        void disconnect();
      });

      handler.setRequestOverride((req) => {
        const encoder = new TextEncoder();
        const encodedData = encoder.encode(JSON.stringify(req.request));
        room.localParticipant.publishData(encodedData).catch((err) => {
          console.error("Failed to publish data to LiveKit:", err);
        });
      });

      // Handle incoming data from the room/agent
      room.on(RoomEvent.DataReceived, (payload, participant) => {
        setModalities((prev) => [
          ...prev,
          {
            modalities: decodeModalities(payload) ?? {},
            from: participant?.identity,
            timestamp: Date.now(),
          },
        ]);
      });

      await room.connect(creds.url, creds.token, { autoSubscribe: true });

      await room.localParticipant.setMicrophoneEnabled(true);

      void room.startAudio();
      setRoomState("active");
    } catch (err) {
      if (err instanceof DOMException && err.name === "NotAllowedError") {
        setRoomState("noAudioPermissions");
      } else {
        setRoomState("error");
      }
    }
  }, [
    handler,
    context,
    setRoomState,
    setIsApplicationSpeaking,
    setAudioElement,
    setModalities,
    disconnect,
    setIsUserSpeaking,
  ]);

  const retry = async (): Promise<void> => {
    await disconnect();
    void setup();
  };

  useEffect(() => {
    void setup();
    return () => {
      void disconnect();
    };
  }, [setup, disconnect]);

  return {
    roomState,
    isUserSpeaking,
    isApplicationSpeaking,
    retry,
    modalities,
  };
};
