/* eslint-disable jsdoc/require-jsdoc */
import type { Config } from "@nlxai/core";
import type { TouchpointConfiguration } from "./interface";

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
