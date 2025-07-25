/* eslint-disable jsdoc/require-jsdoc */
import { computeAccessibleName } from "dom-accessibility-api";

import type { ConversationHandler } from "@nlxai/core";
import { analyzePageForms } from "./analyzePageForms";
import { equals, uniq } from "ramda";
import { debug } from "./debug";

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

  const go = debounceAsync(
    async () => {
      const [context, pageState] = gatherContext();
      if (!equals(previousContext, context)) {
        try {
          debug("Automatic context sent:", context["nlx:vpContext"]);
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
