import fetch from "isomorphic-fetch";

export interface Session {
  conversationId: string;
  journeyId: string;
  languageCode: string;
  lastUpdate: Update | null;
}

// Initial configuration used when creating a journey manager
export interface Config {
  apiKey: string;
  workspaceId: string;
  conversationId: string;
  journeyId: string;
  languageCode: string;
  preventRepeats?: boolean;
  onSessionUpdate?: (session: Session) => void;
  debug?: boolean;
  apiUrl?: string;
}

export interface StepData {
  stepId: string;
  context?: Record<string, any>;
}

export type Context = Record<string, any>;

// The journey manager object
export interface VoiceCompass {
  sendStep: (stepId: string, context?: Context) => Promise<StepUpdate>;
  changeJourneyId: (journeyId: string) => void;
  getLastStep: () => Update | null;
}

export interface Update {
  stepId: string;
  journeyId: string;
  context?: Context;
}

export interface StepUpdate {
  error?: string;
  warning?: string;
}

export const create = (config: Config): VoiceCompass => {
  const conversationId = config.conversationId;

  if (!conversationId) {
    console.warn(
      'No conversation ID provided. Please call the Voice Compass client `create` method with a `conversationId` field extracted from the URL. Example code: `new URLSearchParams(window.location.search).get("cid")`',
    );
  }

  const apiUrl = config.apiUrl ?? "https://mm.nlx.ai";

  let lastUpdate: Update | null = null;

  let currentJourneyId: string = config.journeyId;

  const saveSession = () => {
    config.onSessionUpdate?.({
      conversationId: config.conversationId,
      journeyId: currentJourneyId,
      lastUpdate,
      languageCode: config.languageCode,
    });
  };

  saveSession();

  const sendUpdateRequest = (stepData: StepData): Promise<StepUpdate> => {
    const payload = {
      ...stepData,
      conversationId,
      journeyId: currentJourneyId,
      languageCode: config.languageCode,
    };

    return fetch(`${apiUrl}/track`, {
      method: "POST",
      headers: {
        "x-api-key": config.apiKey,
        "x-nlx-id": config.workspaceId,
      },
      body: JSON.stringify(payload),
    })
      .then(() => {
        if (config.debug) {
          console.info(`✓ step: ${payload.stepId}`, payload);
        }

        return {};
      })
      .catch((err: Error) => {
        if (config.debug) {
          console.error(`× step: ${payload.stepId}`, err);
        }
        return {
          error: `Something went wrong`,
        };
      });
  };

  // uuid v4 regex
  const stepIdRegex =
    /^[0-9a-fA-F]{8}\\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
  const sendStep = (stepId: string, context?: Context) => {
    if (!stepIdRegex.test(stepId)) {
      throw new Error("Invalid stepId. It should be formatted as a UUID.");
    }

    const stepData: StepData = {
      stepId,
      context,
    };
    if (stepData.stepId === lastUpdate?.stepId && config.preventRepeats) {
      const warning = `Duplicate step ID detected, step update prevented: ${stepData.stepId}`;
      if (config.debug) {
        console.warn(warning);
      }
      return Promise.resolve({
        warning: warning,
      });
    }
    lastUpdate = {
      stepId: stepData.stepId,
      journeyId: currentJourneyId,
      context: stepData.context,
    };
    saveSession();
    return sendUpdateRequest(stepData);
  };

  return {
    sendStep,
    changeJourneyId: (newJourneyId: string) => {
      currentJourneyId = newJourneyId;
      saveSession();
    },
    getLastStep: () => {
      return lastUpdate;
    },
  };
};
