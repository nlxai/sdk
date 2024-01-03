import { type Config } from "@nlxai/chat-core";
import { type TitleBar, type Theme } from "@nlxai/chat-widget";
import { type Config as VoiceCompassConfig } from "@nlxai/voice-compass";
import { umdScriptTags } from "./constants";

export enum Behavior {
  Simple,
  WelcomeIntentOnOpen,
  CustomIntentOnInactivity,
  UseSessionStorage,
  UseLocalStorage,
}

export enum Environment {
  Html,
  Bundle,
  Node,
}

const indentBy = (indendStr: string, str: string) =>
  str
    .split("\n")
    .map((str, index) => `${index === 0 ? "" : indendStr}${str}`)
    .join("\n");

export const coreSetupSnippet = `const config = {
  botUrl: "REPLACE_WITH_BOT_URL",
  headers: {
    "nlx-api-key": "REPLACE_WITH_API_KEY",
  },
  languageCode: "en-US",
  userId: "abcd-1234",
  conversationId: "", // start with a specific conversation ID - useful if you want to resume a previous conversation
  environment: "production", // optional environment name for multi-environment bots to control which data request environment should be used.  "production" or "development" are the only supported values.
};

const convo = createConversation(config);

// Subscribe to changes
convo.subscribe((responses, newResponse) => {
  console.log("All responses so far, both from the bot and the user", responses);
  console.log("The latest response", newResponse);
});

// Send a message to the bot
convo.sendText("Hello, I want to order a coffee");`;

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
}) => {
  return `<!-- Chat widget sample HTML -->
<!-- Downloaded from https://nlxai.github.io/chat-sdk -->
<html lang="en">
  <head>
    <title>NLX Widget Sample HTML</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <script defer src="${umdScriptTags.chatWidget}"></script>${
      customModalitiesExample
        ? `
    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/htm/3.1.1/htm.js" integrity="sha512-RilD4H0wcNNxG2GvB+L1LRXCntT0zgRvRLnmGu+e9wWaLKGkPifz3Ozb6+WPsyEkTBLw6zWCwwEjs9JLL1KIHg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>`
        : ""
    }
    <script>
      window.addEventListener("DOMContentLoaded", () => {${
        customModalitiesExample
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
            botUrl: "${config.botUrl || "REPLACE_WITH_BOT_URL"}",
            headers: {
              "nlx-api-key": "${
                config.headers?.["nlx-api-key"] || "REPLACE_WITH_API_KEY"
              }"
            },
            languageCode: "${config.languageCode}"
          },${
            customModalitiesExample
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
  }
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
            theme
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
        }
      });
    </script>
  </body>
</html>`;
};

export const sendWelcomeOnTimeoutSnippet = `setTimeout(() => {
  const conversationHandler = widget.getConversationHandler();
  if (conversationHandler) {
    conversationHandler.sendIntent("MyCustomIntent");
  }
}, 16000);`;

export const customWidgetSnippet = `
import { useChat } from "@nlxai/chat-react";

const CustomWidget = () => {
  // Instantiate the chat with the same bot configuration as the off-the-shelf widget
  const chat = useChat({
    botUrl: "",
    headers: {
      "nlx-api-key": ""
    }
  });

  return (
    <div>
      {chat.responses.map((response, index) => {
        if (response.type === "user" && response.payload.type === "text") {
          return <div className="chat-bubble chat-bubble--user">{response.payload.text}</div>;
        }
        if (response.type === "bot") {
          return response.payload.messages.map((message, messageIndex) => {
            return <div className="chat-bubble chat-bubble--bot">{message.text}</div>;
          });
        }
      })}
      {chat.waiting && <div>...</div>}
      <input 
        value={chat.inputValue} 
        onInput={(event) => {
          chat.setInputValue(event.target.value);
        }}
      />
    </div>
  );
}
`;

