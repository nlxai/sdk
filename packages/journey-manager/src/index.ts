import { type Client, create } from "@nlxai/multimodal";
import { getAll, decode, type Query } from "./queries";
import { JourneyManagerElement } from "./ui/custom-element";
import { type UrlCondition, matchesUrlCondition } from "./url_condition";
import { debounce } from "./utils/debounce";
import { filterMap } from "./utils/filterMap";
import { domContentLoaded } from "./utils/domContentLoaded";
import { type Triggers, resolveTriggers, type Trigger } from "./trigger";
import type { RunProps } from "./configuration";

export { type Triggers, type Trigger } from "./trigger";
export {
  type Query,
  type EncodedQuery,
  type Method,
  type SerializedRegex,
} from "./queries";
export type * from "./configuration";

customElements.define("journey-manager", JourneyManagerElement);

/**
 * Step ID
 */
export type StepId = string;

/** Step */
export interface Step {
  /**
   * Step ID
   */
  stepId: StepId;
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
 * Step with additional query
 */
export type StepWithQuery = Step & {
  query: Query;
};

/**
 * Step with query and found elements
 */
export type StepWithQueryAndElements = StepWithQuery & {
  /**
   * Elements found
   */
  elements: HTMLElement[];
};

type Fn = () => void;

const withElements = (steps: StepWithQuery[]): StepWithQueryAndElements[] => {
  return filterMap(steps, (step) => {
    if (
      step.urlCondition != null &&
      !matchesUrlCondition(window.location, step.urlCondition)
    ) {
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
export type ActiveTriggerEventType = "click" | "enterViewport";

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

  await domContentLoaded();

  let triggeredSteps = getTriggeredSteps(props.config.conversationId);

  // TODO: type this more accurately
  let uiElement: any;

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

  const sendStep = (stepId: string, once: boolean): void => {
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
      if (uiElement != null) {
        uiElement.triggeredSteps = triggeredSteps;
      }
      saveTriggeredSteps(props.config.conversationId, triggeredSteps);
    }
    props.onStep?.(stepId);
    client.sendStep(stepId).catch((err) => {
      // eslint-disable-next-line no-console
      console.warn(err);
    });
  };

  /**
   * Handle load steps
   */

  const loadSteps: Step[] = filterMap(
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
      if (
        urlCondition != null &&
        !matchesUrlCondition(window.location, urlCondition)
      ) {
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

  const enterViewportSteps: StepWithQuery[] = filterMap(
    Object.entries(triggers),
    ([stepId, trigger]: [StepId, Trigger]) => {
      if (trigger.event === "enterViewport" && trigger.query != null) {
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
    const targets = withElements(clickSteps);
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
  ): StepWithQueryAndElements[] => {
    const steps =
      eventType === "click"
        ? clickSteps
        : eventType === "enterViewport"
          ? enterViewportSteps
          : [];
    return steps
      .filter(
        ({ urlCondition }) =>
          urlCondition == null ||
          matchesUrlCondition(window.location, urlCondition),
      )
      .map((trigger) => ({ ...trigger, elements: getAll(trigger.query) }));
  };

  /**
   * UI management
   */

  const setHighlights = debounce((): void => {
    const highlightElements = findActiveTriggers("click").flatMap(
      (activeTrigger) => activeTrigger.elements,
    );
    if (uiElement != null) {
      uiElement.highlightElements = highlightElements;
    }
  });

  let teardownUiElement: (() => void) | null = null;

  if (props.ui != null) {
    uiElement = document.createElement("journey-manager");
    uiElement.style.zIndex = 1000;
    uiElement.config = props.ui;
    uiElement.client = client;
    uiElement.triggeredSteps = triggeredSteps;
    if (props.ui.highlights ?? false) {
      setHighlights();
    }
    document.body.appendChild(uiElement);
    teardownUiElement = () => {
      document.body.removeChild(uiElement);
    };
  }

  let teardownIntersectionObserve: Fn | null = null;

  const observeIntersections = debounce(() => {
    teardownIntersectionObserve?.();
    const enterViewportTriggers = findActiveTriggers("enterViewport");
    const onIntersection: IntersectionObserverCallback = (data) => {
      data.forEach((entry) => {
        if (entry.intersectionRatio < 0.99) {
          return;
        }
        const target: HTMLElement | null =
          entry.target instanceof HTMLElement ? entry.target : null;
        if (target == null) {
          return;
        }
        const trigger = enterViewportTriggers.find(({ elements }) =>
          elements.includes(target),
        );
        if (trigger != null) {
          sendStep(trigger.stepId, trigger.once ?? false);
        }
      });
    };
    const observer = new IntersectionObserver(onIntersection, { threshold: 1 });
    const elements = enterViewportTriggers.flatMap(({ elements }) => elements);
    elements.forEach((element) => {
      observer.observe(element);
    });
    teardownIntersectionObserve = () => {
      observer.disconnect();
    };
  });

  /**
   * Change detection
   */

  let digressionCallbackCalled = false;

  const documentObserver = new MutationObserver((mutations) => {
    if (isDigressionDetectable) {
      const userHasDigressed = !urlConditions.some((cond) =>
        matchesUrlCondition(window.location, cond),
      );
      if (userHasDigressed) {
        // Avoid calling the digression callback multiple times after a digression has been detected
        if (!digressionCallbackCalled) {
          props.onDigression?.(client);
        }
        digressionCallbackCalled = true;
        uiElement.digression = true;
      } else {
        digressionCallbackCalled = false;
        uiElement.digression = false;
      }
    }
    // If any of the added nodes are inside matches on appear events, trigger those events
    const targets = withElements(appearSteps);
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
    if (props.ui?.highlights ?? false) {
      setHighlights();
    }
    observeIntersections();
    // This timeout here seems to solve some timing issues on URL handling
    setTimeout(() => {
      // If the document changed for any reason (click, popstate event etc.), check if the URL also changed
      // If it did, handle page load events
      const newUrl = window.location.toString();
      if (newUrl !== previousUrl) {
        handleLoadSteps();
        previousUrl = newUrl;
      }
    });
  });

  documentObserver.observe(document, {
    childList: true,
    subtree: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-misused-promises --  initial eslint integration: disable all existing eslint errors
  document.addEventListener("click", handleGlobalClickForAnnotations, true);

  return {
    client,
    teardown: () => {
      document.removeEventListener(
        "click",
        // eslint-disable-next-line @typescript-eslint/no-misused-promises --  initial eslint integration: disable all existing eslint errors
        handleGlobalClickForAnnotations,
        true,
      );
      teardownIntersectionObserve?.();
      documentObserver.disconnect();
      teardownUiElement?.();
    },
  };
};
