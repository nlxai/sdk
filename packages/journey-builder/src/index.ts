import { type VoiceCompass } from "@nlxai/voice-compass";
import { find, fromJson, Query } from "./queries";

type StepId = string;

type Trigger = { event: "pageLoad" | "click"; query?: string };

type Triggers = Record<StepId, Trigger>;

type StepWithQuery = [StepId, Query];

export const run = (client: VoiceCompass, triggers: Triggers) => {
  const loadSteps: StepId[] = Object.entries(triggers).reduce(
    (prev: StepId[], [stepId, trigger]: [StepId, Trigger]) => {
      if (trigger.event === "pageLoad") {
        return [...prev, stepId];
      }
      return prev;
    },
    [],
  );

  loadSteps.forEach((stepId) => {
    client.sendStep(stepId);
  });

  const clickSteps: StepWithQuery[] = Object.entries(triggers).reduce(
    (prev: StepWithQuery[], [stepId, trigger]: [StepId, Trigger]) => {
      if (trigger.event === "click" && trigger.query) {
        const newEntry: StepWithQuery = [stepId, fromJson(trigger.query)];
        return [...prev, newEntry];
      }
      return prev;
    },
    [],
  );

  const handleGlobalClickForAnnotations = async (ev: any) => {
    const targets = await Promise.all(
      clickSteps.map(async ([step, query]) => {
        try {
          return {
            step,
            query,
            element: await find(query),
          };
        } catch (e) {
          return { step, query };
        }
      }),
    );
    let node = ev.target;
    const clickStep: { step: StepId } | undefined = targets.find(
      ({ element }) => element && element.contains(node),
    );
    if (clickStep) {
      client.sendStep(clickStep.step);
    }
  };

  document.addEventListener("click", handleGlobalClickForAnnotations);

  return () => {
    document.removeEventListener("click", handleGlobalClickForAnnotations);
  };
};
