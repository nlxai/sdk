import { type Config } from "@nlxai/multimodal";
import { type StepId } from ".";
import { type EncodedQuery } from "./queries";
import { type UrlCondition } from "./url_condition";

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

/**
 * Resolve triggers from CDN or use provided triggers
 *
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
    `${baseUrl}/${config.workspaceId}/${config.journeyId}.json`,
  );
  const triggersFromCdn = await triggersFromCdnRequest.json();
  return triggersFromCdn;
};
