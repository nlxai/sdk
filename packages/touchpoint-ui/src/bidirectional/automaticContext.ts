/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable jsdoc/require-jsdoc */
import { computeAccessibleName } from "dom-accessibility-api";

import type { ConversationHandler } from "@nlxai/chat-core";
import { analyzePageForms } from "./analyzePageForms";
import { equals, uniq } from "ramda";

const debounce = <T extends any[]>(
  func: (...args: T) => void,
  wait: number = 50,
  maxWait: number = Infinity,
) => {
  let timeout: NodeJS.Timeout | null = null;
  let firstRequestTime: number | null = null;

  return (...args: T) => {
    firstRequestTime ??= Date.now();
    if (timeout) {
      clearTimeout(timeout);
    }
    if (Date.now() - firstRequestTime > maxWait) {
      // If the time since the first request exceeds maxWait, call the function immediately
      func.apply(null, args);
      firstRequestTime = null; // Reset the first request time
    } else {
      timeout = setTimeout(() => {
        firstRequestTime = null; // Reset the first request time
        func.apply(null, args);
      }, wait);
    }
  };
};

export const gatherAutomaticContext = (
  handler: ConversationHandler,
  setPageState: (state: {
    formElements: any;
    links: Record<string, string>;
  }) => void,
): (() => void) => {
  let previousContext: {
    "nlx:vpContext": {
      // url: string;
      fields: any;
      destinations: any;
    };
  } = {
    "nlx:vpContext": {
      // url: "",
      fields: {},
      destinations: {},
    },
  };

  const go = debounce(
    async (): Promise<void> => {
      const [context, pageState] = gatherContext();
      if (!equals(previousContext, context)) {
        try {
          // eslint-disable-next-line no-console
          console.debug(
            "Bidirectional automatic context sent:",
            context["nlx:vpContext"],
          );
          await handler.sendContext(context);
        } catch (error) {}
        setPageState(pageState);
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
  return () => {
    observer.disconnect();
  };
};

const gatherContext = (): [
  {
    "nlx:vpContext": {
      // url: string;
      fields: any;
      destinations: any;
    };
  },
  { formElements: any; links: Record<string, string> },
] => {
  const { context: fields, formElements } = analyzePageForms();
  const { context: destinations, links } = analyzePageLinks();

  const context = {
    // url: window.location.href,
    fields,
    destinations,
  };

  return [
    {
      "nlx:vpContext": context,
    },
    { formElements, links },
  ];
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
