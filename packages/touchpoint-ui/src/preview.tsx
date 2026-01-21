import { type FC, type ReactNode } from "react";
import type { ColorMode, Theme } from "./interface";
import { Wrapper } from "./Wrapper";
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
      <Wrapper
        className="bg-background p-4 rounded-outer space-y-4"
        theme={theme}
        colorMode={mode}
        languageCode="en-US"
      >
        {children}
      </Wrapper>
    </>
  );
};
