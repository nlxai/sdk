/* eslint-disable jsdoc/require-jsdoc */
import { type FC, type ReactNode, type CSSProperties } from "react";
import { clsx } from "clsx";

import {
  type ColorMode,
  type Theme,
  type ThemeSetting,
  type ThemeSettingByColorMode,
} from "../types";

const lightModeCustomProperties: Theme = {
  "--font-family": '"Neue Haas Grotesk", sans-serif',

  "--primary-80": "rgba(0, 2, 9, 0.8)",
  "--primary-60": "rgba(0, 2, 9, 0.6)",
  "--primary-40": "rgba(0, 2, 9, 0.4)",
  "--primary-20": "rgba(0, 2, 9, 0.2)",
  "--primary-10": "rgba(0, 2, 9, 0.1)",
  "--primary-5": "rgba(0, 2, 9, 0.05)",
  "--primary-1": "rgba(0, 2, 9, 0.01)",

  "--secondary-80": "rgba(255, 255, 255, 0.85)",
  "--secondary-60": "rgba(255, 255, 255, 0.65)",
  "--secondary-40": "rgba(255, 255, 255, 0.45)",
  "--secondary-20": "rgba(255, 255, 255, 0.25)",
  "--secondary-10": "rgba(255, 255, 255, 0.15)",
  "--secondary-5": "rgba(255, 255, 255, 0.08)",
  "--secondary-1": "rgba(255, 255, 255, 0.01)",

  "--accent": "rgb(28, 99, 218)",
  "--accent-20": "rgba(28, 99, 218, 0.2)",
  "--background": "rgba(220, 220, 220, 0.9)",
  "--overlay": "rgba(0, 2, 9, 0.4)",

  "--warning-primary": "rgb(220, 159, 3)",
  "--warning-secondary": "rgb(255, 242, 209)",
  "--error-primary": "rgb(157, 3, 3)",
  "--error-secondary": "rgb(255, 223, 230)",
};

const darkModeCustomProperties: Theme = {
  "--font-family": '"Neue Haas Grotesk", sans-serif',

  "--primary-80": "rgba(255, 255, 255, 0.85)",
  "--primary-60": "rgba(255, 255, 255, 0.65)",
  "--primary-40": "rgba(255, 255, 255, 0.45)",
  "--primary-20": "rgba(255, 255, 255, 0.25)",
  "--primary-10": "rgba(255, 255, 255, 0.15)",
  "--primary-5": "rgba(255, 255, 255, 0.08)",
  "--primary-1": "rgba(255, 255, 255, 0.01)",

  "--secondary-80": "rgba(0, 2, 9, 0.8)",
  "--secondary-60": "rgba(0, 2, 9, 0.6)",
  "--secondary-40": "rgba(0, 2, 9, 0.4)",
  "--secondary-20": "rgba(0, 2, 9, 0.2)",
  "--secondary-10": "rgba(0, 2, 9, 0.1)",
  "--secondary-5": "rgba(0, 2, 9, 0.05)",
  "--secondary-1": "rgba(0, 2, 9, 0.01)",

  "--accent": "rgb(174, 202, 255)",
  "--accent-20": "rgba(174, 202, 255, 0.25)",
  "--background": "rgba(0, 2, 9, 0.9)",
  "--overlay": "rgba(0, 2, 9, 0.4)",

  "--warning-primary": "rgb(255, 214, 108)",
  "--warning-secondary": "rgb(95, 65, 29)",
  "--error-primary": "rgb(255, 133, 162)",
  "--error-secondary": "rgb(94, 4, 4)",
};

const isThemeSettingByColorMode = (
  theme: ThemeSetting,
  colorMode: ColorMode,
): theme is ThemeSettingByColorMode => {
  return (theme as ThemeSettingByColorMode)[colorMode] != null;
};

const toOverride = (
  colorMode: ColorMode,
  theme?: ThemeSetting,
): Partial<Theme> => {
  if (theme == null) {
    return {};
  }
  if (isThemeSettingByColorMode(theme, colorMode)) {
    return theme[colorMode];
  }
  return theme;
};

export const CustomPropertiesContainer: FC<{
  colorMode: ColorMode;
  className?: string;
  theme?: ThemeSetting;
  children?: ReactNode;
}> = ({ colorMode, children, theme, className }) => {
  const override = toOverride(colorMode, theme);
  const style = {
    ...(colorMode === "dark"
      ? darkModeCustomProperties
      : lightModeCustomProperties),
    ...override,
  } as CSSProperties;
  return (
    <div className={clsx(className)} style={style}>
      {children}
    </div>
  );
};
