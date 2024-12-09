/* eslint-disable jsdoc/require-jsdoc */
import type { TriggeredStep } from "./configuration";
import type { Ui } from "./ui";

const localStorageKey = (conversationId: string): string =>
  `jb-triggered-steps-${conversationId}`;

const saveTriggeredSteps = (
  conversationId: string,
  steps: TriggeredStep[],
): void => {
  cache[conversationId] = steps;
  localStorage.setItem(localStorageKey(conversationId), JSON.stringify(steps));
};

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

export const triggerOnce = (
  conversationId: string,
  ui: Ui,
  callback: (stepId: string) => void,
): ((stepId: string, once: boolean) => void) => {
  if (cache[conversationId] == null) {
    cache[conversationId] = getTriggeredSteps(conversationId);
  }
  ui.setTriggeredSteps(cache[conversationId]);

  return (stepId: string, once: boolean): void => {
    let triggeredSteps = cache[conversationId];

    if (
      triggeredSteps.some((triggeredStep) => triggeredStep.stepId === stepId)
    ) {
      if (once) {
        return;
      }
    } else {
      triggeredSteps = [
        ...triggeredSteps,
        { stepId, url: window.location.toString() },
      ];

      ui.setTriggeredSteps(triggeredSteps);

      saveTriggeredSteps(conversationId, triggeredSteps);
    }
    callback(stepId);
  };
};
