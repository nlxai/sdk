/* eslint-disable jsdoc/require-jsdoc */
import { useState, useEffect, useRef, type FC } from "react";
import {
  createConnectChatConversation,
  fetchChatDetails,
} from "@nlxai/connect-chat-adapter";
import { ProviderStack } from "../ProviderStack";
import {
  joinVoiceSession,
  startWebRtcContact,
  type VoiceSession,
} from "./connectVoiceSession";

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

  const [voiceEnabled, setVoiceEnabled] = useState(
    () => new URLSearchParams(window.location.search).get("voice") === "1",
  );
  const [started, setStarted] = useState(false);
  const [voiceMuted, setVoiceMuted] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const touchpointRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const voiceSessionRef = useRef<VoiceSession | null>(null);

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
    if (voiceEnabled) {
      url.searchParams.set("voice", "1");
    } else {
      url.searchParams.delete("voice");
    }
    history.replaceState(null, "", url);
  }, [config, voiceEnabled]);

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

  useEffect(() => {
    const { endpoint, instanceId, contactFlowId, displayName } = config;

    const audioElement = audioRef.current;

    // Voice is opt-in: it needs a backend route that calls StartWebRTCContact,
    // which the StartChatContact endpoint used for chat cannot do.
    if (!started || !voiceEnabled || audioElement == null) return;

    // Tracks whether this effect run is still current, so a session started by a
    // run that has since been cleaned up gets torn down instead of leaking.
    let cancelled = false;

    startWebRtcContact(endpoint, {
      instanceId,
      contactFlowId,
      participantDisplayName:
        displayName === "" ? (defaults.displayName ?? "") : displayName,
    })
      .then(async (contact) => {
        // eslint-disable-next-line no-console
        console.log("WebRTC contact", contact);

        const session = await joinVoiceSession({
          connectionData: contact.ConnectionData,
          audioElement,
          onStart: () => setVoiceActive(true),
          onStop: () => setVoiceActive(false),
        });

        if (cancelled) {
          await session.leave();
          return;
        }
        voiceSessionRef.current = session;
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error("Failed to start voice call", err);
        if (!cancelled) {
          setVoiceError(err instanceof Error ? err.message : String(err));
        }
      });

    return () => {
      cancelled = true;
      const session = voiceSessionRef.current;
      voiceSessionRef.current = null;
      setVoiceActive(false);
      setVoiceError(null);
      void session?.leave();
    };
  }, [started, voiceEnabled]);

  const handleToggleMute = (): void => {
    const session = voiceSessionRef.current;
    if (session == null) return;
    setVoiceMuted(session.toggleMute());
  };

  const handleSubmit = (): void => {
    if (!config.endpoint.trim()) {
      alert("API Gateway Endpoint URL is required.");
      return;
    }
    setStarted(true);
  };

  if (started) {
    return (
      <>
        <nlx-touchpoint ref={touchpointRef} className="block w-full h-screen" />
        {/* Remote call audio is routed here; must stay mounted for the session. */}
        <audio ref={audioRef} />
        {voiceActive && (
          <button
            onClick={handleToggleMute}
            className="fixed bottom-4 left-4 rounded-inner bg-accent px-4 py-2 text-sm font-semibold text-secondary focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {voiceMuted ? "Unmute" : "Mute"}
          </button>
        )}
        {voiceError != null && (
          <p className="fixed bottom-4 left-4 max-w-sm rounded-inner bg-secondary px-4 py-2 text-xs text-primary-60">
            Voice call unavailable: {voiceError}
          </p>
        )}
      </>
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

            <label
              htmlFor="connect-chat-voice"
              className="flex items-start gap-2 text-xs font-medium text-primary-60"
            >
              <input
                id="connect-chat-voice"
                type="checkbox"
                checked={voiceEnabled}
                onChange={(e) => setVoiceEnabled(e.target.checked)}
                className="mt-0.5 accent-accent"
              />
              <span>
                Also start a voice call
                <span className="block text-primary-40">
                  Requires the endpoint to expose a StartWebRTCContact route.
                </span>
              </span>
            </label>
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
