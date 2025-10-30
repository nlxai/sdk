import { type Config } from "@nlxai/core";
import { umdScriptSrc } from "./constants";
import { type Config as VoicePlusConfig } from "./components/VoicePlusConfiguration";

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

export const indentBy = (indendStr: string, str: string): string =>
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

const museumComponents = `
const MuseumExhibitCarousel = ({ data, conversationHandler }) => {
  const [selected, setSelected] = React.useState(null);

  return html\`
    <Carousel>
      \${data.map((exhibit, index) => html\`
        <CustomCard
          key=\${index}
          selected=\${selected === index}
          onClick=\${() => {
          setSelected(index);
          conversationHandler.sendChoice(exhibit.id);
          }}
        >
          <CustomCardImageRow 
            src=\${exhibit.imageUrl} 
            alt=\${exhibit.name}
          />
          <CustomCardRow
            left=\${html\`<BaseText faded><div/></BaseText>\`}
            right=\${html\`<BaseText>\${exhibit.name}</BaseText>\`}
          />
          <CustomCardRow
            left=\${html\`<BaseText faded>Dates:</BaseText>\`}
            right=\${html\`<BaseText>Through \${exhibit.endDate}</BaseText>\`}
          />
        </CustomCard>\`
      )}
    </Carousel>
  \`;
};

const MuseumExhibitDetails = ({ data, conversationHandler }) => {
  const detailedUrls = data.detailImageUrls;
  return html\`
    <Carousel>
      <CustomCard>
        <CustomCardImageRow 
          src=\${data.imageUrl} 
          alt=\${data.name}
        />
      </CustomCard>
      \${detailedUrls.map((imageUrl) => html\`
        <CustomCard>
          <CustomCardImageRow 
            src=\${imageUrl} 
            alt=\${data.name}
          />
        </CustomCard>\`
      )}
    </Carousel>
    <BaseText faded>Dates</BaseText>
    <BaseText>Through \${data.endDate}</BaseText>
        
    <BaseText faded>Location</BaseText>
    <BaseText>\${data.galleryLocation}</BaseText>
        
    <BaseText faded>About this exhibition</BaseText>
    <BaseText>\${data.summary}</BaseText>
  \`;
};
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const bidirectionalVoicePlus = (
  config: Config,
): string => `const touchpoint = await create({
  config: {
    applicationUrl: "${defaultTo(config.applicationUrl, "REPLACE_WITH_APPLICATION_URL")}",
    headers: {
      "nlx-api-key": "${defaultTo(
        config.headers?.["nlx-api-key"],
        "REPLACE_WITH_API_KEY",
      )}"
    },
    languageCode: "${config.languageCode}",
    userId: "${defaultTo(config.userId, "REPLACE_WITH_USER_ID")}",
  },
  input: "voiceMini",
  bidirectional: {},
});`;

export type TemplateComponents =
  | "noComponents"
  | "museumComponents"
  | "bidirectionalVoicePlus";

export const touchpointUiSetupSnippet = ({
  config,
  theme,
  input = "text",
  colorMode = "light",
  templateComponents = "noComponents",
  bidirectional = false,
}: {
  config: Config;
  theme?: {
    fontFamily: string;
    accent: string;
  };
  input: string;
  colorMode: "light" | "dark";
  templateComponents?: TemplateComponents;
  bidirectional?: boolean;
}): string => {
  return `${templateComponents === "museumComponents" ? `${museumComponents}\n\n` : ""}const touchpoint = await create({
  config: {
    applicationUrl: "${defaultTo(config.applicationUrl, "REPLACE_WITH_APPLICATION_URL")}",
    headers: {
      "nlx-api-key": "${defaultTo(
        config.headers?.["nlx-api-key"],
        "REPLACE_WITH_API_KEY",
      )}"
    },
    languageCode: "${config.languageCode}",
    userId: "${defaultTo(config.userId, "REPLACE_WITH_USER_ID")}"
  },
  colorMode: "${colorMode}",
  input: "${input}",${
    theme != null
      ? `
  theme: ${JSON.stringify(theme)},`
      : ""
  }${
    templateComponents === "museumComponents"
      ? `
  modalityComponents: { MuseumExhibitDetails, MuseumExhibitCarousel },`
      : ""
  }${
    input === "voiceMini" && bidirectional
      ? `
  bidirectional: {},`
      : ""
  }
});`;
};

export const headlessSetupSnippet: string = `import { createConversation } from "@nlxai/core";

// Create some configuration
const config = {
  botUrl: "", // obtain from NLX deployments page
  headers: {
    "nlx-api-key": "", // obtain from NLX deployments page
  },
  conversationId: "", // start with a specific conversation ID - useful if you want to resume a previous conversation
  languageCode: "es-US", // optional language code for standard bots that do not run on US English
  environment: "production", // optional environment name for multi-environment bots to control which data request environment should be used.  "production" or "development" are the only supported values.
};

// Start the conversation
const convo = createConversation(config);

