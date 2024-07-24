const localStorageKey = (conversationId: string): string =>
  `jb-triggered-steps-${conversationId}`;

const saveTriggeredSteps = (
  conversationId: string,
  steps: TriggeredStep[],
): void => {
  localStorage.setItem(localStorageKey(conversationId), JSON.stringify(steps));
};

interface TriggeredStep {
  stepId: string;
  url: string;
}

const cache: Record<string, TriggeredStep[]> = {};

const getTriggeredSteps = (conversationId: string): TriggeredStep[] => {
  try {
    const jsonString = localStorage.getItem(localStorageKey(conversationId));
    if (jsonString == null) {
      return [];
    }
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) {
      throw new Error("Triggered steps must be an array");
    }
    return parsed;
  } catch (_err) {
    return [];
  }
};

/**
 * Trigger a step only once
 *
 * @param conversationId - Conversation ID
 * @param stepId - Step ID
 * @param once - Whether to trigger only once
 * @param uiElement - UI element
 * @param callback - Callback
 */
export const triggerOnce = (
  conversationId: string,
  stepId: string,
  once: boolean,
  uiElement: any,
  callback: (stepId: string) => void,
): void => {
  if (cache[conversationId] == null) {
    cache[conversationId] = getTriggeredSteps(conversationId);
  }

  let triggeredSteps = cache[conversationId];

  if (triggeredSteps.some((triggeredStep) => triggeredStep.stepId === stepId)) {
    if (once) {
      return;
    }
  } else {
    triggeredSteps = [
      ...triggeredSteps,
      { stepId, url: window.location.toString() },
    ];
    if (uiElement != null) {
      uiElement.triggeredSteps = triggeredSteps;
    }
    saveTriggeredSteps(conversationId, triggeredSteps);
  }
  callback(stepId);
};
