import { type VoiceCompass } from "@nlxai/voice-compass";
import { find, decode, Query, EncodedQuery } from "./queries";

type StepId = string;

// TODO: add regex match condition
type UrlCondition = {
  operator: "eq" | "neq" | "suffix" | "prefix" | "contains" | "not_contains";
  value: string;
};

type Trigger = {
  event: "pageLoad" | "click";
  query?: EncodedQuery;
  urlCondition?: UrlCondition;
};

type Triggers = Record<StepId, Trigger>;

type LoadStep = {
  stepId: StepId;
  urlCondition?: UrlCondition;
};

type ClickStep = {
  stepId: StepId;
  query: Query;
  urlCondition?: UrlCondition;
};

const matchesUrlCondition = (urlCondition: UrlCondition) => {
  const url = window.location.href;
  if (urlCondition.operator === "eq") {
    return url === urlCondition.value;
  }
  if (urlCondition.operator === "neq") {
    return url !== urlCondition.value;
  }
  if (urlCondition.operator === "prefix") {
    return url.startsWith(urlCondition.value);
  }
  if (urlCondition.operator === "suffix") {
    return url.endsWith(urlCondition.value);
  }
  if (urlCondition.operator === "contains") {
    return url.includes(urlCondition.value);
  }
  if (urlCondition.operator === "not_contains") {
    return !url.includes(urlCondition.value);
  }
};

export const run = (client: VoiceCompass, triggers: Triggers) => {
  const loadSteps: LoadStep[] = Object.entries(triggers).reduce(
    (prev: LoadStep[], [stepId, trigger]: [StepId, Trigger]) => {
      if (trigger.event === "pageLoad") {
        return [...prev, { stepId, urlCondition: trigger.urlCondition }];
      }
      return prev;
    },
    [],
  );

  loadSteps.forEach(({ stepId, urlCondition }) => {
    if (urlCondition && !matchesUrlCondition(urlCondition)) {
      return;
    }
    client.sendStep(stepId);
  });

  const clickSteps: ClickStep[] = Object.entries(triggers).reduce(
    (prev: ClickStep[], [stepId, trigger]: [StepId, Trigger]) => {
      if (trigger.event === "click" && trigger.query) {
        const newEntry: ClickStep = {
          stepId,
          query: decode(trigger.query),
          urlCondition: trigger.urlCondition,
        };

        return [...prev, newEntry];
      }
      return prev;
    },
    [],
  );

  const handleGlobalClickForAnnotations = async (ev: any) => {
    const targets = await Promise.all(
      clickSteps.map(async ({ stepId, query }) => {
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
