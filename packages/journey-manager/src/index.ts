import { type Config, type Client, create } from "@nlxai/multimodal";
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
  event: "pageLoad" | "click" | "appear" | "enterViewport";
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
 * Step with additional query
 */
export interface StepWithQuery {
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

/**
 * Step with query and found elements
 */
export type StepWithQueryAndElements = StepWithQuery & {
  /**
   * Elements found
   */
  elements?: HTMLElement[];
};

const debounce = (func: () => void, timeout = 300): (() => void) => {
  let timer: NodeJS.Timer | null = null;
  return () => {
    if (timer != null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func();
    }, timeout);
  };
};

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

const withElements = async (
  steps: StepWithQuery[],
): Promise<StepWithQueryAndElements[]> => {
  const targets = await Promise.all(
    steps
      .filter(
        ({ urlCondition }) =>
          urlCondition == null || matchesUrlCondition(urlCondition),
      )
      .map(async (step) => {
        try {
          return {
            ...step,
            elements: await find(step.query),
          };
        } catch (e) {
          return step;
        }
      }),
  );
  return targets;
};

const withElementsSync = (
  steps: StepWithQuery[],
): StepWithQueryAndElements[] => {
  return filterMap(steps, (step) => {
    if (step.urlCondition != null && !matchesUrlCondition(step.urlCondition)) {
      return null;
    }
    const elements = getAll(step.query);
    if (elements.length === 0) {
      return null;
    }
    return { ...step, elements };
  });
};

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
 * Active trigger event type.
 */
export type ActiveTriggerEventType = "click";

/**
 * Active trigger.
 */
