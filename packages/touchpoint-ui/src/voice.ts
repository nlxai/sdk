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
import { useCallback, useEffect, useMemo, useState } from "react";
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

export const useVoice = ({
  active,
  micEnabled,
  handler,
}: {
  active: boolean;
  micEnabled: boolean;
  handler: ConversationHandler;
}): VoiceHookReturn => {
  const room = useMemo(() => {
    return new Room();
  }, []);

  const [roomState, setRoomState] = useState<VoiceRoomState>("inactive");

  const [isUserSpeaking, setIsUserSpeaking] = useDebouncedState<boolean>(
    false,
    600,
  );

  const [soundCheck, setSoundCheck] = useState<SoundCheck | null>(null);

  useEffect(() => {
    // TODO: stress-test this before enabling
    // room.localParticipant.setMicrophoneEnabled(micEnabled);
  }, [micEnabled]);

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
            .filter((device) => device.kind === "audiooutput")
            .map((device) => device.label),
          speakerNames: devices
            .filter((device) => device.kind === "audioinput")
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
    room.disconnect().catch((err) => {
      // eslint-disable-next-line no-console
      console.warn(err);
    });
  }, [room]);

  useEffect(() => {
    disconnect();
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
          element.play().catch((err) => {
            // eslint-disable-next-line no-console
            console.warn(err);
          });
        }
      };

      const handleIsSpeakingChanged = (speaking: boolean): void => {
        setIsUserSpeaking(speaking);
      };

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
  }, [
    room,
    setRoomState,
    handler,
    setIsUserSpeaking,
    setIsApplicationSpeaking,
  ]);

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
