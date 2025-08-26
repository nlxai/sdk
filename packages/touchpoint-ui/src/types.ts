/* eslint-disable jsdoc/require-jsdoc */
import type { Config } from "@nlxai/core";
import type { TouchpointConfiguration } from "./interface";
import type * as z4 from "zod/v4/core";

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
  action: string;
  description?: string;
  schema?: z4.$ZodType | z4.JSONSchema.BaseSchema;
  handler: (arg: any) => void;
}
