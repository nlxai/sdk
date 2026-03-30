/* eslint-disable jsdoc/require-jsdoc */
import {
  useCallback,
  useEffect,
  useState,
  type FC,
  type ReactNode,
} from "react";
import { createRoot } from "react-dom/client";
import { clsx } from "clsx";
import { useKeyboardEvent } from "@react-hookz/web";

import "./index.css";
import { type ColorMode, type WindowSize } from "./interface";
import { TextButton } from "./components/ui/TextButton";
import { IconButton } from "./components/ui/IconButton";
import { Loader } from "./components/ui/Loader";
import { LightDarkToggle } from "./components/ui/LightDarkToggle";
import { CustomCard, CustomCardRow } from "./components/ui/CustomCard";
import { ArrowRight, Close, Touchpoint } from "./components/ui/Icons";
import { Icons, BaseText, SmallText } from "./index";
import { DateInput } from "./components/ui/DateInput";
import { ProviderStack } from "./ProviderStack";
import { Radio } from "./components/ui/Radio";
import { MockText } from "./mocks/MockText";
import { MockVoice } from "./mocks/MockVoice";
import { MockVoiceMini } from "./mocks/MockVoiceMini";

type MockVersion = "mock1" | "mock2" | "mock3";

const TextButtonInstances: FC<unknown> = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <TextButton
          type="main"
          onClick={() => {}}
          label="Main default"
          Icon={ArrowRight}
        />
        <TextButton type="main" label="Main disabled" Icon={ArrowRight} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <TextButton
          type="ghost"
          Icon={ArrowRight}
          onClick={() => {}}
          label="Ghost default"
        />
        <TextButton type="ghost" Icon={ArrowRight} label="Ghost disabled" />
      </div>
    </>
  );
};

const TextButtons: FC<{ colorMode: ColorMode }> = ({ colorMode }) => {
  return (
    <Container mode={colorMode}>
      <TextButtonInstances />
    </Container>
  );
};

const IconButtonInstances: FC<unknown> = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <IconButton
            type="main"
            onClick={() => {}}
            label="Main default"
            Icon={Close}
          />
        </div>
        <div>
          <IconButton type="main" label="Main disabled" Icon={Close} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <IconButton
            type="ghost"
            onClick={() => {}}
            label="Ghost default"
            Icon={Close}
          />
        </div>
        <div>
          <IconButton type="ghost" label="Ghost disabled" Icon={Close} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <IconButton
            type="activated"
            Icon={Close}
            onClick={() => {}}
            label="Activated default"
          />
        </div>
        <div>
          <IconButton
            type="activated"
            label="Activated disabled"
            Icon={Close}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <IconButton
            type="coverup"
            onClick={() => {}}
            label="Coverup default"
            Icon={Close}
          />
        </div>
        <div>
          <IconButton type="coverup" label="Coverup disabled" Icon={Close} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <IconButton
            type="overlay"
            onClick={() => {}}
            label="Overlay default"
            Icon={Close}
          />
        </div>
        <div>
          <IconButton type="overlay" label="Overlay disabled" Icon={Close} />
        </div>
      </div>
    </>
  );
};

const IconButtons: FC<{ colorMode: ColorMode }> = ({ colorMode }) => {
  return (
    <Container mode={colorMode}>
      <IconButtonInstances />
    </Container>
  );
};

