import { type FC, type ReactNode, useRef } from "react";
import { clsx } from "clsx";
import { Tooltip } from "@base-ui/react/tooltip";

import { CopyProvider, defaultCopy } from "./utils/useCopy";
import { type Copy } from "./interface";
import { type ColorMode, type Theme } from "./interface";
import { AppRootProvider } from "./utils/useAppRoot";
import { intelligentMerge, toCustomProperties } from "./components/Theme";

export const ProviderStack: FC<{
  colorMode: ColorMode;
  className?: string;
  theme?: Partial<Theme>;
  children?: ReactNode;
  languageCode: string;
  copy?: Partial<Copy>;
}> = ({ colorMode, children, theme, className, copy, languageCode }) => {
  const themeWithOverrides: Theme = intelligentMerge(theme ?? {});
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Tooltip.Provider>
      <CopyProvider value={{ ...defaultCopy(languageCode), ...(copy ?? {}) }}>
        <AppRootProvider value={ref}>
          <div
            className={clsx(className, "font-sans")}
            ref={ref}
            style={{
              ...toCustomProperties(themeWithOverrides),
              colorScheme: colorMode,
            }}
          >
            <div className={clsx(className, "font-sans")}>{children}</div>
          </div>
        </AppRootProvider>
      </CopyProvider>
    </Tooltip.Provider>
  );
};
