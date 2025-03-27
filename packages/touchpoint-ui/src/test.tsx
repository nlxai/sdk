import { create } from "./index";
import { Room, RoomEvent, Track, type RemoteTrack } from "livekit-client";

/**
curl 'https://bots.dev.studio.nlx.ai/c/kQwAgKCx86vJ4r0PUSxYR/ON4zgwWnVofsz2NaiD38Z/terminateVoice' \
  -H 'accept: application/json' \
  -H 'accept-language: en-US,en;q=0.9' \
  -H 'content-type: application/json' \
  -H 'dnt: 1' \
  -H 'nlx-api-key: XDE2Th70VhBSlhz2YA' \
  -H 'nlx-conversation-id: 6e630bb0-4c6f-4589-8426-82a15f4d98ca' \
  -H 'nlx-sdk-version: 1.0.4' \
  -H 'origin: http://localhost:5173' \
  -H 'priority: u=1, i' \
  -H 'referer: http://localhost:5173/' \
  -H 'sec-ch-ua: "Not:A-Brand";v="24", "Chromium";v="134"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: cross-site' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36' \
  --data-raw '{"languageCode":"en-US"}'
 */

const init = async () => {
  const instance = await create({
    config: {
      applicationUrl:
        "https://bots.dev.studio.nlx.ai/c/kQwAgKCx86vJ4r0PUSxYR/ON4zgwWnVofsz2NaiD38Z",
      headers: {
        "nlx-api-key": "XDE2Th70VhBSlhz2YA",
      },
      userId: "1234-5678",
      languageCode: "en-US",
    },
  });

  const handler = instance.conversationHandler;

  try {
    const room = new Room();

    const creds = await handler.getLiveKitCredentials();

    let isConnected = false;

    const handleTrackSubscribed = (track: RemoteTrack) => {
      if (track.kind === Track.Kind.Audio) {
        const element = track.attach();
        document.body.appendChild(element);
      }
    };

    document.addEventListener("click", async () => {
      if (isConnected) {
        return;
      }
      isConnected = true;
      room.prepareConnection(creds.url, creds.token);
      room.on(RoomEvent.TrackSubscribed, handleTrackSubscribed);
      room.localParticipant.setMicrophoneEnabled(true);
      await room.connect(creds.url, creds.token, { autoSubscribe: true });
      room.startAudio();
    });
  } catch (err) {
    handler.terminateLiveKitCall();
  }
};

init();
