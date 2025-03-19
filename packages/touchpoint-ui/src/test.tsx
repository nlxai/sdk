import { create } from "./index";
import { Room } from "livekit-client";

const init = async () => {
  try {
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

    const room = new Room();

    const creds = await handler.getLiveKitCredentials();

    document.addEventListener("click", () => {
      console.log("hello");
      room.prepareConnection(creds.url, creds.token);
      room.localParticipant.setMicrophoneEnabled(true);
      room.connect(creds.url, creds.token);
    });
  } catch (err) {
    console.log(err);
  }
};

init();