export const disclaimerSnippet = `const Disclaimer = () => {
  const [status, setStatus] = useState("pending");
  return html\`
    <div className="chat-disclaimer">
      \${status === "pending" &&
        html\`
          <p>
            In order to enhance your experience in this chat, we would like to
            temporarily store personal data according to our${" "}
            <a>privacy policy</a>.
          </p>
          <button
            onClick=\${() => {
              setStatus("accepted");
            }}
          >
            Accept
          </button>
          <button
            onClick=\${() => {
              setStatus("denied");
            }}
          >
            Deny
          </button>
        \`}
      \${status === "accepted" &&
        html\`
          <p>
            As requested, we might store certain personal or device identifiers
            to enhance your experience on this chat.
          </p>
        \`}
      \${status === "denied" &&
        html\`
          <p>
            As requested, we will not store personal information in this chat.
          </p>
        \`}
    </div>
  \`;
};`;

export const carouselSnippet = `const Carousel = ({ data }) => {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  return html\`
    <div className="chat-carousel-container">
      <div className="chat-carousel-slides">
        \${data.map(
          document =>
            html\`
              <div
                className=\${\`chat-carousel-slide \${
                  selectedId === document.id
                    ? "chat-carousel-slide--active"
                    : ""
                }\`}
                key=\${document.id}
                onClick=\${() => {
                  setSelectedId(document.id);
                }}
              >
                <div className="chat-carousel-title">\${document.name}</div>
                <div
                  className="chat-carousel-image"
                  style=\${{
                    backgroundImage: \`url(\${document.imageUrl})\`
                  }}
                />
                <div className="chat-carousel-description">
                  \${document.description}
                </div>
              </div>
            \`
        )}
      </div>
    </div>
  \`;
};`;

export const feedbackFormSnippet = `const FeedbackForm = () => {
  const handler = useConversationHandler();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const [submitted, setSubmitted] = useState<boolean>(false);

  return html\`
    <form
      className="chat-feedback-form"
      onSubmit=\${(event) => {
        event.preventDefault();
        setSubmitted(true);
        handler?.sendSlots({
          firstName,
          lastName,
          email,
          feedback,
        });
      }}
    >
      <input
        placeholder="First name"
        required
        disabled=\${submitted}
        value=\${firstName}
        onInput=\${(ev: any) => {
          setFirstName(ev.target.value);
        }}
      />
      <input
        placeholder="Last name"
        required
        disabled=\${submitted}
        value=\${lastName}
        onInput=\${(ev: any) => {
          setLastName(ev.target.value);
        }}
      />
      <input
        type="email"
        required
        placeholder="Email"
        disabled=\${submitted}
        value=\${email}
        onInput=\${(ev: any) => {
          setEmail(ev.target.value);
        }}
      />
      <textarea
        placeholder="Feedback"
        required
        disabled=\${submitted}
        value=\${feedback}
        onInput=\${(ev: any) => {
          setFeedback(ev.target.value);
        }}
      />
      \${!submitted &&
        html\`
          <button type="submit">Submit</button>
        \`}
    </form>
  \`;
};`;

const voiceCompassCommonScript = ({
  config,
  environment,
}: {
  config?: VoiceCompassConfig;
  environment?: Environment;
}) => `${
  environment === Environment.Html
    ? ""
    : `import * as voiceCompass from "@nlxai/voice-compass";\n\n`
}const client = voiceCompass.create({
  apiKey: ${config?.apiKey || "REPLACE_WITH_API_KEY"},
  workspaceId: ${config?.workspaceId || "REPLACE_WITH_WORKSPACE_ID"},
  conversationId: ${config?.conversationId || "REPLACE_WITH_CONVERSATION_ID"},
  journeyId: ${config?.journeyId || "REPLACE_WITH_JOURNEY_ID"},
  languageCode: ${config?.languageCode || "REPLACE_WITH_LANGUAGE_CODE"},
});

client.updateStep({
  stepId: "REPLACE_WITH_STEP_ID",
});`;

export const voiceCompassSetupSnippet = ({
  config,
  environment,
}: {
  config?: VoiceCompassConfig;
  environment?: Environment;
}) => {
  if (environment === Environment.Html) {
    return `<script src="${umdScriptTags.voiceCompass}">
</script>
<script>
  ${indentBy("  ", voiceCompassCommonScript({ config, environment }))}
</script>`;
  }
  return voiceCompassCommonScript({ config, environment });
};
