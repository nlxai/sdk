/* eslint-disable jsdoc/require-jsdoc */
import { type ConversationHandler } from "@nlxai/chat-core";
import {
  Room,
  ParticipantEvent,
  RoomEvent,
  Track,
  type RemoteTrack,
} from "livekit-client";
import { useCallback, useEffect, useRef, useState } from "react";

type VoiceRoomState = "inactive" | "pending" | "active";

interface VoiceHookReturn {
  roomState: VoiceRoomState;
  isUserSpeaking: boolean;
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

  const disconnect = useCallback(() => {
    roomRef.current?.disconnect().catch((err) => {
      // eslint-disable-next-line no-console
      console.warn(err);
    });
    roomRef.current = null;
  }, []);

  useEffect(() => {
    disconnect();
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

        const handleTrackSubscribed = (track: RemoteTrack): void => {
          if (track.kind === Track.Kind.Audio) {
            const element = track.attach();
            document.body.appendChild(element);
          }
        };

        const handleIsSpeakingChanged = (speaking: boolean): void => {
          setIsUserSpeaking(speaking);
        };

        await room.prepareConnection(creds.url, creds.token);
        await room.localParticipant.setMicrophoneEnabled(true);
        room.on(RoomEvent.TrackSubscribed, handleTrackSubscribed);
        room.localParticipant.on(
          ParticipantEvent.IsSpeakingChanged,
          handleIsSpeakingChanged,
        );
        await room.connect(creds.url, creds.token, { autoSubscribe: true });
        await room.startAudio();
        setRoomState("active");
      } catch (err) {
        // TODO: error handling
        // eslint-disable-next-line no-console
        console.warn(err);
        handler.terminateLiveKitCall().catch((err) => {
          // eslint-disable-next-line no-console
          console.warn(err);
          // eslint-disable-next-line no-console
          console.warn(err);
        });
      }
    };
    // This function will never throw, the catch is only there to make the linter happy
    setup().catch((err) => {
      // eslint-disable-next-line no-console
      console.warn(err);
    });
  }, [active, disconnect, setRoomState, handler]);

  return { roomState, isUserSpeaking };
};
