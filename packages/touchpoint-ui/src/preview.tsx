import { type FC, type ReactNode } from "react";
import type { ColorMode, Theme } from "./interface";
import { ProviderStack } from "./ProviderStack";
import cssRaw from "./index.css?inline";
/**
 * @internal
 */
export const Container: FC<{
  children: ReactNode;
  mode: ColorMode;
  theme: Partial<Theme>;
}> = ({ children, mode, theme }) => {
  return (
    <>
      <style>{cssRaw}</style>
      <ProviderStack
        className="bg-background p-4 rounded-outer space-y-4"
        theme={theme}
        colorMode={mode}
        languageCode="en-US"
      >
        {children}
      </ProviderStack>
    </>
  );
};
