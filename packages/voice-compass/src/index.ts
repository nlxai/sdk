import fetch from "isomorphic-fetch";

// Initial configuration used when creating a journey manager
export interface Config {
  apiKey: string;
  workspaceId: string;
  conversationId: string;
  journeyId: string;
  languageCode: string;
  debug?: boolean;
  dev?: boolean;
}

export type Context = Record<string, any>;

// The journey manager object
export interface VoiceCompass {
  sendStep: (stepId: string, context?: Context) => Promise<void>;
}

export const stepIdRegex =
  /^[0-9a-fA-F]{8}\\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

export const create = ({
  apiKey,
  workspaceId,
  conversationId,
  journeyId,
  languageCode,
  debug = false,
  dev = false,
}: Config): VoiceCompass => {
  if (!conversationId) {
    console.warn(
      'No conversation ID provided. Please call the Voice Compass client `create` method with a `conversationId` field extracted from the URL. Example code: `new URLSearchParams(window.location.search).get("cid")`',
    );
  }
  const sendStep = (stepId: string, context?: Context) => {
    // if (!stepIdRegex.test(stepId)) {
    //   throw new Error("Invalid stepId. It should be formatted as a UUID.");
    // }

    const payload = {
      stepId,
      context,
      conversationId,
      journeyId,
      languageCode,
    };

    return fetch(`https://${dev ? "dev." : ""}mm.nlx.ai/v1/track`, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "x-nlx-id": workspaceId,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(() => {
        if (debug) {
          console.info(`✓ step: ${stepId}`, payload);
        }
      })
      .catch((err: Error) => {
        if (debug) {
          console.error(`× step: ${stepId}`, err, payload);
        }
        throw err;
      });
  };

  return { sendStep };
};
