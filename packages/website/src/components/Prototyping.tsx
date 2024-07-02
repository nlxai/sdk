import { type FC, useRef, useEffect, useState } from "react";

const runJourneyManager = async (): Promise<unknown> => {
  const { run } = await import("@nlxai/journey-manager");
  await run({
    config: {
      apiKey: "",
      journeyId: "",
      workspaceId: "",
      conversationId: "abcd",
      languageCode: "en-US",
    },
    ui: {
      title: "Call Control Center",
      subtitle: "Manage your call experience with us",
      highlights: true,
      theme: {
        fontFamily: "'Neue Haas Grotesk'",
      },
    },
    triggers: {
      // Page load
      "5c539d6c-ea44-455d-a138-0cb8094c09b2": {
        event: "pageLoad",
      },
      // Page load: URL condition
      "63e5b924-7e12-47fc-a24c-655119fd32d9": {
        event: "pageLoad",
        urlCondition: {
          operator: "contains",
          value: "#tab2",
        },
      },
      // Appear step
      "9d668597-207d-4d1d-9136-1f6c7c89b49f": {
        event: "appear",
        query: {
          parent: null,
          options: null,
          name: "QuerySelector",
          target: "#error",
        },
      },
      // Click step
      "1cf7eeb6-1906-47a2-ac79-4bf1a1e8849e": {
        event: "click",
        query: {
          parent: null,
          name: "QuerySelector",
          options: null,
          target: "#click",
        },
      },
      // Click step: once
      "2e952b0c-0b03-4a99-b5d1-1e3fdd77839b": {
        event: "click",
        once: true,
        query: {
          parent: null,
          options: null,
          name: "QuerySelector",
          target: "#click-once",
        },
      },
    },
  });
  return null;
};

export const Prototyping: FC<unknown> = () => {
  const isRun = useRef(false);

  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    if (isRun.current) {
      return;
    }
    isRun.current = true;
    runJourneyManager().catch((err) => {
      // eslint-disable-next-line no-console
      console.warn(err);
    });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowError(true);
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [setShowError]);

  const [tab, setTab] = useState<string | null>(null);

  useEffect(() => {
    const tabFromHash = window.location.hash.replace("#", "");
    setTab(tabFromHash === "" ? "tab1" : tabFromHash);
  }, []);

  return (
    <div>
      <h1 className="text-xl">Test page</h1>
      {showError ? (
        <div className="p-2 rounded text-red-600 bg-red-50" id="error">
          Error
        </div>
      ) : null}
      <div>
        <button id="click">Trigger click</button>
        <button id="click-once">Trigger click once</button>
      </div>
      <div className="flex gap-1">
        <a
          href="#tab1"
          onClick={() => {
            setTab("tab1");
          }}
        >
          Tab 1
        </a>
        <a
          href="#tab2"
          onClick={() => {
            setTab("tab2");
          }}
        >
          Tab 2
        </a>
        <a
          href="#tab3"
          onClick={() => {
            setTab("tab3");
          }}
        >
          Tab 3
        </a>
      </div>
      {tab == null ? null : <p>{tab}</p>}
    </div>
  );
};
