/* eslint-disable jsdoc/require-jsdoc */
import { useState, useEffect, useRef, type FC } from "react";
import {
  createConnectChatConversation,
  fetchChatDetails,
} from "@nlxai/connect-chat-adapter";
import { ProviderStack } from "../ProviderStack";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "nlx-touchpoint": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

interface ConnectChatConfig {
  endpoint: string;
  instanceId: string;
  contactFlowId: string;
  displayName: string;
  region: string;
}

const defaults: Partial<ConnectChatConfig> = {
  displayName: "Customer",
  region: "us-east-1",
};

const fields: Array<{
  key: keyof ConnectChatConfig;
  label: string;
  placeholder: string;
}> = [
  {
    key: "endpoint",
    label: "API Gateway Endpoint URL",
    placeholder: "https://abc123.execute-api.us-east-1.amazonaws.com/Prod",
  },
  {
    key: "instanceId",
    label: "Instance ID",
    placeholder: "11111111-1111-1111-1111-111111111111",
  },
  {
    key: "contactFlowId",
    label: "Contact Flow ID",
    placeholder: "22222222-2222-2222-2222-222222222222",
  },
  {
    key: "displayName",
    label: "Display Name",
    placeholder: "Customer",
  },
  {
    key: "region",
    label: "Region",
    placeholder: "us-east-1",
  },
];

export const ConnectChat: FC = () => {
  const [config, setConfig] = useState<ConnectChatConfig>(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      endpoint: params.get("endpoint") ?? "",
      instanceId: params.get("instanceId") ?? "",
      contactFlowId: params.get("contactFlowId") ?? "",
      displayName: params.get("displayName") ?? defaults.displayName ?? "",
      region: params.get("region") ?? defaults.region ?? "",
    };
  });

  const [started, setStarted] = useState(false);
  const touchpointRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    for (const { key } of fields) {
      const value = config[key].trim();
      if (value && value !== (defaults[key] ?? "")) {
        url.searchParams.set(key, value);
      } else {
        url.searchParams.delete(key);
      }
    }
    history.replaceState(null, "", url);
  }, [config]);

  useEffect(() => {
    if (!started || !touchpointRef.current) return;

    const { endpoint, instanceId, contactFlowId, displayName, region } = config;

    const conversationHandler = createConnectChatConversation({
      details: () =>
        fetchChatDetails(endpoint, {
          instanceId,
          contactFlowId,
          participantDisplayName:
            displayName === "" ? defaults.displayName : displayName,
        }),
      region: region === "" ? defaults.region : region,
    });

    (touchpointRef.current as any).touchpointConfiguration = {
      conversationHandler,
      config: {
        languageCode: "en-US",
      },
      windowSize: "half",
      colorMode: "dark",
      input: "text",
      chatMode: true,
      theme: {
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        accent: "#e8600a",
        primary: "rgb(255, 255, 255)",
        secondary: "rgb(0, 2, 9)",
        background: "rgba(0, 2, 9, 0.95)",
      },
      initializeConversation: () => {},
    };
  }, [started]);

  const handleSubmit = (): void => {
    if (!config.endpoint.trim()) {
      alert("API Gateway Endpoint URL is required.");
      return;
    }
    setStarted(true);
  };

  if (started) {
    return (
      <nlx-touchpoint ref={touchpointRef} className="block w-full h-screen" />
    );
  }

  return (
    <ProviderStack colorMode="light" languageCode="en-US">
      <div className="flex items-center justify-center min-h-screen bg-background p-4">
        <div className="w-full max-w-md rounded-outer bg-secondary p-8 shadow-2xl">
          <h1 className="text-xl font-semibold text-primary-80 mb-1">
            Connect Chat + Touchpoint
          </h1>
          <p className="text-sm text-primary-40 mb-6">
            Enter your Amazon Connect details to launch a chat session powered
            by Touchpoint UI.
          </p>

          <div className="space-y-4">
            {fields.map(({ key, label, placeholder }) => (
              <div key={key}>
                <label
                  htmlFor={`connect-chat-${key}`}
                  className="block text-xs font-medium text-primary-60 mb-1"
                >
                  {label}
                </label>
                <input
                  id={`connect-chat-${key}`}
                  type="text"
                  placeholder={placeholder}
                  value={config[key]}
                  onChange={(e) =>
                    setConfig((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  className="w-full rounded-inner border border-primary-5 bg-primary-5 px-3 py-2 text-sm text-primary-80 placeholder-primary-20 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 w-full rounded-inner bg-accent px-4 py-3 text-sm font-semibold text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background transition-colors"
          >
            Start Chat
          </button>
        </div>
      </div>
    </ProviderStack>
  );
};
