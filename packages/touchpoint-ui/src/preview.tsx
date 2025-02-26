/* eslint-disable jsdoc/require-param */
/* eslint-disable jsdoc/require-returns */
import { type FC, type ReactNode } from "react";
import type { ColorMode, Theme } from "./types";
import { CustomPropertiesContainer } from "./components/Theme";
import { Context } from "./context";
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
      <Context.Provider value={{ handler: null }}>
        <CustomPropertiesContainer
          className="bg-background p-4 rounded-outer space-y-4"
          theme={theme}
          colorMode={mode}
        >
          {children}
        </CustomPropertiesContainer>
      </Context.Provider>
    </>
  );
};
