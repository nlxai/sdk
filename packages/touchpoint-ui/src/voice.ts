import { type ConversationHandler } from "@nlxai/chat-core";
import { Room, RoomEvent, Track, type RemoteTrack } from "livekit-client";

export const startVoice = async (
  handler: ConversationHandler,
): Promise<Room | null> => {
  try {
    const room = new Room();

    const creds = await handler.getLiveKitCredentials();

    const handleTrackSubscribed = (track: RemoteTrack) => {
      if (track.kind === Track.Kind.Audio) {
        const element = track.attach();
        document.body.appendChild(element);
      }
    };

    room.prepareConnection(creds.url, creds.token);
    room.on(RoomEvent.TrackSubscribed, handleTrackSubscribed);
    room.localParticipant.setMicrophoneEnabled(true);
    await room.connect(creds.url, creds.token, { autoSubscribe: true });
    room.startAudio();
    return room;
  } catch (err) {
    handler.terminateLiveKitCall();
    return null;
  }
};
