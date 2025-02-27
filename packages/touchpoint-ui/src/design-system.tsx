import { useEffect, useState, type FC, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { clsx } from "clsx";

import "./index.css";
import { type ColorMode } from "./types";
import { TextButton } from "./components/ui/TextButton";
import { IconButton } from "./components/ui/IconButton";
import { Loader } from "./components/ui/Loader";
import { CustomCard, CustomCardRow } from "./components/ui/CustomCard";
import {
  PicturesContainer,
  type PicturesProps,
} from "./components/ui/PicturesContainer";
import { ArrowRight, Close } from "./components/ui/Icons";
import { Icons, BaseText, SmallText } from "./index";
import { DateInput } from "./components/ui/DateInput";
import { CustomPropertiesContainer } from "./components/Theme";

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

const TextButtons: FC<unknown> = () => {
  return (
    <div className="space-y-4">
      <Container mode="dark">
        <TextButtonInstances />
      </Container>
      <Container mode="light">
        <TextButtonInstances />
      </Container>
    </div>
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

const IconButtons: FC<unknown> = () => {
  return (
    <div className="space-y-4">
      <Container mode="dark">
        <IconButtonInstances />
      </Container>
      <Container mode="light">
        <IconButtonInstances />
      </Container>
    </div>
  );
};

const IconInstances: FC<unknown> = () => {
  return (
    <Container mode="light">
      <div className="grid grid-cols-4 gap-4">
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

const Carousels: FC<unknown> = () => {
  return (
    <div className="space-y-4">
      <Container mode="dark">
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
      <Container mode="dark">
        <div className="max-w-content mx-auto">
          <PicturesContainer payload={examplePicturesPayload} />
        </div>
      </Container>
    </div>
  );
};

const DateInputs: FC<unknown> = () => {
  return (
    <div className="grid h-[360px] grid-cols-2 gap-2 relative">
      <Container mode="dark">
        <DateInput />
        <DateInput
          onSubmit={(date) => {
            // eslint-disable-next-line no-console
            console.log(date);
          }}
        />
      </Container>
      <Container mode="light">
        <DateInput />
        <DateInput
          onSubmit={(date) => {
            // eslint-disable-next-line no-console
            console.log(date);
          }}
        />
      </Container>
    </div>
  );
};

const Loaders: FC<unknown> = () => {
  return (
    <div className="grid h-[360px] grid-cols-2 gap-2 relative">
      <Container mode="dark">
        <Loader label="Thinking" />
      </Container>
      <Container mode="light">
        <Loader label="Thinking" />
      </Container>
    </div>
  );
};

const Container: FC<{ children: ReactNode; mode: ColorMode }> = ({
  children,
  mode,
}) => {
  return (
    <CustomPropertiesContainer
      className="bg-background p-4 rounded-outer space-y-4"
      theme={{
        fontFamily: "monospace",
        accent: "light-dark(purple, pink)",
      }}
      colorMode={mode}
    >
      {children}
    </CustomPropertiesContainer>
  );
};

type Tab =
  | "text-buttons"
  | "icon-buttons"
  | "date-input"
  | "icons"
  | "carousels"
  | "loader";

const tabs: Array<{ tab: Tab; title: string; component: FC<unknown> }> = [
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

  useEffect(() => {
    const handler = (): void => {
      setActiveTab(tabFromUrl());
    };
    window.addEventListener("popstate", handler);
    return () => {
      window.removeEventListener("popstate", handler);
    };
  }, [setActiveTab]);

  const ActiveTabComponent = tabs.find(
    ({ tab }) => tab === activeTab,
  )?.component;

  return (
    <div className="grid grid-cols-[320px,1fr]">
      <CustomPropertiesContainer colorMode="light" className="space-y-2">
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
      </CustomPropertiesContainer>
      {ActiveTabComponent == null ? null : <ActiveTabComponent />}
    </div>
  );
};

const examplePicturesPayload: PicturesProps[] = [
  {
    imgSrc:
      "https://s3-alpha-sig.figma.com/img/b00d/c6c1/1ff64663da245bd22ec1a8191c21a050?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aVmzwN59arzrH1aRqF~jSicGqH0zEPPCH762JbOTBP66ubQT7EqreplRoAlrBzBq006rRu0AuI5SCaWV6kzI0Zos9FWLTdbgLr9pzuDruqL08qhS6rEUaTR6uLCjLbfZ5AwWKXo4juMEcetR-75y0oL6jx4bcS-icOHy1c17OJ8ikYtbMy-4g69c2mJkOpB~O8~Nmt6Hmv0AeBMc~pcE6eMADnZWQUFnHnzao063Y5vyKlzOPCPsAJZ~lpqq7pUrSwekvhz~wBGmK8Sg04JDeR74bKn4iISZRh4ExKPBkFZnRjFoExjudMQFo~vx0hItHxN9lfAcvDp28yhrlYsg2Q__",
  },
  {
    imgSrc:
      "https://s3-alpha-sig.figma.com/img/01bf/644f/fb38de40bc1d110bd8c1707588701f1b?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dOdOnzvAn350cJrKSnHyvMT7ln6LOjz4ehVZdT4En9czjfGkOwLaLFhw-IcirMB9ztsZrbpI-ovsCTkARJxEm1silscbizWhmB4trABHWlgRTvQDAzojyRgGjYM31UvUI0zW9I6E6qJurDJYtpH74pAWPonRoYGwRgLF7aimR9lpVL5-8SalwiO3OjRPIq5rw4hzzDjpMxL4YCjswO-CrOvGO61axTNxvKhElCU4XvaEDk2VrreLEMXzIjQIoE4rzqLE5fcdBuaqnBx9qyeQQ31DlDiOIrnVIAf~gJDDhtdgiyb2fcUeEKSyfrcjPGash7aH5Y9o~QbdMajctYKVxg__",
  },
  {
    imgSrc:
      "https://s3-alpha-sig.figma.com/img/01bf/644f/fb38de40bc1d110bd8c1707588701f1b?Expires=1736121600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dOdOnzvAn350cJrKSnHyvMT7ln6LOjz4ehVZdT4En9czjfGkOwLaLFhw-IcirMB9ztsZrbpI-ovsCTkARJxEm1silscbizWhmB4trABHWlgRTvQDAzojyRgGjYM31UvUI0zW9I6E6qJurDJYtpH74pAWPonRoYGwRgLF7aimR9lpVL5-8SalwiO3OjRPIq5rw4hzzDjpMxL4YCjswO-CrOvGO61axTNxvKhElCU4XvaEDk2VrreLEMXzIjQIoE4rzqLE5fcdBuaqnBx9qyeQQ31DlDiOIrnVIAf~gJDDhtdgiyb2fcUeEKSyfrcjPGash7aH5Y9o~QbdMajctYKVxg__",
  },
];

const main = document.querySelector("main");
if (main != null) {
  createRoot(main).render(<DesignSystem />);
}
