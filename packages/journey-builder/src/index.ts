import { type VoiceCompass } from "@nlxai/voice-compass";

type Query = unknown;

type StepId = string;

type Trigger = { event: "pageLoad" | "click"; query?: Query };

type Triggers = Record<StepId, Trigger>;

type StepWithQuery = [StepId, Query];

const matchesQuery = (node: HTMLElement, query: Query) => {
  return false;
};

const isDomElement = (node: any): node is HTMLElement => {
  return node instanceof HTMLElement;
};

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
        const newEntry: StepWithQuery = [stepId, trigger.query];
        return [...prev, newEntry];
      }
      return prev;
    },
    [],
  );

  const handleGlobalClickForAnnotations = (ev: any) => {
    let node = ev.target;
    while (node && node !== document.body) {
      if (isDomElement(node)) {
        const clickStep: StepWithQuery | undefined = clickSteps.find(
          ([_, query]) => matchesQuery(node, query),
        );
        if (clickStep) {
          client.sendStep(clickStep[0]);
        }
      }
      node = node.parentNode;
    }
  };

  document.addEventListener("click", handleGlobalClickForAnnotations);

  return () => {
    document.removeEventListener("click", handleGlobalClickForAnnotations);
  };
};
