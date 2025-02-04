/* eslint-disable jsdoc/require-jsdoc */
import { type FC } from "react";
import { clsx } from "clsx";

import { IconButton, type IconButtonType } from "./ui/IconButton";
import { type WindowSize, type LogoUrl, type ColorMode } from "../types";
import { useTailwindMediaQuery } from "../hooks";
import { Close, Settings, Undo } from "./ui/Icons";

interface ChatHeaderProps {
  windowSize: WindowSize;
  colorMode: ColorMode;
  logoUrl?: LogoUrl;
  brandIcon?: string;
  collapse: () => void;
  reset: () => void;
  toggleSettings?: () => void;
  isSettingsOpen: boolean;
}

export const ChatHeader: FC<ChatHeaderProps> = ({
  windowSize,
  colorMode,
  collapse,
  logoUrl,
  toggleSettings,
  isSettingsOpen,
  brandIcon,
  reset,
}) => {
  const isHalf = windowSize === "half";
  const isMd = useTailwindMediaQuery("md");
  const iconButtonType: IconButtonType = isHalf && isMd ? "overlay" : "ghost";
  const brandIconWithDeprecated =
    brandIcon ??
    (logoUrl != null
      ? typeof logoUrl === "string"
        ? logoUrl
        : logoUrl[colorMode]
      : undefined);
  return (
    <div
      className={clsx(
        "flex",
        "p-2 md:p-3 items-center justify-between gap-2",
        isHalf
          ? "md:absolute md:w-fit md:flex-col md:left-0 md:-translate-x-full"
          : "md:absolute md:left-0 md:right-0 md:top-0",
      )}
    >
      {brandIconWithDeprecated != null ? (
        <IconButton
          label=""
          type={iconButtonType}
          Icon={() => (
            <img
              className="absolute inset-0 block"
              src={brandIconWithDeprecated}
            />
          )}
          onClick={() => {}}
        />
      ) : null}
      <IconButton
        label="Reset"
        type={iconButtonType}
        className={logoUrl == null ? "" : "ml-auto"}
        onClick={() => {
          reset();
        }}
        Icon={Undo}
      />
      {toggleSettings != null ? (
        <IconButton
          className={logoUrl != null ? "" : "ml-auto"}
          Icon={Settings}
          label="Settings"
          type={isSettingsOpen ? "activated" : iconButtonType}
          onClick={toggleSettings}
        />
      ) : null}
      <IconButton
        label="Collapse"
        type={iconButtonType}
        className={clsx(
          toggleSettings == null ? "ml-auto" : "",
          isHalf ? "md:-order-1" : "",
        )}
        onClick={() => {
          collapse();
        }}
        Icon={Close}
      />
    </div>
  );
};
