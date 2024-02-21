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
  dev?: boolean;
}

export interface StepData {
  stepId?: string;
  context?: Record<string, any>;
}

export type Context = Record<string, any>;

// The journey manager object
export interface VoiceCompass {
  sendStep: (data: StepData) => Promise<StepUpdate>;
  changeJourneyId: (journeyId: string) => void;
  getLastUpdate: () => Update | null;
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

const devApiUrl = "https://dev.mm.nlx.ai";

const prodApiUrl = "https://mm.nlx.ai";

export const create = (config: Config): VoiceCompass => {
  const conversationId = config.conversationId;

  if (!conversationId) {
    console.warn(
      'No conversation ID provided. Please call the Voice Compass client `create` method with a `conversationId` field extracted from the URL. Example code: `new URLSearchParams(window.location.search).get("cid")`',
    );
  }

  const apiUrl = config.dev ? devApiUrl : prodApiUrl;

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
      .then((res) => res.json())
      .then((res: StepUpdate) => {
        if (config.debug) {
          console.info(
            `${String.fromCodePoint(0x02713)} step: ${payload.stepId}`,
            payload,
          );
        }
        return res;
      })
      .catch((err: Error) => {
        if (config.debug) {
          console.error(
            `${String.fromCodePoint(0x000d7)} step: ${payload.stepId}`,
            err,
          );
        }
        return {
          error: `Something went wrong`,
        };
      });
  };

  const sendStep = (stepData: StepData) => {
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
      // TODO: sort out whether optional stepID's are even allowed
      stepId: stepData.stepId || "",
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
    getLastUpdate: () => {
      return lastUpdate;
    },
  };
};
