/* eslint-disable jsdoc/require-jsdoc */
import type { Config } from "@nlxai/core";
import type { TouchpointConfiguration } from "./interface";
import type { InteractiveElementInfo } from "./bidirectional/analyzePageForms";

export type NormalizedTouchpointConfiguration = TouchpointConfiguration &
  Required<
    Pick<TouchpointConfiguration, "initializeConversation" | "input">
  > & {
    config: Required<
      Pick<Config, "conversationId" | "userId" | "bidirectional">
    >;
  };

/**
 * Less type safe version of {@link BidirectionalCustomCommand}, but makes your life easier since it doesn't require generic arguments to be spammed everywhere.
 * @internal
 */
export interface DowncastCustomCommand {
  name: string;
  description?: string;
  values?: any[];
  multipleValues?: boolean;
  handler: (arg: any) => void;
}

export interface PageState {
  formElements: Record<string, Element>;
  links: Record<string, string>;
  customCommands: Map<string, { values: any[]; handler: (arg: any) => void }>;
}

export interface BidirectionalContext {
  uri?: string;
  fields?: InteractiveElementInfo[];
  destinations?: string[];
  actions?: Array<{
    name: string;
    description?: string;
    values?: any[];
    multipleValues?: boolean;
  }>;
}
