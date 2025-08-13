/* eslint-disable jsdoc/require-param */
/* eslint-disable jsdoc/require-returns */
import { type FC, type ReactNode } from "react";
import type { ColorMode, Theme } from "./interface";
import { CustomPropertiesContainer } from "./components/Theme";
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
      <CustomPropertiesContainer
        className="bg-background p-4 rounded-outer space-y-4"
        theme={theme}
        colorMode={mode}
      >
        {children}
      </CustomPropertiesContainer>
    </>
  );
};
