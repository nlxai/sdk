import { type FC, useRef, useEffect, useState } from "react";
import { type Triggers, type Trigger } from "@nlxai/journey-manager";

// Add extra names for triggers for logging purposes
const triggersWithNames: Record<string, { name: string; trigger: Trigger }> = {
  "5c539d6c-ea44-455d-a138-0cb8094c09b2": {
    name: "general page load",
    trigger: {
      event: "pageLoad",
    },
  },
  "ad1db34c-3ac4-4340-9626-7045f8932df4": {
    name: "page load on tab 1",
    trigger: {
      event: "pageLoad",
      urlCondition: {
        operator: "contains",
        value: "#tab1",
      },
    },
  },
  "63e5b924-7e12-47fc-a24c-655119fd32d9": {
    name: "page load on tab 2 (trigger once)",
    trigger: {
      event: "pageLoad",
      once: true,
      urlCondition: {
        operator: "contains",
        value: "#tab2",
      },
    },
  },
  "9d668597-207d-4d1d-9136-1f6c7c89b49f": {
    name: "error message appears",
    trigger: {
      event: "appear",
      query: {
        parent: null,
        options: null,
        name: "QuerySelector",
        target: "#error",
      },
    },
  },
  "1cf7eeb6-1906-47a2-ac79-4bf1a1e8849e": {
    name: "click on a regular button",
    trigger: {
      event: "click",
      query: {
        parent: null,
        name: "QuerySelector",
        options: null,
        target: "#click",
      },
    },
  },
  "2e952b0c-0b03-4a99-b5d1-1e3fdd77839b": {
    name: "click on button (trigger once)",
    trigger: {
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
  "5bfa7a7e-8869-4fb8-a105-c0a1aa6d9d45": {
    name: "scroll to heading",
    trigger: {
      event: "enterViewport",
      query: {
        parent: null,
        options: null,
        name: "QuerySelector",
        target: "#scroll-to",
      },
    },
  },
  "6ab5dfab-16d3-4554-b93c-d4927ffc4f53": {
    name: "scroll to heading once",
    trigger: {
      event: "enterViewport",
      once: true,
      query: {
        parent: null,
        options: null,
        name: "QuerySelector",
        target: "#scroll-to-once",
      },
    },
  },
  "c773436a-b523-4871-b01d-06ce1f8e4c50": {
    name: "Test custom click behaviors",
    trigger: {
      event: "click",
      once: false,
      query: {
        parent: null,
        options: { name: { regexp: "Test", flags: "i" } },
        name: "Role",
        target: "button",
      },
    },
  },
};

const triggersForRun = (): Triggers => {
  const triggers: Triggers = {};
  Object.entries(triggersWithNames).forEach(([stepId, { trigger }]) => {
    triggers[stepId] = trigger;
  });
  return triggers;
};

const runJourneyManager = async (): Promise<unknown> => {
  const { run } = await import("@nlxai/journey-manager");
  await run({
    config: {
      apiKey: "",
      journeyId: "",
      workspaceId: "",
      conversationId: String(new Date().getTime()),
      languageCode: "en-US",
    },
    ui: {
      title: "Call Control Center",
      subtitle: "Manage your call experience with us",
      highlights: true,
      theme: {
        fontFamily: "'Neue Haas Grotesk'",
        colors: { highlight: "#7dd3fc" },
      },
      escalationButtonLabel: "Hand Off To Specialist",
      escalationConfirmation:
        "You are about to hand off to a specialist. Are you sure?",
      onEscalation: (args) => {
        // eslint-disable-next-line no-console
        console.log("escalation", args);
      },
      nudgeContent: "click me! click me!",
      buttons: [
        {
          label: "Google Chat",
          onClick: () => {
            // eslint-disable-next-line no-console
            console.log("Google Chat button click");
          },
        },
      ],
    },
    triggers: triggersForRun(),
    onStep: (stepId) => {
      if (triggersWithNames[stepId] != null) {
        // eslint-disable-next-line no-console
        console.log("SENDING", triggersWithNames[stepId].name);
      }
    },
  });
  return null;
};

const HashLink: FC<{
  hash: string;
  label: string;
  onClick: () => void;
  active?: boolean;
}> = ({ active, onClick, label, hash }) => {
  return (
    <a
      href={`#${hash}`}
      onClick={onClick}
      className={`py-0.5 ${active ?? false ? "font-bold" : ""}`}
    >
      {label}
    </a>
  );
};

const LoremIpsumParagraph: FC<unknown> = () => {
  return (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  );
};

const Checkbox: FC<{
  value: boolean;
  onChange: (value: boolean) => void;
  label: string;
}> = ({ value, onChange, label }) => (
  <label className="inline-flex grow gap-2">
    <input
      type="checkbox"
      className="shrink grow-0 basis-3"
      checked={value}
      onChange={() => {
        onChange(!value);
      }}
    />
    {label}
  </label>
);

const ButtonHandlerForm: FC<unknown> = () => {
  const [shouldPreventDefault, setShouldPreventDefault] =
    useState<boolean>(false);
  const [shouldStopPropagation, setShouldStopPropagation] =
    useState<boolean>(true);

  const [hasBoxShadow, setHasBoxShadow] = useState<boolean>(true);
  const [hasAnimation, setHasAnimation] = useState<boolean>(false);
  const [hasZIndexUnderlay, setHasZIndexUnderlay] = useState<boolean>(false);
  const [hasOverlay, setHasOverlay] = useState<boolean>(false);
  const [hasBorder, setHasBorder] = useState<boolean>(true);

  const handleButtonPress = (e: React.MouseEvent<HTMLButtonElement>): void => {
    if (shouldPreventDefault) {
      e.preventDefault();
    }
    if (shouldStopPropagation) {
      e.stopPropagation();
    }
  };

  return (
    <div className="flex gap-2 items-start grow justify-around">
      <div
        className={
          hasZIndexUnderlay
            ? "z-20 bg-white p-4 rounded relative"
            : "bg-white p-4 rounded relative"
        }
      >
        <button
          className={`bg-blueMain px-4 py-1 text-white rounded hover:bg-blueDarker ${hasBoxShadow ? "shadow-md" : ""} ${hasAnimation ? "animate-pulse" : ""} ${hasBorder ? "border-4 border-red-300" : ""}`}
          onClick={handleButtonPress}
        >
          Test
        </button>
        <div
          className={
            hasOverlay
              ? "bg-gray-300 w-24 h-20 absolute top-2 -left-8"
              : "hidden"
          }
        >
          Ping shouldn't be visible over this
        </div>
      </div>
      <div className="flex flex-col">
        <Checkbox
          value={shouldPreventDefault}
          onChange={setShouldPreventDefault}
          label="Prevent default"
        />
        <Checkbox
          value={shouldStopPropagation}
          onChange={setShouldStopPropagation}
          label="Stop propagation"
        />
        <Checkbox
          value={hasBoxShadow}
          onChange={setHasBoxShadow}
          label="Box shadow"
        />
        <Checkbox
          value={hasAnimation}
          onChange={setHasAnimation}
          label="Animation"
        />
        <Checkbox
          value={hasZIndexUnderlay}
          onChange={setHasZIndexUnderlay}
          label="Z-index underlay"
        />
        <Checkbox
          value={hasOverlay}
          onChange={setHasOverlay}
          label="Absolute overlay"
        />
        <Checkbox value={hasBorder} onChange={setHasBorder} label="Border" />
      </div>
    </div>
  );
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
    <div className="space-y-4">
      <h1 className="text-xl">Test page</h1>
      {showError ? (
        <div className="p-2 rounded text-red-600 bg-red-50" id="error">
          Something went wrong
        </div>
      ) : null}
      <div className="space-x-4">
        <button
          id="click"
          className="bg-blueMain px-4 py-1 text-white rounded hover:bg-blueDarker"
        >
          Trigger click
        </button>
        <button
          id="click-once"
          className="bg-blueMain px-4 py-1 text-white rounded hover:bg-blueDarker"
        >
          Trigger click once
        </button>
      </div>
      <div className="flex gap-4 border-b border-gray-200">
        <HashLink
          hash="tab1"
          active={tab === "tab1"}
          onClick={() => {
            setTab("tab1");
          }}
          label="Tab 1"
        />
        <HashLink
          hash="tab2"
          active={tab === "tab2"}
          onClick={() => {
            setTab("tab2");
          }}
          label="Tab 2"
        />
        <HashLink
          hash="tab3"
          active={tab === "tab3"}
          onClick={() => {
            setTab("tab3");
          }}
          label="Custom buttons"
        />
      </div>
      {tab === "tab1" ? <div>tab 1</div> : null}
      {tab === "tab2" ? (
        <div className="space-y-4">
          <LoremIpsumParagraph />
          <LoremIpsumParagraph />
          <LoremIpsumParagraph />
          <LoremIpsumParagraph />
          <LoremIpsumParagraph />
          <LoremIpsumParagraph />
          <LoremIpsumParagraph />
          <h2 id="scroll-to" className="text-blueMain">
            Triggers when scrolled to
          </h2>
          <LoremIpsumParagraph />
          <LoremIpsumParagraph />
          <LoremIpsumParagraph />
          <LoremIpsumParagraph />
          <LoremIpsumParagraph />
          <h2 id="scroll-to-once" className="text-blueMain">
            Triggers when scrolled to (once)
          </h2>
          <LoremIpsumParagraph />
          <LoremIpsumParagraph />
          <LoremIpsumParagraph />
          <LoremIpsumParagraph />
          <LoremIpsumParagraph />
        </div>
      ) : null}
      {tab === "tab3" ? <ButtonHandlerForm /> : null}
    </div>
  );
};
