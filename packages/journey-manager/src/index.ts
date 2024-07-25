import { type Client, create } from "@nlxai/multimodal";
import { getAll } from "./queries";
import { type UrlCondition, matchesUrlCondition } from "./UrlCondition";
import { filterMap } from "./utils/filterMap";
import * as dom from "./utils/dom";
import * as trigger from "./trigger";
import type {
  Triggers,
  ActiveTriggerEventType,
  StepWithQuery,
  StepWithQueryAndElements,
} from "./trigger";
import type { RunProps } from "./configuration";
import createUi from "./ui";
import { triggerOnce } from "./triggerOnce";

export { type Triggers, type Trigger } from "./trigger";
export {
  type Query,
  type EncodedQuery,
  type Method,
  type SerializedRegex,
} from "./queries";
export type * from "./configuration";

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

  // --- Set up  triggers ---
  const triggers: Triggers = await trigger.resolveTriggers(
    props.config,
    props.triggers,
  );

  const loadSteps = trigger.ofLoadType(triggers);
  const clickSteps = trigger.ofClickType(triggers);
  const appearSteps = trigger.ofAppearType(triggers);
  const enterViewportSteps = trigger.ofEnterViewportType(triggers);

  const triggersByActiveType = (
    eventType: ActiveTriggerEventType,
  ): StepWithQuery[] => {
    switch (eventType) {
      case "click":
        return clickSteps;
      case "appear":
        return appearSteps;
      case "enterViewport":
        return enterViewportSteps;
    }
  };

  const findActiveTriggers = (
    eventType: ActiveTriggerEventType,
  ): StepWithQueryAndElements[] =>
    triggersByActiveType(eventType)
      .filter(
        ({ urlCondition }) =>
          urlCondition == null ||
          matchesUrlCondition(window.location, urlCondition),
      )
      .map((trigger) => ({ ...trigger, elements: getAll(trigger.query) }));

  // ----- Set up UI -----
  await dom.contentLoaded();

  const ui = createUi(props.ui, client, findActiveTriggers);

  // --- Digression detection ---
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

  let digressionCallbackCalled = false;

  const checkForDigressions = (): void => {
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
        ui.setDigression(true);
      } else {
        digressionCallbackCalled = false;
        ui.setDigression(false);
      }
    }
  };

  // --- Send step function ---

  const sendStep = triggerOnce(
    props.config.conversationId,
    ui,
    (stepId: string): void => {
      props.onStep?.(stepId);
      client.sendStep(stepId).catch((err) => {
        // eslint-disable-next-line no-console
        console.warn(err);
      });
    },
  );

  // ----- Page Load Steps -------

  let previousUrl = window.location.toString();

  /**
   * Keeps track of which load steps matched the URL the last time the URL was checked.
   * This does not necessarily mean that the steps in question have actually been triggered (page load events should not fire if subsequent pages also satisfy the URL condition for which a step was already fired).
   */
  let previouslyMatchedLoadSteps = new Set<string>();

  // Checks load steps to be triggered at the current URL
  // Saves the step ID's that actually trigger so it can be compared to subsequent calls
  const handleLoadSteps = (): void => {
    const matchingStepIds = new Set<string>();
    loadSteps.forEach(({ stepId, urlCondition, once }) => {
      if (
        urlCondition == null ||
        matchesUrlCondition(window.location, urlCondition)
      ) {
        matchingStepIds.add(stepId);
        if (!previouslyMatchedLoadSteps.has(stepId)) {
          sendStep(stepId, once ?? false);
        }
      }
    });
    previouslyMatchedLoadSteps = matchingStepIds;
  };

  handleLoadSteps();

  // -------- DOM handlers for other kinds of steps --------

  const teardownClickObserve = dom.observeClickEvents(
    (node: HTMLElement): void => {
      const targets = trigger.withElements(clickSteps);

      const clickStep: StepWithQueryAndElements | undefined = targets.find(
        ({ elements }) =>
           
          (elements ?? []).some((element: HTMLElement) =>
            element.contains(node),
          ),
      );
      if (clickStep != null) {
        sendStep(clickStep.stepId, clickStep.once ?? false);
      }
    },
  );

  let teardownIntersectionObserve = (): void => {};

  const observeIntersections = dom.observeViewportIntersections(() => {
    const enterViewportTriggers = findActiveTriggers("enterViewport");
    return {
      elements: enterViewportTriggers.flatMap(({ elements }) => elements),
      onIntersection: (target) => {
        const trigger = enterViewportTriggers.find(({ elements }) =>
          elements.includes(target),
        );
        if (trigger != null) {
          sendStep(trigger.stepId, trigger.once ?? false);
        }
      },
    };
  });

  const teardownMutationObserve = dom.observeMutations((mutations) => {
    checkForDigressions();
    // If any of the added nodes are inside matches on appear events, trigger those events
    const targets = trigger.withElements(appearSteps);
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
    ui.updateHighlights();
    teardownIntersectionObserve = observeIntersections();
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

  // --- Teardown function ---

  return {
    client,
    teardown: () => {
      teardownClickObserve();
      teardownIntersectionObserve();
      teardownMutationObserve();
      ui.teardown();
    },
  };
};
