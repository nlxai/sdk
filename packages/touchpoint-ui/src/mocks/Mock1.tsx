import { FC, useState } from "react";
import { ProviderStack } from "../ProviderStack";
import { LaunchButton } from "../components/ui/LaunchButton";
import { clsx } from "clsx";
import { Main, HeaderContainer } from "../components/Layout";
import { IconButton } from "../components/ui/IconButton";
import { Close } from "../components/ui/Icons";

export const Mock1: FC<{ embedded: boolean }> = (props) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const windowSize = "half";

  if (!isExpanded) {
    return (
      <ProviderStack
        className="fixed z-launch-button bottom-2 right-2 w-fit"
        theme={{
          fontFamily: "monospace",
          accent: "light-dark(purple, pink)",
        }}
        colorMode={"dark"}
        languageCode="en-US"
      >
        <LaunchButton
          className="backdrop-blur-sm"
          onClick={() => {
            setIsExpanded(true);
          }}
          label="Expand chat"
        />
      </ProviderStack>
    );
  }

  // TODO: add buttons
  // TODO: generate sample conversation

  return (
    <ProviderStack
      className={clsx(
        "grid grid-cols-2 xl:grid-cols-[1fr_632px]",
        props.embedded ? "w-full h-full" : "fixed inset-0 z-touchpoint",
      )}
      theme={{
        fontFamily: "monospace",
        accent: "light-dark(purple, pink)",
      }}
      colorMode={"dark"}
      languageCode="en-US"
    >
      {windowSize === "half" ? (
        <div className="hidden md:block bg-overlay" />
      ) : null}
      <Main windowSize={windowSize}>
        <HeaderContainer leftColumn={windowSize === "half"}>
          <IconButton
            Icon={Close}
            label="Close"
            onClick={() => {
              setIsExpanded(false);
            }}
            type="overlay"
          />
        </HeaderContainer>
        abcd
      </Main>
    </ProviderStack>
  );
};
