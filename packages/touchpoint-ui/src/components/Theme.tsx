/* eslint-disable jsdoc/require-jsdoc */
import { type FC, type ReactNode, type CSSProperties } from "react";
import { clsx } from "clsx";

import {
  type ColorMode,
  type Theme,
  type ThemeSetting,
  type ThemeSettingByColorMode,
} from "../types";

const toCustomProperties = (theme: Theme): CSSProperties => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return {
    "--font-family": theme.fontFamily,

    "--primary-80": theme.primary80,
    "--primary-60": theme.primary60,
    "--primary-40": theme.primary40,
    "--primary-20": theme.primary20,
    "--primary-10": theme.primary10,
    "--primary-5": theme.primary5,
    "--primary-1": theme.primary1,

    "--secondary-80": theme.secondary80,
    "--secondary-60": theme.secondary60,
    "--secondary-40": theme.secondary40,
    "--secondary-20": theme.secondary20,
    "--secondary-10": theme.secondary10,
    "--secondary-5": theme.secondary5,
    "--secondary-1": theme.secondary1,

    "--accent": theme.accent,
    "--accent-20": theme.accent20,
    "--background": theme.background,
    "--overlay": theme.overlay,

    "--warning-primary": theme.warningPrimary,
    "--warning-secondary": theme.warningSecondary,
    "--error-primary": theme.errorPrimary,
    "--error-secondary": theme.errorSecondary,
  } as CSSProperties;
};

const lightModeCustomProperties: Theme = {
  fontFamily: '"Neue Haas Grotesk", sans-serif',

  primary80: "rgba(0, 2, 9, 0.8)",
  primary60: "rgba(0, 2, 9, 0.6)",
  primary40: "rgba(0, 2, 9, 0.4)",
  primary20: "rgba(0, 2, 9, 0.2)",
  primary10: "rgba(0, 2, 9, 0.1)",
  primary5: "rgba(0, 2, 9, 0.05)",
  primary1: "rgba(0, 2, 9, 0.01)",

  secondary80: "rgba(255, 255, 255, 0.85)",
  secondary60: "rgba(255, 255, 255, 0.65)",
  secondary40: "rgba(255, 255, 255, 0.45)",
  secondary20: "rgba(255, 255, 255, 0.25)",
  secondary10: "rgba(255, 255, 255, 0.15)",
  secondary5: "rgba(255, 255, 255, 0.08)",
  secondary1: "rgba(255, 255, 255, 0.01)",

  accent: "rgb(28, 99, 218)",
  accent20: "rgba(28, 99, 218, 0.2)",
  background: "rgba(220, 220, 220, 0.9)",
  overlay: "rgba(0, 2, 9, 0.4)",

  warningPrimary: "rgb(220, 159, 3)",
  warningSecondary: "rgb(255, 242, 209)",
  errorPrimary: "rgb(157, 3, 3)",
  errorSecondary: "rgb(255, 223, 230)",
};

const darkModeCustomProperties: Theme = {
  fontFamily: '"Neue Haas Grotesk", sans-serif',

  primary80: "rgba(255, 255, 255, 0.85)",
  primary60: "rgba(255, 255, 255, 0.65)",
  primary40: "rgba(255, 255, 255, 0.45)",
  primary20: "rgba(255, 255, 255, 0.25)",
  primary10: "rgba(255, 255, 255, 0.15)",
  primary5: "rgba(255, 255, 255, 0.08)",
  primary1: "rgba(255, 255, 255, 0.01)",

  secondary80: "rgba(0, 2, 9, 0.8)",
  secondary60: "rgba(0, 2, 9, 0.6)",
  secondary40: "rgba(0, 2, 9, 0.4)",
  secondary20: "rgba(0, 2, 9, 0.2)",
  secondary10: "rgba(0, 2, 9, 0.1)",
  secondary5: "rgba(0, 2, 9, 0.05)",
  secondary1: "rgba(0, 2, 9, 0.01)",

  accent: "rgb(174, 202, 255)",
  accent20: "rgba(174, 202, 255, 0.25)",
  background: "rgba(0, 2, 9, 0.9)",
  overlay: "rgba(0, 2, 9, 0.4)",

  warningPrimary: "rgb(255, 214, 108)",
  warningSecondary: "rgb(95, 65, 29)",
  errorPrimary: "rgb(255, 133, 162)",
  errorSecondary: "rgb(94, 4, 4)",
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
  const themeWithOverrides: Theme = {
    ...(colorMode === "dark"
      ? darkModeCustomProperties
      : lightModeCustomProperties),
    ...override,
  };
  return (
    <div
      className={clsx(className)}
      style={toCustomProperties(themeWithOverrides)}
    >
      {children}
    </div>
  );
};
