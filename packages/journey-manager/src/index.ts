import { type Config, type Client, create } from "@nlxai/voice-compass";
import { find, getAll, decode, type Query, type EncodedQuery } from "./queries";
import { type UiConfig, JourneyManagerElement } from "./ui";
export {
  type Query,
  type EncodedQuery,
  type Method,
  type SerializedRegex,
} from "./queries";
export {
  type UiConfig,
  type PartialTheme,
  type Theme,
  type ThemeColors,
} from "./ui";

customElements.define("journey-manager", JourneyManagerElement);

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
   * A flag specifying whether the trigger should only fire a single time
   */
  once?: boolean;
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
  once?: boolean;
  urlCondition?: UrlCondition;
}

/**
 * Click step
 */
export interface ClickStep {
  /**
   * Step ID
   */
  stepId: StepId;
  /**
   * Element query
   */
  query: Query;
  /**
   * Controls whether the step should only trigger the first time it is clicked, or on all subsequent clicks as well
   */
  once?: boolean;
  /**
   * URL condition for the click
   */
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

const localStorageKey = (conversationId: string): string =>
  `jb-triggered-steps-${conversationId}`;

const saveTriggeredSteps = (conversationId: string, steps: string[]): void => {
  localStorage.setItem(localStorageKey(conversationId), JSON.stringify(steps));
};

const getTriggeredSteps = (conversationId: string): string[] => {
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
 * Active trigger event type.
 */
export type ActiveTriggerEventType = "click";

/**
 * Active trigger.
 */
export interface ActiveTrigger {
  /** The trigger associated with the elements. */
  trigger: ClickStep;
  /** The matched elements */
  elements: HTMLElement[];
}

/**
 * Created by {@link run}.
 */
export interface RunOutput {
  /**
   * Stop running the journey, removing all event listeners
   */
  teardown: () => void;
  /**
   * Find active triggers on the page
   */
  findActiveTriggers: (eventType: ActiveTriggerEventType) => ActiveTrigger[];
  /**
   * The regular multimodal SDK client
   */
  client: Client;
}

/**
 * Configuration for the run method
 */
export interface RunProps {
  /**
   * The regular multimodal configuration
   */
  config: Config;
  /**
   * UI configuration
   */
  ui?: UiConfig;
  /**
   * The triggers dictionary, downloaded from the Dialog Studio desktop app
   */
  triggers: Triggers;
  /**
   * Digression detection callback
   */
  onDigression?: (client: Client) => void;
}

function filterMap<X, Y>(
  arr: X[],
  fn: (value: X) => Y | null | undefined,
): Y[] {
  return arr.reduce<Y[]>((prev, curr) => {
    const val = fn(curr);
    if (val != null) {
      prev.push(val);
    }
    return prev;
  }, []);
}

/**
 * Run the multimodal journey
 * @param props - The run configuration object
 * @returns an object containing a teardown function and the multimodal client.
 */
export const run = (props: RunProps): RunOutput => {
  const client = create(props.config);

  // TODO: type this more accurately
  let uiElement: any;

  if (props.ui != null) {
    uiElement = document.createElement("journey-manager");
    uiElement.style.zIndex = 1000;
    uiElement.config = props.ui;
    uiElement.client = client;
    document.body.appendChild(uiElement);
  }

  const triggeredSteps = getTriggeredSteps(props.config.conversationId);

  // If all triggers have a URL constraint set and none match the current URL, fire a digression calback

  const urlConditions: UrlCondition[] = filterMap(
    Object.values(props.triggers),
    (trigger) => trigger.urlCondition,
  );

  if (
    Object.keys(props.triggers).length === urlConditions.length &&
    !urlConditions.some(matchesUrlCondition)
  ) {
    props.onDigression?.(client);
  }

  const sendStep = (stepId: string, once: boolean): void => {
    if (triggeredSteps.includes(stepId)) {
      if (once) {
        return;
      }
    } else {
      triggeredSteps.push(stepId);
      saveTriggeredSteps(props.config.conversationId, triggeredSteps);
    }
    client.sendStep(stepId).catch((err) => {
      // eslint-disable-next-line no-console
      console.warn(err);
    });
  };

  const loadSteps: LoadStep[] = Object.entries(props.triggers).reduce(
    (prev: LoadStep[], [stepId, trigger]: [StepId, Trigger]) => {
      if (trigger.event === "pageLoad") {
        return [...prev, { stepId, urlCondition: trigger.urlCondition }];
      }
      return prev;
    },
    [],
  );

  loadSteps.forEach(({ stepId, urlCondition, once }) => {
    if (urlCondition != null && !matchesUrlCondition(urlCondition)) {
      return;
    }
    sendStep(stepId, once ?? false);
  });

  const clickSteps: ClickStep[] = Object.entries(props.triggers).reduce(
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
              elements: await find(query),
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
          elements?: HTMLElement[];
        })
      | undefined = targets.find(({ elements }) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      (elements ?? []).some((element: HTMLElement) => element.contains(node)),
    );
    if (clickStep != null) {
      sendStep(clickStep.stepId, clickStep.once ?? false);
    }
  };

  const findActiveTriggers = (
    eventType: ActiveTriggerEventType,
  ): ActiveTrigger[] => {
    if (eventType !== "click") {
      return clickSteps
        .filter(
          ({ urlCondition }) =>
            urlCondition == null || matchesUrlCondition(urlCondition),
        )
        .map((trigger) => ({ trigger, elements: getAll(trigger.query) }));
    }
    return [];
  };

  // eslint-disable-next-line @typescript-eslint/no-misused-promises --  initial eslint integration: disable all existing eslint errors
  document.addEventListener("click", handleGlobalClickForAnnotations);

  return {
    client,
    findActiveTriggers,
    teardown: () => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises --  initial eslint integration: disable all existing eslint errors
      document.removeEventListener("click", handleGlobalClickForAnnotations);
      if (uiElement != null) {
        document.body.removeChild(uiElement);
      }
    },
  };
};
