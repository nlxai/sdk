import fetch from "isomorphic-fetch";

export interface Session {
  conversationId: string;
  journeyId: string;
  languageCode?: string;
  previousStepId?: string;
}

// Initial configuration used when creating a journey manager
interface Config {
  apiKey: string;
  conversationId: string;
  journeyId: string;
  languageCode?: string;
  preventRepeats?: boolean;
  onSessionUpdate?: (session: Session) => void;
  debug?: boolean;
  dev?: boolean;
}

export interface StepData {
  stepId?: string;
  context?: object;
}

// The journey manager object
export interface VoiceCompass {
  updateStep: (data: StepData) => Promise<StepUpdate>;
  changeJourneyId: (journeyId: string) => void;
  getLastStepId: () => string | null;
}

export interface StepUpdate {
  error?: string;
  warning?: string;
}

const devApiUrl = "https://dev.journeys.voicecompass.ai/v1";

const prodApiUrl = "https://journeys.voicecompass.ai/v1";

export const create = (config: Config): VoiceCompass => {
  const conversationId = config.conversationId;

  if (!conversationId) {
    console.warn(
      'No contact ID provided. Please call the Voice Compass client `create` method with a `conversationId` field extracted from the URL. Example code: `new URLSearchParams(window.location.search).get("cid")`'
    );
  }

  const apiUrl = config.dev ? devApiUrl : prodApiUrl;

  let previousStepId: string | undefined = undefined;
  let currentJourneyId: string = config.journeyId;

  const saveSession = () => {
    config.onSessionUpdate?.({
      conversationId: config.conversationId,
      journeyId: currentJourneyId,
      previousStepId,
      languageCode: config.languageCode
    });
  };

  saveSession();

  const sendUpdateRequest = (stepData: StepData): Promise<StepUpdate> => {
    const payload = {
      ...stepData,
      conversationId,
      journeyId: currentJourneyId,
      languageCode: config.languageCode
    };

    return fetch(`${apiUrl}/track`, {
      method: "POST",
      headers: {
        "x-api-key": config.apiKey
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then((res: StepUpdate) => {
        if (config.debug) {
          console.info(
            `${String.fromCodePoint(0x02713)} step: ${payload.stepId}`,
            payload
          );
        }
        return res;
      })
      .catch((err: Error) => {
        if (config.debug) {
          console.error(
            `${String.fromCodePoint(0x000d7)} step: ${payload.stepId}`,
            err
          );
        }
        return {
          // TODO: look into propagating more error context
          error: "Something went wrong"
        };
      });
  };

  const updateStep = (stepData: StepData) => {
    if (stepData.stepId === previousStepId && config.preventRepeats) {
      const warning = `Duplicate step ID detected, step update prevented: ${stepData.stepId}`;
      if (config.debug) {
        console.warn(warning);
      }
      return Promise.resolve({
        warning: warning
      });
    }
    previousStepId = stepData.stepId;
    saveSession();
    return sendUpdateRequest(stepData);
  };

  return {
    updateStep,
    changeJourneyId: (newJourneyId: string) => {
      currentJourneyId = newJourneyId;
      saveSession();
    },
    getLastStepId: () => {
      return previousStepId || null;
    }
  };
};
