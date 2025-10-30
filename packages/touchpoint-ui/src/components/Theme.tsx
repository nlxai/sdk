/* eslint-disable jsdoc/require-jsdoc */
import { type FC, type ReactNode, type CSSProperties } from "react";
import { clsx } from "clsx";

import { type ColorMode, type Theme } from "../interface";

const toCustomProperties = (theme: Theme): CSSProperties => {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return {
    "--font-family": theme.fontFamily,
    "--radius-inner": theme.innerBorderRadius,
    "--radius-outer": theme.outerBorderRadius,

    "--color-primary-80": theme.primary80,
    "--color-primary-60": theme.primary60,
    "--color-primary-40": theme.primary40,
    "--color-primary-20": theme.primary20,
    "--color-primary-10": theme.primary10,
    "--color-primary-5": theme.primary5,
    "--color-primary-1": theme.primary1,

    "--color-secondary-80": theme.secondary80,
    "--color-secondary-60": theme.secondary60,
    "--color-secondary-40": theme.secondary40,
    "--color-secondary-20": theme.secondary20,
    "--color-secondary-10": theme.secondary10,
    "--color-secondary-5": theme.secondary5,
    "--color-secondary-1": theme.secondary1,

    "--color-accent": theme.accent,
    "--color-accent-20": theme.accent20,
    "--color-background": theme.background,
    "--color-overlay": theme.overlay,

    "--color-warning-primary": theme.warningPrimary,
    "--color-warning-secondary": theme.warningSecondary,
    "--color-error-primary": theme.errorPrimary,
    "--color-error-secondary": theme.errorSecondary,
  } as CSSProperties;
};

const lightModeCustomProperties: Theme = {
  fontFamily: '"Neue Haas Grotesk", sans-serif',
  innerBorderRadius: "12px",
  outerBorderRadius: "20px",

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
  innerBorderRadius: "12px",
  outerBorderRadius: "20px",

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

const intelligentMerge = (theme: Partial<Theme>, base: Theme): Theme => {
  const computed: Partial<Theme> = {};

  if (theme.accent != null && theme.accent20 == null) {
    computed.accent20 = `color-mix(in srgb, ${theme.accent} 20%, transparent)`;
  }

  if (theme.primary80 != null) {
    if (theme.primary60 == null)
      computed.primary60 = `rgb(from ${theme.primary80} r g b / 0.6)`;
    if (theme.primary40 == null)
      computed.primary40 = `rgb(from ${theme.primary80} r g b / 0.4)`;
    if (theme.primary20 == null)
      computed.primary20 = `rgb(from ${theme.primary80} r g b / 0.2)`;
    if (theme.primary10 == null)
      computed.primary10 = `rgb(from ${theme.primary80} r g b / 0.1)`;
    if (theme.primary5 == null)
      computed.primary5 = `rgb(from ${theme.primary80} r g b / 0.05)`;
    if (theme.primary1 == null)
      computed.primary1 = `rgb(from ${theme.primary80} r g b / 0.01)`;
  }

  if (theme.secondary80 != null) {
    if (theme.secondary60 == null)
      computed.secondary60 = `rgb(from ${theme.secondary80} r g b / 0.6)`;
    if (theme.secondary40 == null)
      computed.secondary40 = `rgb(from ${theme.secondary80} r g b / 0.4)`;
    if (theme.secondary20 == null)
      computed.secondary20 = `rgb(from ${theme.secondary80} r g b / 0.2)`;
    if (theme.secondary10 == null)
      computed.secondary10 = `rgb(from ${theme.secondary80} r g b / 0.1)`;
    if (theme.secondary5 == null)
      computed.secondary5 = `rgb(from ${theme.secondary80} r g b / 0.05)`;
    if (theme.secondary1 == null)
      computed.secondary1 = `rgb(from ${theme.secondary80} r g b / 0.01)`;
  }

  return {
    ...base,
    ...computed,
    ...theme,
  };
};

export const CustomPropertiesContainer: FC<{
  colorMode: ColorMode;
  className?: string;
  theme?: Partial<Theme>;
  children?: ReactNode;
}> = ({ colorMode, children, theme, className }) => {
  const themeWithOverrides: Theme = intelligentMerge(
    theme ?? {},
    colorMode === "dark" ? darkModeCustomProperties : lightModeCustomProperties,
  );
  return (
    <div
      className={clsx(className, "font-sans")}
      style={{
        ...toCustomProperties(themeWithOverrides),
        colorScheme: colorMode,
      }}
    >
      {children}
    </div>
  );
};
