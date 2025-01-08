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
  collapse: () => void;
  reset: () => void;
  openSettings?: () => void;
}

export const ChatHeader: FC<ChatHeaderProps> = ({
  windowSize,
  colorMode,
  collapse,
  logoUrl,
  openSettings,
  reset,
}) => {
  const isHalf = windowSize === "half";
  const isMd = useTailwindMediaQuery("md");
  const iconButtonType: IconButtonType = isHalf && isMd ? "overlay" : "ghost";
  return (
    <div
      className={clsx(
        "flex",
        "p-2 items-center justify-between gap-2",
        isHalf
          ? "md:absolute md:w-fit md:flex-col md:left-0 md:-translate-x-full"
          : "md:absolute md:left-0 md:right-0 md:top-0",
      )}
    >
      {logoUrl != null ? (
        <img
          className="w-10 h-10 block"
          src={typeof logoUrl === "string" ? logoUrl : logoUrl[colorMode]}
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
      {openSettings != null ? (
        <IconButton
          className={logoUrl != null ? "" : "ml-auto"}
          Icon={Settings}
          label="Settings"
          type={iconButtonType}
          onClick={() => {
            openSettings();
          }}
        />
      ) : null}
      <IconButton
        label="Collapse"
        type={iconButtonType}
        className={clsx(
          openSettings == null ? "ml-auto" : "",
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

export default ChatHeader;
