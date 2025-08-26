/* eslint-disable jsdoc/require-jsdoc */
import { computeAccessibleName } from "dom-accessibility-api";

import type { ConversationHandler } from "@nlxai/core";
import { analyzePageForms } from "./analyzePageForms";
import { equals, uniq } from "ramda";
import { debug } from "./debug";
import type { DowncastCustomCommand } from "../types";
import type { BidirectionalContext, PageState } from "../interface";
import * as z4 from "zod/v4/core";

const debounceAsync = <T extends any[]>(
  func: (...args: T) => Promise<void>,
  wait: number = 50,
  maxWait: number = Infinity,
) => {
  let timeout: NodeJS.Timeout | null = null;
  let firstRequestTime: number | null = null;
  let lastPromise: Promise<void> = Promise.resolve();

  return (...args: T) => {
    firstRequestTime ??= Date.now();
    const call = (): void => {
      lastPromise = lastPromise.then(async () => {
        try {
          await func.apply(null, args);
        } catch (error) {}
      });
      firstRequestTime = null; // Reset the first request time
    };
    if (timeout) {
      clearTimeout(timeout);
    }
    if (Date.now() - firstRequestTime > maxWait) {
      call();
    } else {
      timeout = setTimeout(() => {
        call();
      }, wait);
    }
  };
};

export const gatherAutomaticContext = (
  handler: ConversationHandler,
  customCommands: DowncastCustomCommand[],
  override: (arg: { context: BidirectionalContext; state: PageState }) => {
    context: BidirectionalContext;
    state: PageState;
  },
  setPageState: (state: PageState) => void,
): {
  teardown: () => void;
  onCustomCommandsChange: (commands: DowncastCustomCommand[]) => void;
} => {
  let previousContext: BidirectionalContext = {
    // uri: "",
    fields: [],
    destinations: [],
    actions: [],
  };

  const go = debounceAsync(
    async () => {
      const { context, state } = override(gatherContext(customCommands));
      if (!equals(previousContext, context)) {
        try {
          debug("Automatic context sent:", context);
          await handler.sendContext({ "nlx:vpContext": context });
        } catch (error) {}
        setPageState(state);
        previousContext = context;
      }
    },
    50,
    300,
  );

  go();

  const observer = new MutationObserver(go);
  observer.observe(document.body, {
    subtree: true,
    childList: true,
    attributes: true,
  });

  // Return a cleanup function to disconnect the observer
  return {
    teardown: () => {
      observer.disconnect();
    },
    onCustomCommandsChange: (commands) => {
      customCommands = commands;
      go();
    },
  };
};

const gatherContext = (
  customCommands: DowncastCustomCommand[],
): { context: BidirectionalContext; state: PageState } => {
  const { context: fields, formElements } = analyzePageForms();
  const { context: destinations, links } = analyzePageLinks();

  const context = {
    uri: window.location.pathname,
    fields,
    destinations,
    actions: customCommands.map((command) => {
      const { handler: _, schema, ...commandWithoutHandler } = command;
      if (schema != null) {
        return {
          schema:
            schema instanceof z4.$ZodType
              ? z4.toJSONSchema(schema, { io: "input" })
              : schema,
          ...commandWithoutHandler,
        };
      } else return commandWithoutHandler;
    }),
  };

  return {
    context,
    state: {
      formElements,
      links,
      customCommands: new Map(
        customCommands.map((c) => {
          const schema = c.schema;
          return [
            c.action,
            schema instanceof z4.$ZodType
              ? (data: z4.input<typeof schema>) => {
                  const result = z4.safeParse(schema, data);
                  if (result.success) {
                    c.handler(result.data);
                  } else {
                    debug(
                      `Custom command "${c.action}" received, but the payload ${JSON.stringify(data, null, 2)} does not match the schema.`,
                      result.error,
                    );
                  }
                }
              : c.handler,
          ];
        }),
      ),
    },
  };
};

const analyzePageLinks = (): {
  context: string[];
  links: Record<string, string>;
} => {
  const links = Object.fromEntries(
    uniq(
      Array.from(document.querySelectorAll("a")).map((link) => [
        computeAccessibleName(link),
        link.getAttribute("href") ?? "",
      ]),
    ),
  );

  return { context: Object.keys(links), links };
};
