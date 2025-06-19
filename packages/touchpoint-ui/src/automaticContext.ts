/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable jsdoc/require-jsdoc */
import { computeAccessibleName } from "dom-accessibility-api";

import type { ConversationHandler } from "@nlxai/chat-core";
import { analyzePageForms } from "./analyzePageForms";
import { equals } from "ramda";

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
  const go = async (): Promise<void> => {
    const [context, pageState] = gatherContext();
    if (!equals(previousContext, context)) {
      try {
        await handler.sendContext(context);
      } catch (error) {}
      setPageState(pageState);
      previousContext = context;
    }
  };

  void go();

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

  // eslint-disable-next-line no-console
  console.debug("Automatic context", context);

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
    Array.from(document.querySelectorAll("nav a, footer a")).map((link) => [
      computeAccessibleName(link),
      link.getAttribute("href") ?? "",
    ]),
  );

  return { context: Object.keys(links), links };
};
