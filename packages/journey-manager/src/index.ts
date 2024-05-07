import { type Config, create } from "@nlxai/voice-compass";
import { find, decode, type Query, type EncodedQuery } from "./queries";

/**
 * Step ID
 */
export type StepId = string;

/**
 * URL match condition
 */
export interface UrlCondition {
  /**
   * Condition operator
   */
  operator: "eq" | "neq" | "suffix" | "prefix" | "contains" | "not_contains";
  /**
   * Condition value
   */
  value: string;
  // TODO: add regex match condition
}

/**
 * A single trigger
 */
export interface Trigger {
  /**
   * Event
   */
  event: "pageLoad" | "click";
  /**
   * A query identifying the element
   */
  query?: EncodedQuery;
  /**
   * URL condition
   */
  urlCondition?: UrlCondition;
}

/**
 * A record of triggers
 */
export type Triggers = Record<StepId, Trigger>;

interface LoadStep {
  stepId: StepId;
  urlCondition?: UrlCondition;
}

interface ClickStep {
  stepId: StepId;
  query: Query;
  urlCondition?: UrlCondition;
}

const matchesUrlCondition = (urlCondition: UrlCondition): boolean => {
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
  return false;
};

/**
 * Run the multimodal journey
 * @param config - The voice compass configuration
 * @param triggers - The triggers dictionary, downloaded from the Dialog Studio desktop app
 * @returns teardown function
 */
export const run = (config: Config, triggers: Triggers): (() => void) => {
  const client = create(config);

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
    if (urlCondition != null && !matchesUrlCondition(urlCondition)) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises --  initial eslint integration: disable all existing eslint errors
    client.sendStep(stepId);
  });

  const clickSteps: ClickStep[] = Object.entries(triggers).reduce(
    (prev: ClickStep[], [stepId, trigger]: [StepId, Trigger]) => {
      if (trigger.event === "click" && trigger.query != null) {
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

  const handleGlobalClickForAnnotations = async (ev: any): Promise<void> => {
    const targets = await Promise.all(
      clickSteps
        .filter(
          ({ urlCondition }) =>
            urlCondition == null || matchesUrlCondition(urlCondition),
        )
        .map(async ({ stepId, query }) => {
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
    const clickStep:
      | (ClickStep & {
          /**
           *
           */
          element?: HTMLElement;
        })
      | undefined =
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument --  initial eslint integration: disable all existing eslint errors
      targets.find(({ element }) => element?.contains(node));
    if (clickStep != null) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises --  initial eslint integration: disable all existing eslint errors
      client.sendStep(clickStep.stepId);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-misused-promises --  initial eslint integration: disable all existing eslint errors
  document.addEventListener("click", handleGlobalClickForAnnotations);

  return () => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises --  initial eslint integration: disable all existing eslint errors
    document.removeEventListener("click", handleGlobalClickForAnnotations);
  };
};
