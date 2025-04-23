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

type VoiceRoomState = "inactive" | "pending" | "active" | "error";

interface VoiceHookReturn {
  roomState: VoiceRoomState;
  isUserSpeaking: boolean;
  isApplicationSpeaking: boolean;
}

export const useVoice = ({
  active,
  handler,
}: {
  active: boolean;
  handler: ConversationHandler;
}): VoiceHookReturn => {
  const roomRef = useRef<Room | null>(null);

  const [roomState, setRoomState] = useState<VoiceRoomState>("inactive");

  const [isUserSpeaking, setIsUserSpeaking] = useState<boolean>(false);
  const [isApplicationSpeaking, setIsApplicationSpeaking] =
    useState<boolean>(false);

  const disconnect = useCallback(() => {
    roomRef.current?.disconnect().catch((err) => {
      // eslint-disable-next-line no-console
      console.warn(err);
    });
    roomRef.current = null;
  }, []);

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

  useEffect(() => {
    if (!active) {
      disconnect();
      return;
    }
    const setup = async (): Promise<void> => {
      try {
        const room = new Room();

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
        handler.terminateLiveKitCall().catch((err) => {
          // eslint-disable-next-line no-console
          console.warn(err);
        });
      }
    };
    // This function call will never throw, therefore the floating promises rule should not apply
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    setup();
  }, [
    active,
    disconnect,
    setRoomState,
    handler,
    setIsUserSpeaking,
    setIsApplicationSpeaking,
  ]);

  return { roomState, isUserSpeaking, isApplicationSpeaking };
};