export interface ActiveTrigger {
  /** The trigger associated with the elements. */
  trigger: StepWithQuery;
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
   * The triggers dictionary, downloaded from the Dialog Studio desktop app.
   * If triggers are not provided, they will be fetched from the CDN.
   */
  triggers?: Triggers;
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

const resolveTriggers = async (
  config: Config,
  triggers?: Triggers,
): Promise<Triggers> => {
  if (triggers != null) {
    return triggers;
  }
  const baseUrl =
    config.dev ?? false
      ? "https://triggers.dev.mm.nlx.ai"
      : "https://triggers.mm.nlx.ai";
  const triggersFromCdnRequest = await fetch(
    `${baseUrl}/${config.workspaceId}/${config.journeyId}.json`,
  );
  const triggersFromCdn = await triggersFromCdnRequest.json();
  return triggersFromCdn;
};

// eslint-disable-next-line @typescript-eslint/promise-function-async
const waitUntilDomContentLoaded = (): Promise<void> => {
  if (document.readyState === "loading") {
    return new Promise((resolve) => {
      window.addEventListener("DOMContentLoaded", () => {
        resolve();
      });
    });
  } else {
    return Promise.resolve();
  }
};

/**
 * Run the multimodal journey
 * @param props - The run configuration object
 * @returns an promise of an object containing a teardown function and the multimodal client.
 */
export const run = async (props: RunProps): Promise<RunOutput> => {
  const client = create(props.config);

  const triggers: Triggers = await resolveTriggers(
    props.config,
    props.triggers,
  );

  await waitUntilDomContentLoaded();

  const triggeredSteps = getTriggeredSteps(props.config.conversationId);

  /**
   * Digression detection
   * - if all triggers have a URL constraint set and none match the current URL, fire a digression callback
   * - notable exception: if the step is used as escalation or end as well, missing URL constraint is ok.
   */

  const urlConditions: UrlCondition[] = filterMap(
    Object.values(triggers),
    (trigger) => trigger.urlCondition,
  );

  // If there are any steps for which there is no URL condition while also not being used for escalation or end,
  // the package assumes that a digression cannot be reliably detected.
  const isDigressionDetectable = Object.entries(triggers).every(
    ([_stepId, trigger]) => {
      return (
        // every step has a URL condition
        trigger.urlCondition != null
      );
    },
  );

  if (isDigressionDetectable && !urlConditions.some(matchesUrlCondition)) {
    props.onDigression?.(client);
  }

  const sendStep = (stepId: string, once: boolean): void => {
    if (
      triggeredSteps.some((triggeredStep) => triggeredStep.stepId === stepId)
    ) {
      if (once) {
        return;
      }
    } else {
      triggeredSteps.push({ stepId, url: window.location.toString() });
      saveTriggeredSteps(props.config.conversationId, triggeredSteps);
    }
    client.sendStep(stepId).catch((err) => {
      // eslint-disable-next-line no-console
      console.warn(err);
    });
  };

  /**
   * Handle load steps
   */

  const loadSteps: LoadStep[] = filterMap(
    Object.entries(triggers),
    ([stepId, trigger]: [StepId, Trigger]) => {
      if (trigger.event === "pageLoad") {
        return {
          stepId,
          urlCondition: trigger.urlCondition,
          once: trigger.once,
        };
      }
      return null;
    },
  );

  let previousUrl = window.location.toString();
  /**
   * Keeps track of which load steps matched the URL the last time the URL was checked.
   * This does not necessarily mean that the steps in question have actually been triggered (page load events should not fire if subsequent pages also satisfy the URL condition for which a step was already fired).
   */
  let previouslyMatchedLoadSteps: string[] = [];

  // Checks load steps to be triggered at the current URL
  // Saves the step ID's that actually trigger so it can be compared to subsequent calls
  const handleLoadSteps = (): void => {
    const matchingStepIds: string[] = [];
    loadSteps.forEach(({ stepId, urlCondition, once }) => {
      if (urlCondition != null && !matchesUrlCondition(urlCondition)) {
        return;
      }
      matchingStepIds.push(stepId);
      if (!previouslyMatchedLoadSteps.includes(stepId)) {
        sendStep(stepId, once ?? false);
      }
    });
    previouslyMatchedLoadSteps = matchingStepIds;
  };

  handleLoadSteps();

  const clickSteps: StepWithQuery[] = filterMap(
    Object.entries(triggers),
    ([stepId, trigger]: [StepId, Trigger]) => {
      if (trigger.event === "click" && trigger.query != null) {
        return {
          stepId,
          query: decode(trigger.query),
          urlCondition: trigger.urlCondition,
          once: trigger.once,
        };
      }
      return null;
    },
  );

  const appearSteps: StepWithQuery[] = filterMap(
    Object.entries(triggers),
    ([stepId, trigger]: [StepId, Trigger]) => {
      if (trigger.event === "appear" && trigger.query != null) {
        return {
          stepId,
          query: decode(trigger.query),
          urlCondition: trigger.urlCondition,
          once: trigger.once,
        };
      }
      return null;
    },
  );

  const handleGlobalClickForAnnotations = async (ev: any): Promise<void> => {
    const targets = await withElements(clickSteps);
    const node = ev.target;
    const clickStep: StepWithQueryAndElements | undefined = targets.find(
      ({ elements }) =>
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
    if (eventType === "click") {
      return clickSteps
        .filter(
          ({ urlCondition }) =>
            urlCondition == null || matchesUrlCondition(urlCondition),
        )
        .map((trigger) => ({ trigger, elements: getAll(trigger.query) }));
    }
    return [];
  };

  /**
   * UI management
   */

  // TODO: type this more accurately
  let uiElement: any;

  let teardownUiElement: (() => void) | null = null;

  const setHighlights = (): void => {
    const highlightElements = findActiveTriggers("click").flatMap(
      (activeTrigger) => activeTrigger.elements,
    );
    if (uiElement != null) {
      uiElement.highlightElements = highlightElements;
    }
  };

  const debouncedSetHighlights = debounce(setHighlights);

  if (props.ui != null) {
    uiElement = document.createElement("journey-manager");
    uiElement.style.zIndex = 1000;
    uiElement.style.position = "absolute";
    uiElement.config = props.ui;
    uiElement.client = client;
    const handleAction = (ev: any): void => {
      const action = ev.detail?.action;
      if (action == null) {
        return;
      }
      if (action === "escalate" && props.ui?.onEscalation != null) {
        props.ui.onEscalation({ sendStep: client.sendStep });
        return;
      }
      if (action === "end" && props.ui?.onEnd != null) {
        props.ui.onEnd({ sendStep: client.sendStep });
        return;
      }
      if (action === "previous") {
        if (props.ui?.onPreviousStep != null) {
          props.ui.onPreviousStep({
            sendStep: client.sendStep,
            triggeredSteps,
          });
        } else {
          const lastTriggeredStep = triggeredSteps[triggeredSteps.length - 1];
          if (lastTriggeredStep != null) {
            client.sendStep(lastTriggeredStep.stepId).catch((err) => {
              // eslint-disable-next-line no-console
              console.warn(err);
            });
            // Redirect to previous page if the last triggered step occurred on it
            if (lastTriggeredStep.url !== window.location.toString()) {
              window.location.href = lastTriggeredStep.url;
            }
          }
        }
      }
    };
    setHighlights();
    uiElement.addEventListener("action", handleAction);
    document.body.appendChild(uiElement);
    teardownUiElement = () => {
      document.body.removeChild(uiElement);
    };
  }

  /**
   * Change detection
   */

  const documentObserver = new MutationObserver((mutations) => {
    // If any of the added nodes are inside matches on appear events, trigger those events
    const targets = withElementsSync(appearSteps);
    mutations.forEach((mutation) => {
      targets.forEach(({ stepId, once, elements }) => {
        if (
          (elements ?? []).some((element) => {
            return [...mutation.addedNodes].some((addedNode) => {
              return addedNode.contains(element);
            });
          })
        ) {
          sendStep(stepId, once ?? false);
        }
      });
    });
    debouncedSetHighlights();
    // If the document changed for any reason (click, popstate event etc.), check if the URL also changed
    // If it did, handle page load events
    const newUrl = window.location.toString();
    if (newUrl !== previousUrl) {
      handleLoadSteps();
    }
    previousUrl = newUrl;
  });

  documentObserver.observe(document, {
    childList: true,
    subtree: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-misused-promises --  initial eslint integration: disable all existing eslint errors
  document.addEventListener("click", handleGlobalClickForAnnotations);

  return {
    client,
    teardown: () => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises --  initial eslint integration: disable all existing eslint errors
      document.removeEventListener("click", handleGlobalClickForAnnotations);
      documentObserver.disconnect();
      teardownUiElement?.();
    },
  };
};
