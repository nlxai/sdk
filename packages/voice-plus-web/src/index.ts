import {
  type Client,
  create as createVoicePlusClient,
  type Config,
} from "@nlxai/voice-plus-core";
import { getAll } from "./queries";
import { matchesUrlCondition } from "./UrlCondition";
import * as dom from "./utils/dom";
import * as trigger from "./trigger";
import type {
  Triggers,
  ActiveTriggerEventType,
  StepWithQueryAndElements,
} from "./trigger";
import type { UiConfig } from "./configuration";
import createUi from "./ui";
import { triggerOnce } from "./triggerOnce";
import prepareDigression from "./digression";

export type { Triggers, Trigger, StepId } from "./trigger";
export {
  analyzePageForms,
  type InteractiveElementInfo,
  type PageForms,
  type AccessibilityInformation,
} from "./context";
export {
  type EncodedQuery,
  type Method,
  type SerializedRegex,
} from "./queries";
export type {
  Theme,
  ThemeColors,
  UiConfig,
  ButtonConfig,
  SimpleHandlerArg,
  HandlerArg,
  TriggeredStep,
} from "./configuration";
export type { UrlCondition } from "./UrlCondition";
export { iconUrls } from "./ui/components/icons";

/**
 * Configuration for the run method
 */
export interface RunProps {
  /**
   * The regular Voice+ configuration
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
  /**
   * Runs when a step is triggered, used primarily for debugging
   */
  onStep?: (stepId: string) => void;
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
   * The regular Voice+ SDK client
   */
  client: Client;
}

/**
 * Run the Voice+ script
 * @param props - The run configuration object
 * @returns an promise of an object containing a teardown function and the Voice+ client.
 */
export const run = async (props: RunProps): Promise<RunOutput> => {
  const client = createVoicePlusClient(props.config);

  // --- Set up  triggers ---
  const triggers: Triggers = await trigger.resolveTriggers(
    props.config,
    props.triggers,
  );

  const loadSteps = trigger.ofLoadType(triggers);
  const clickSteps = trigger.ofClickType(triggers);
  const appearSteps = trigger.ofAppearType(triggers);
  const enterViewportSteps = trigger.ofEnterViewportType(triggers);

  const findActiveTriggers = (
    eventType: ActiveTriggerEventType,
  ): StepWithQueryAndElements[] =>
    ({
      click: clickSteps,
      appear: appearSteps,
      enterViewport: enterViewportSteps,
    })[eventType]
      .filter(
        ({ urlCondition }) =>
          urlCondition == null ||
          matchesUrlCondition(window.location, urlCondition),
      )
      .map((trigger) => ({ ...trigger, elements: getAll(trigger.query) }));

  // ----- Set up UI -----
  await dom.contentLoaded();

  const ui = createUi(
    props.config.conversationId,
    props.ui,
    client,
    findActiveTriggers,
  );

  // --- Set up Digression detection ---
  const checkForDigressions = prepareDigression(triggers, () => {
    props.onDigression?.(client);
  });

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
    const userHasDigressed = checkForDigressions(window.location);
    ui.setDigression(userHasDigressed);

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

export default run;
