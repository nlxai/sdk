import { type Config } from "@nlxai/chat-core";
import { type TitleBar, type Theme } from "@nlxai/chat-widget";
import { umdScriptSrc } from "./constants";
import { type Config as MMConfig } from "./components/MultimodalConfiguration";

export enum Behavior {
  Simple,
  WelcomeIntentOnOpen,
  CustomIntentOnInactivity,
  InitializeWithContext,
  UseSessionStorage,
  UseLocalStorage,
}

export enum Environment {
  Html,
  Bundle,
  Node,
}

const indentBy = (indendStr: string, str: string): string =>
  str
    .split("\n")
    .map((str, index) => `${index === 0 ? "" : indendStr}${str}`)
    .join("\n");

function defaultTo(
  value: string | undefined | null,
  defaultValue: string,
): string {
  return value != null && value !== "" ? value : defaultValue;
}

export const setupSnippet = ({
  config,
  titleBar,
  theme,
  behavior,
  customModalitiesExample,
}: {
  config: Config;
  titleBar: TitleBar;
  theme?: Partial<Theme>;
  behavior?: Behavior;
  customModalitiesExample?: boolean;
}): string => {
  return `<!-- Chat widget sample HTML -->
<!-- Downloaded from https://nlxai.github.io/chat-sdk -->
<html lang="en">
  <head>
    <title>NLX Widget Sample HTML</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    ${umdScriptTags.chatWidget}${
      customModalitiesExample != null
        ? `
    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/htm/3.1.1/htm.js" integrity="sha512-RilD4H0wcNNxG2GvB+L1LRXCntT0zgRvRLnmGu+e9wWaLKGkPifz3Ozb6+WPsyEkTBLw6zWCwwEjs9JLL1KIHg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>`
        : ""
    }
    <script>
      window.addEventListener("DOMContentLoaded", () => {${
        customModalitiesExample != null
          ? `

        // EMBEDDABLE COMPONENT SETUP
        // Destructure dependencies
        const React = nlxai.chatWidget.React;
        const useConversationHandler = nlxai.chatWidget.useConversationHandler;

        // Use the https://github.com/developit/htm package as a JSX alternative
        const html = htm.bind(React);

        // Render component that supports user interaction and conversation handler support
        const SendExampleSlot = () => {
          const conversationHandler = useConversationHandler();
          return html\`
            <button onClick=\${() => {
              conversationHandler.sendSlots({ "firstName": "Rachel" });
            }>Send a slot</button>
          \`;
        };
        // EMBEDDABLE COMPONENT SETUP END
`
          : ""
      }
        const widget = nlxai.chatWidget.create({
          config: {
            botUrl: "${defaultTo(config.botUrl, "REPLACE_WITH_BOT_URL")}",
            headers: {
              "nlx-api-key": "${defaultTo(config.headers?.["nlx-api-key"], "REPLACE_WITH_API_KEY")}"
            },
            languageCode: "${config.languageCode}"
          },${
            customModalitiesExample != null
              ? `
          // Include custom embeddable component under the 'customModalities' field
          customModalities: { SendExampleSlot },`
              : ""
          }
          titleBar: ${indentBy(
            "          ",
            JSON.stringify(titleBar, null, 2),
          )},${
            behavior === Behavior.WelcomeIntentOnOpen
              ? indentBy(
                  "          ",
                  `
// CUSTOM BEHAVIOR SNIPPET
onExpand: (conversationHandler) => {
  const checkMessages = (messages) => {
    if (messages.length === 0) {
      conversationHandler.sendWelcomeIntent();
    }
    conversationHandler.unsubscribe(checkMessages);
  };
  conversationHandler.subscribe(checkMessages);
},
// CUSTOM BEHAVIOR SNIPPET END`,
                )
              : behavior === Behavior.UseSessionStorage
                ? indentBy(
                    "          ",
                    `
// CUSTOM BEHAVIOR SNIPPET
storeIn: "sessionStorage",
// CUSTOM BEHAVIOR SNIPPET END`,
                  )
                : behavior === Behavior.UseLocalStorage
                  ? indentBy(
                      "          ",
                      `
// CUSTOM BEHAVIOR SNIPPET
storeIn: "localStorage",
// CUSTOM BEHAVIOR SNIPPET END`,
                    )
                  : ""
          }
          ${
            theme != null
              ? `theme: ${indentBy(
                  "          ",
                  JSON.stringify(theme, null, 2),
                )}`
              : ""
          }
        });${
          behavior === Behavior.CustomIntentOnInactivity
            ? indentBy(
                "        ",
                `

// CUSTOM BEHAVIOR SNIPPET
${sendWelcomeOnTimeoutSnippet}
// CUSTOM BEHAVIOR SNIPPET END`,
              )
            : ""
        }${
          behavior === Behavior.InitializeWithContext
            ? indentBy(
                "        ",
                `

// CUSTOM BEHAVIOR SNIPPET
${initializeWithContextSnippet}
// CUSTOM BEHAVIOR SNIPPET END`,
              )
            : ""
        }
      });
    </script>
  </body>
