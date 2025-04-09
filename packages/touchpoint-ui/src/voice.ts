import { type ConversationHandler } from "@nlxai/chat-core";
import {
  Room,
  ParticipantEvent,
  RoomEvent,
  Track,
  type RemoteTrack,
} from "livekit-client";
import { useEffect, useRef, useState } from "react";

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

  useEffect(() => {
    roomRef.current?.disconnect();
  }, []);

  useEffect(() => {
    if (!active) {
      roomRef.current?.disconnect();
      roomRef.current = null;
      return;
    }
    const setup = async () => {
      try {
        const room = new Room();

        setRoomState("pending");

        const creds = await handler.getLiveKitCredentials();

        const handleTrackSubscribed = (track: RemoteTrack) => {
          if (track.kind === Track.Kind.Audio) {
            const element = track.attach();
            document.body.appendChild(element);
          }
        };

        const handleIsSpeakingChanged = (speaking: boolean) => {
          setIsUserSpeaking(speaking);
        };

        room.prepareConnection(creds.url, creds.token);
        room.on(RoomEvent.TrackSubscribed, handleTrackSubscribed);
        room.localParticipant.setMicrophoneEnabled(true);
        room.localParticipant.on(
          ParticipantEvent.IsSpeakingChanged,
          handleIsSpeakingChanged,
        );
        await room.connect(creds.url, creds.token, { autoSubscribe: true });
        setRoomState("active");
        room.startAudio();
        return room;
      } catch (err) {
        handler.terminateLiveKitCall();
        return null;
      }
    };
    setup();
  }, [active, setRoomState, handler]);

  return { roomState, isUserSpeaking };
};
