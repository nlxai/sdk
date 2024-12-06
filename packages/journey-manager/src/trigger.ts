/* eslint-disable jsdoc/require-jsdoc */
import { type Config } from "@nlxai/voice-plus";
import { decode, getAll, type EncodedQuery, type Query } from "./queries";
import { matchesUrlCondition, type UrlCondition } from "./UrlCondition";
import { filterMap } from "./utils/filterMap";

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
   * A flag specifying whether the trigger should highlight. Only applicable to click triggers.
   */
  highlight?: boolean;
  /**
   * URL condition
   */
  urlCondition?: UrlCondition;
}

/**
 * A record of triggers
 */
export type Triggers = Record<StepId, Trigger>;

/**
 * Resolve triggers from CDN or use provided triggers
 * @param config - Configuration
 * @param triggers - Triggers
 * @returns Resolved triggers
 */
export const resolveTriggers = async (
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
    `${baseUrl}/${config.workspaceId}/${config.scriptId}.json`,
  );
  const triggersFromCdn = await triggersFromCdnRequest.json();
  return triggersFromCdn;
};

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
  /**
   * controls whether the step should highlight. Only applicable to click steps.
   */
  highlight: boolean;
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

export const ofLoadType = (triggers: Triggers): Step[] =>
  filterMap(
    Object.entries(triggers),
    ([stepId, trigger]: [StepId, Trigger]) => {
      if (trigger.event === "pageLoad") {
        return {
          stepId,
          urlCondition: trigger.urlCondition,
          once: trigger.once,
        };
      }
    },
  );

/**
 * Active trigger event type.
 */
export type ActiveTriggerEventType = "click" | "enterViewport" | "appear";

const ofActiveType =
  (eventType: ActiveTriggerEventType) =>
  (triggers: Triggers): StepWithQuery[] =>
    filterMap(
      Object.entries(triggers),
      ([stepId, trigger]: [StepId, Trigger]) => {
        if (trigger.event === eventType && trigger.query != null) {
          return {
            stepId,
            query: decode(trigger.query),
            urlCondition: trigger.urlCondition,
            once: trigger.once,
            highlight: trigger.highlight ?? true,
          };
        }
      },
    );

export const ofClickType = ofActiveType("click");
export const ofAppearType = ofActiveType("appear");
export const ofEnterViewportType = ofActiveType("enterViewport");

export const withElements = (
  steps: StepWithQuery[],
): StepWithQueryAndElements[] => {
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
