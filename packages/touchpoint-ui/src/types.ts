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