// Subscribe to changes in the list of responses; the newest response is sent as a second argument
convo.subscribe((responses, newResponse) => {
  console.log(responses);
});

// Send a message from the user's end
convo.sendText("hello");`;

export const voicePlusSnippet = ({
  config,
  environment,
}: {
  config?: Partial<VoicePlusConfig>;
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
  }voicePlusCore.create({
  // hard-coded params
  apiKey: "${defaultTo(config?.apiKey, "REPLACE_WITH_API_KEY")}",
  workspaceId: "${defaultTo(config?.workspaceId, "REPLACE_WITH_WORKSPACE_ID")}",
  scriptId: "${defaultTo(config?.scriptId, "REPLACE_WITH_SCRIPT_ID")}",
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

export const voicePlusWebSnippet = ({
  digressionButton,
}: {
  digressionButton: boolean;
}): string => `<html>
  <head>${
    digressionButton
      ? `
    <style>
      @keyframes fadeInKeyframes {
        0% {
          transform: translate3d(0, 8px, 0);
          opacity: 0;
        }
        100% {
          transform: translate3d(0, 0, 0);
          opacity: 1;
        }
      }

      #nlx-multimodal-resume {
        animation: fadeInKeyframes 0.6s normal forwards ease-in-out;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10000;
      }

      #nlx-multimodal-resume button {
        display: block;
        width: 100%;
        padding: 15px 10px;
        font-size: 12px;
        letter-spacing: 0.5px;
        font-weight: 600;
        text-transform: uppercase;
        text-align: center;
        border: 0;
        background-color: rgba(38, 99, 218, 1);
        color: white;
        cursor: pointer;
      }

      #nlx-multimodal-resume button:hover {
        background-color: rgba(30, 86, 196, 1);
      }
    </style>`
      : ""
  }
    ${umdScriptTags.voicePlusWeb}
    <script>
      // Get conversation ID from the URL, assuming it is included as a 'cid' search param (and save in session storage)
      // On subsequent page loads, retrieve from session storage assuming it was saved in the past half an hour
      const getCid = () => {
        const localStorageKey = "nlx-voice-plus-web-session";
        const saveToSessionStorage = (conversationId) => {
          sessionStorage.setItem(localStorageKey, JSON.stringify({
            conversationId,
            timestamp: new Date().getTime()
          }));
        };
        const retrieveFromSessionStorage = () => {
          try {
            const val = sessionStorage.getItem(localStorageKey);
            if (!val) {
              return null;
            }
            const parsed = JSON.parse(val);
            if (parsed != null && typeof parsed == "object" && new Date().getTime() - parsed.timestamp < 30 * 60 * 1000) {
              return parsed.conversationId;
            }
          } catch(_err) {
            return null;
          }
        }
        const params = new URLSearchParams(window.location.search);
        const cidFromParams = params.get("cid");
        if (cidFromParams) {
          saveToSessionStorage(cidFromParams);
          return cidFromParams;
        }
        return retrieveFromSessionStorage();
      };

      const triggers = {};

      const contentLoaded = () => {
        if (document.readyState === "loading") {
          return new Promise((resolve) => {
            window.addEventListener("DOMContentLoaded", () => {
              resolve();
            });
          });
        } else {
          return Promise.resolve();
        }
      };

      contentLoaded().then(() => {
        nlxai.voicePlusWeb.run({
          config: {
            // hard-coded params
            apiKey: "REPLACE_WITH_API_KEY",
            workspaceId: "REPLACE_WITH_WORKSPACE_ID",
            scriptId: "REPLACE_WITH_SCRIPT_ID",
            // dynamic params
            conversationId: getCid(),
            languageCode: "REPLACE_WITH_LANGUAGE_CODE",
          },
          // Triggers object obtained from the journey step configuration
          triggers: {},
          // Send a custom step if a digression is detected
          onDigression: (client) => {
${
  digressionButton
    ? `            const container = document.createElement("div");
            container.id = "nlx-multimodal-resume";
            container.innerHTML = \`<button>Resume journey</button>\`;
            document.body.appendChild(container);
            container.querySelector("button").addEventListener("click", () => {
              window.history.back();
            });`
    : `            client.sendStep("REPLACE_WITH_STEP_ID");`
}
          }
        });
      });
    </script>
  </head>
  <body>
  </body>
</html>
`;

export const voicePlusSetupSnippet = (cfg: {
  config?: Partial<VoicePlusConfig>;
  environment?: Environment;
}): string => {
  if (cfg.environment === Environment.Html) {
    return `${umdScriptTags.voicePlusCore}
<script>
  const contentLoaded = () => {
    if (document.readyState === "loading") {
      return new Promise((resolve) => {
        window.addEventListener("DOMContentLoaded", () => {
          resolve();
        });
      });
    } else {
      return Promise.resolve();
    }
  };

  contentLoaded().then(() => {
    ${indentBy("    ", voicePlusSnippet(cfg))}
  });
</script>`;
  }

  return `import * as voicePlusCore from "@nlxai/voice-plus-core";

${voicePlusSnippet(cfg)}`;
};