</html>`;
};

const sendWelcomeOnTimeoutSnippet = `setTimeout(() => {
  const conversationHandler = widget.getConversationHandler();
  if (conversationHandler) {
    conversationHandler.sendIntent("MyCustomIntent");
    widget.expand();
  }
}, 16000);`;

const initializeWithContextSnippet = `const conversationHandler = widget.getConversationHandler();

const context = {
  firstName: "Joe"
};

conversationHandler.sendWelcomeIntent(context);`;

export const voiceCompassSnippet = ({
  config,
  environment,
}: {
  config?: Partial<MMConfig>;
  environment?: Environment;
}): string => {
  const conversationId = (() => {
    if (config !== undefined) {
      if ("conversationIdSnippet" in config) {
        return config.conversationIdSnippet;
      }

      if ("conversationId" in config && config.conversationId !== "") {
        return `"${config.conversationId}"`;
      }
    }

    return '"REPLACE_WITH_CONVERSATION_ID"';
  })();

  const languageCode = (() => {
    if (config !== undefined) {
      if ("languageCodeSnippet" in config) {
        return config.languageCodeSnippet;
      }

      if ("languageCode" in config && config.languageCode !== "") {
        return `"${config.languageCode}"`;
      }
    }

    return '"REPLACE_WITH_LANGUAGE_CODE"';
  })();

  return `const client = ${
    environment === Environment.Html ? "nlxai." : ""
  }voiceCompass.create({
  // hard-coded params
  apiKey: "${defaultTo(config?.apiKey, "REPLACE_WITH_API_KEY")}",
  workspaceId: "${defaultTo(config?.workspaceId, "REPLACE_WITH_WORKSPACE_ID")}",
  journeyId: "${defaultTo(config?.journeyId, "REPLACE_WITH_JOURNEY_ID")}",
  // dynamic params
  conversationId: ${conversationId},
  languageCode: ${languageCode},
});

client.sendStep("${defaultTo(config?.testStepId, "REPLACE_WITH_STEP_ID")}");`;
};

type ScriptTagsType = Record<keyof typeof umdScriptSrc, string>;

export const umdScriptTags: ScriptTagsType = (
  Object.keys(umdScriptSrc) as Array<keyof typeof umdScriptSrc>
).reduce<ScriptTagsType>(
  (acc, key) => ({
    ...acc,
    [key]: `<script defer src="${umdScriptSrc[key]}"></script>`,
  }),

  // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter, @typescript-eslint/consistent-type-assertions
  {} as ScriptTagsType,
);

export const journeyManagerSnippet: string = `${umdScriptTags.journeyManager}
<script>
  // Get conversation ID from the URL, assuming it is included as a 'cid' search param
  const getCid = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("cid");
  };

  const triggers = {};

  window.addEventListener("DOMContentLoaded", () => {
    nlxai.journeyManager.run(
      {
        // hard-coded params
        apiKey: "REPLACE_WITH_API_KEY",
        workspaceId: "REPLACE_WITH_WORKSPACE_ID",
        journeyId: "REPLACE_WITH_JOURNEY_ID",
        // dynamic params
        conversationId: getCid(),
        languageCode: "REPLACE_WITH_LANGUAGE_CODE",
      },
      // Triggers object obtained from the journey step configuration
      {}
    );
  });
</script>
`;

export const voiceCompassSetupSnippet = (cfg: {
  config?: Partial<MMConfig>;
  environment?: Environment;
}): string => {
  if (cfg.environment === Environment.Html) {
    return `${umdScriptTags.voiceCompass}
<script>
  ${indentBy("  ", voiceCompassSnippet(cfg))}
</script>`;
  }

  return `import * as voiceCompass from "@nlxai/voice-compass";

${voiceCompassSnippet(cfg)}`;
};
