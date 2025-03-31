/* eslint-disable jsdoc/require-jsdoc */
import { type FC } from "react";
import { clsx } from "clsx";

import { IconButton, type IconButtonType } from "./ui/IconButton";
import { type WindowSize, type ColorMode } from "../types";
import { useTailwindMediaQuery } from "../hooks";
import { Close, Settings, Undo } from "./ui/Icons";

interface HeaderProps {
  windowSize: WindowSize | "embedded";
  colorMode: ColorMode;
  brandIcon?: string;
  renderCollapse: boolean;
  collapse: (event: Event) => void;
  reset: () => void;
  toggleSettings?: () => void;
  isSettingsOpen: boolean;
  enabled: boolean;
}

export const Header: FC<HeaderProps> = ({
  windowSize,
  renderCollapse,
  collapse,
  toggleSettings,
  isSettingsOpen,
  brandIcon,
  reset,
  enabled,
}) => {
  const isHalf = windowSize === "half";
  const isMd = useTailwindMediaQuery("md");
  const iconButtonType: IconButtonType = isHalf && isMd ? "overlay" : "ghost";
  return (
    <div
      className={clsx(
        "flex",
        "p-2 md:p-3 items-center justify-between gap-2",

        {
          "md:absolute md:w-fit md:flex-col md:left-0 md:-translate-x-full":
            windowSize === "half",
          "md:absolute md:left-0 md:right-0 md:top-0": windowSize === "full",
        },
      )}
    >
      {brandIcon != null ? (
        <img className="w-10 h-10 block" src={brandIcon} role="presentation" />
      ) : null}

      <IconButton
        label="Reset"
        type={iconButtonType}
        className={brandIcon == null ? "" : "ml-auto"}
        onClick={
          enabled
            ? () => {
                reset();
              }
            : undefined
        }
        Icon={Undo}
      />
      {toggleSettings != null ? (
        <IconButton
          className={brandIcon != null ? "" : "ml-auto"}
          Icon={Settings}
          label="Settings"
          type={isSettingsOpen ? "activated" : iconButtonType}
          onClick={enabled ? toggleSettings : undefined}
        />
      ) : null}
      {renderCollapse ? (
        <IconButton
          label="Collapse"
          type={iconButtonType}
          className={clsx(
            toggleSettings == null ? "ml-auto" : "",
            isHalf ? "md:-order-1" : "",
          )}
          onClick={
            enabled
              ? () => {
                  collapse(new Event("collapse"));
                }
              : undefined
          }
          Icon={Close}
        />
      ) : null}
    </div>
  );
};
