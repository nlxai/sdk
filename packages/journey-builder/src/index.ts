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
      clickSteps.map(async ([stepId, query]) => {
        try {
          return {
            stepId,
            query,
            element: await find(query),
          };
        } catch (e) {
          return { stepId, query };
        }
      }),
    );
    const node = ev.target;
    const clickStep: { stepId: StepId } | undefined = targets.find(
      ({ element }) => element && element.contains(node),
    );
    if (clickStep) {
      client.sendStep(clickStep.stepId);
    }
  };

  document.addEventListener("click", handleGlobalClickForAnnotations);

  return () => {
    document.removeEventListener("click", handleGlobalClickForAnnotations);
  };
};