const IconInstances: FC<{ colorMode: ColorMode }> = ({ colorMode }) => {
  return (
    <Container mode={colorMode}>
      <div className="grid grid-cols-8 gap-2">
        {Object.entries(Icons).map(([name, Icon]) => {
          return (
            <div
              key={name}
              className="w-24 h-24 flex flex-col items-center gap-2"
            >
              <Icon size={24} className="text-primary-80" />
              <span className="text-xs text-primary-80">{name}</span>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

const Carousels: FC<{ colorMode: ColorMode }> = ({ colorMode }) => {
  return (
    <Container mode={colorMode}>
      <CustomCard>
        <CustomCardRow
          left={<BaseText faded>abcd</BaseText>}
          right={
            <>
              <BaseText>abcd</BaseText>
              <SmallText>efgh</SmallText>
            </>
          }
          icon={Icons.ArrowForward}
        />
        <CustomCardRow
          left={<BaseText>abcd</BaseText>}
          right={<BaseText>abcd</BaseText>}
        />
      </CustomCard>
    </Container>
  );
};

const DateInputs: FC<{ colorMode: ColorMode }> = ({ colorMode }) => {
  return (
    <Container mode={colorMode}>
      <DateInput />
      <DateInput
        onSubmit={(date) => {
          // eslint-disable-next-line no-console
          console.log(date);
        }}
      />
    </Container>
  );
};

const Loaders: FC<{ colorMode: ColorMode }> = ({ colorMode }) => {
  return (
    <Container mode={colorMode}>
      <Loader label="Thinking" />
    </Container>
  );
};

const Container: FC<{ children: ReactNode; mode: ColorMode }> = ({
  children,
  mode,
}) => {
  return (
    <ProviderStack
      className="bg-background p-4 rounded-outer space-y-4"
      theme={{}}
      colorMode={mode}
      languageCode="en-US"
    >
      {children}
    </ProviderStack>
  );
};

type Tab =
  | "text-buttons"
  | "icon-buttons"
  | "date-input"
  | "icons"
  | "carousels"
  | "loader";

type TabComponent = FC<{ colorMode: ColorMode }> | FC<unknown>;

const tabs: Array<{ tab: Tab; title: string; component: TabComponent }> = [
  {
    tab: "text-buttons",
    title: "Text buttons",
    component: TextButtons,
  },
  {
    tab: "icon-buttons",
    title: "Icon buttons",
    component: IconButtons,
  },
  {
    tab: "date-input",
    title: "Date input",
    component: DateInputs,
  },
  { tab: "icons", title: "Icons", component: IconInstances },
  { tab: "carousels", title: "Carousels", component: Carousels },
  { tab: "loader", title: "Loader", component: Loaders },
];

const tabFromUrl = (): Tab => {
  const fragment = window.location.hash;
  return tabs.find(({ tab }) => fragment === `#${tab}`)?.tab ?? "text-buttons";
};

const DesignSystem: FC<unknown> = () => {
  const [activeTab, setActiveTab] = useState<Tab>(tabFromUrl());
  const [colorMode, setColorMode] = useState<ColorMode>("light");
  const [activeMock, setActiveMock] = useState<MockVersion>("mock1");
  const [isMockExpanded, setIsMockExpanded] = useState<boolean>(false);
  const [windowSize, setWindowSize] = useState<WindowSize>("half");

  useEffect(() => {
    const handler = (): void => {
      setActiveTab(tabFromUrl());
    };
    window.addEventListener("popstate", handler);
    return () => {
      window.removeEventListener("popstate", handler);
    };
  }, [setActiveTab]);

  useKeyboardEvent(
    (event) => event.code === "Digit1",
    () => {
      setActiveMock("mock1");
    },
  );

  useKeyboardEvent(
    (event) => event.code === "Digit2",
    () => {
      setActiveMock("mock2");
    },
  );

  useKeyboardEvent(
    (event) => event.code === "Digit3",
    () => {
      setActiveMock("mock3");
    },
  );

  useKeyboardEvent(
    (event) => event.code === "Space",
    () => {
      setWindowSize((prev) => (prev === "half" ? "full" : "half"));
    },
  );

  useKeyboardEvent(
    (event) => event.code === "Enter",
    () => {
      setIsMockExpanded((prev) => !prev);
    },
  );

  useKeyboardEvent(
    (event) => event.code === "Escape",
    () => {
      setIsMockExpanded(false);
    },
  );

  const expandMock = useCallback(() => {
    setIsMockExpanded(true);
  }, [setIsMockExpanded]);

  const collapseMock = useCallback(() => {
    setIsMockExpanded(false);
  }, [setIsMockExpanded]);

  const toggleMock = useCallback(() => {
    setIsMockExpanded((prev) => !prev);
  }, [setIsMockExpanded]);

  const ActiveTabComponent = tabs.find(
    ({ tab }) => tab === activeTab,
  )?.component;

  return (
    <div className="grid grid-cols-[320px_1fr] h-screen">
      <ProviderStack
        colorMode="light"
        className="space-y-2 border-r border-primary-10"
        languageCode="en-US"
      >
        <div className="p-4 space-y-4 flex flex-col h-full">
          <div className="flex items-center gap-2">
            <Touchpoint size={24} className="text-primary-80" />
            <h1 className="text-lg font-semibold text-primary-80">
              Touchpoint Design System
            </h1>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-primary-60 mb-2">
                Components
              </p>
              <div className="space-y-2 overflow-y-auto">
                {tabs.map(({ tab, title }) => {
                  const isActive = tab === activeTab;
                  return (
                    <a
                      className={clsx(
                        "block hover:text-primary-80",
                        isActive ? "text-primary-80" : "text-primary-40",
                      )}
                      aria-current={isActive ? "page" : undefined}
                      key={tab}
                      href={`#${tab}`}
                      onClick={(ev) => {
                        if (!ev.metaKey) {
                          ev.preventDefault();
                          setActiveTab(tab);
                          window.location.hash = `#${tab}`;
                        }
                      }}
                    >
                      {title}
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="border-t border-primary-10 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-primary-60 mb-2">
                    Chat frame
                  </p>
                  <Radio
                    name="mock-version"
                    options={[
                      { value: "mock1", label: "Text" },
                      { value: "mock2", label: "Voice" },
                      { value: "mock3", label: "Voice mini" },
                    ]}
                    value={activeMock}
                    onChange={(value) => {
                      setActiveMock(value as MockVersion);
                    }}
                  />
                  <p className="text-xs text-primary-40 mt-2">
                    or press 1, 2, 3
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary-60 mb-2">
                    Window size
                  </p>
                  <Radio
                    name="window-size"
                    options={[
                      { value: "half", label: "Half" },
                      { value: "full", label: "Full" },
                    ]}
                    value={windowSize}
                    onChange={(value) => {
                      setWindowSize(value as WindowSize);
                    }}
                  />
                  <p className="text-xs text-primary-40 mt-2">or press space</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ProviderStack>
      <div className="flex flex-col overflow-auto">
        <ProviderStack colorMode="light" languageCode="en-US">
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-primary-80">
              {tabs.find(({ tab }) => tab === activeTab)?.title}
            </h2>
            <LightDarkToggle value={colorMode} onChange={setColorMode} />
          </div>
        </ProviderStack>
        <div className="px-4">
          {ActiveTabComponent == null ? null : (
            <ActiveTabComponent colorMode={colorMode} />
          )}
        </div>
      </div>
      {activeMock === "mock1" && (
        <MockText
          embedded={false}
          colorMode={colorMode}
          isExpanded={isMockExpanded}
          onExpand={expandMock}
          onClose={collapseMock}
          windowSize={windowSize}
        />
      )}
      {activeMock === "mock2" && (
        <MockVoice
          embedded={false}
          colorMode={colorMode}
          isExpanded={isMockExpanded}
          onExpand={expandMock}
          onClose={collapseMock}
          windowSize={windowSize}
        />
      )}
      {activeMock === "mock3" && (
        <MockVoiceMini
          embedded={false}
          colorMode={colorMode}
          isExpanded={isMockExpanded}
          onExpand={expandMock}
          onClose={collapseMock}
        />
      )}
    </div>
  );
};

export const renderDesignSystem = (element: HTMLElement): void => {
  createRoot(element).render(<DesignSystem />);
};
