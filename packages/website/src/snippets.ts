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

// initial eslint integration
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
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

export const sendWelcomeOnTimeoutSnippet = `setTimeout(() => {
  const conversationHandler = widget.getConversationHandler();
  if (conversationHandler) {
    conversationHandler.sendIntent("MyCustomIntent");
    widget.expand();
  }
}, 16000);`;

export const initializeWithContextSnippet = `const conversationHandler = widget.getConversationHandler();

const context = {
  firstName: "Joe"
};

conversationHandler.sendWelcomeIntent(context);`;

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

export const fileUploadSnippet = `const FileUpload = ({ onUploadComplete }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [dragOver, setDragOver] = useState<boolean>(false);

  const uploadFile = (file: File) => {
    const uploadTime = 2000;

    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          onUploadCompleted(file.name);
          return 100;
        }
        return Math.min(oldProgress + 10, 100);
      });
    }, uploadTime / 10);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
      uploadFile(file);
    }
  };
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {

    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  return html\`
    <div
      className=\${dragOver ? "file-upload file-upload-drag-over" : "file-upload"}
      onDragOver=\${handleDragOver}
      onDragLeave=\${handleDragLeave}
      onDrop=\${handleDrop}
      onClick=\${() => document.getElementById("file-upload")?.click()}
    >
      <input type="file" id="file-upload" hidden onChange=\${handleFileChange} />
      <div className="file-input-custom">
        <div className="file-input-custom-icon">
          \${uploadProgress > 0 ?
            '<CircularProgressBar progress=' + uploadProgress + ' size=25 strokeWidth=2 />' :
            '<img src=' + uploadIcon + ' alt="upload" className="file-input-button-icon" />'}
        </div>
        <span className="file-input-name">
          \${selectedFile?.name ?? "Select a file..."}
        </span>
      </div>
    </div>
  \`;
`;

export const datePickerSnippet = `export const DatePicker = ({ submitted, onSubmit }) => {
  const [datepicker, setDatepicker] = useState(null);

  useEffect(() => {
    const elem = document.getElementById("datepicker");
    const datepicker = new window.Datepicker(elem, {
      weekStart: 1, // Monday
    });
    datepicker.setDate(new Date());
    setDatepicker(datepicker);
  }, []);

  return html\`
    <form
      className="chat-datepicker"
      onSubmit=\${(ev) => {
        ev.preventDefault();

        const date = datepicker.getDate();
        onSubmit(date);

        datepicker.setDate({ clear: true });
      }}
    >
      <div id="datepicker"></div>
      <button type="submit" disabled=\${submitted}>Submit</button>
    </form>
  \`;
};
`;

export const addressInputSnippet = `const AddressInput = ({ onAddressChange, address, onSubmit, submitted }) => {
  const [coordinates, setCoordinates] = useState(null);
  const textareaRef = useRef(null);
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google) {
        return;
      }

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + import.meta.env.VITE_GOOGLE_MAPS_API_KEY + '&libraries=places';
      script.async = true;
      script.defer = true;
      script.onload = () => setIsGoogleMapsLoaded(true);
      document.head.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  useEffect(() => {
    const initializeAutocomplete = () => {
      if (!window.google || !textareaRef.current) return;

      const autocomplete = new google.maps.places.Autocomplete(
        textareaRef.current,
        { types: ['address'] }
      );

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        // ... rest of the logic
      });
    };

    initializeAutocomplete();
  }, [isGoogleMapsLoaded]);

  return html\`
    <form
      className="address-container"
      onSubmit=\${(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <textarea
        ref=\${textareaRef}
        value=\${address}
        onChange=\${(e) => onAddressChange(e.target.value)}
        placeholder="Enter address here"
        rows={5}
        className="address-textarea"
      />
      \${coordinates ?
        '<Map className="map-container" lat=' + coordinates.lat + ' lng=' + coordinates.lng + ' />' :
        '<div className="map-placeholder"></div>'
      }
      <button disabled=\${!coordinates || submitted} type="submit">Submit</button>
    </form>
  \`;
};
`;

export const mapSnippet = `const Map = ({ lat, lng, className }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom: 15,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
      });

      new google.maps.Marker({
        map: map,
        position: { lat, lng },
      });
    }
  }, [lat, lng]);

  return html\`<div className=\${className} ref=\${mapRef}></div>\`;
};
`;

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
