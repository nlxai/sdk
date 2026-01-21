/* eslint-disable jsdoc/require-jsdoc */
import { type SetStateAction, type Dispatch, type FC } from "react";
import { clsx } from "clsx";

import { useCopy } from "../utils/useCopy";
import { IconButton, type IconButtonType } from "./ui/IconButton";
import { type WindowSize, type ColorMode } from "../interface";
import { useTailwindMediaQuery } from "../utils/useTailwindMediaQuery";
import { Close, Settings, Undo, Volume, VolumeOff } from "./ui/Icons";

interface HeaderProps {
  windowSize: WindowSize | "embedded";
  colorMode: ColorMode;
  errorThemedCloseButton?: boolean;
  speakerControls?: {
    enabled: boolean;
    setEnabled: Dispatch<SetStateAction<boolean>>;
  };
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
  errorThemedCloseButton,
  speakerControls,
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
  const copy = useCopy();
  return (
    <div
      className={clsx("flex p-2 md:p-3 items-center justify-between gap-2", {
        "md:absolute md:w-fit md:flex-col md:left-0 md:transform md:-translate-x-full md:translate-y-0":
          windowSize === "half",
        "@3xl/main:absolute @3xl/main:left-0 @3xl/main:right-0 @3xl/main:top-0":
          windowSize === "full" || windowSize === "embedded",
      })}
    >
      {brandIcon != null ? (
        <img
          className="w-10 h-10 block flex-none"
          src={brandIcon}
          role="presentation"
        />
      ) : null}

      <IconButton
        label={copy.restartConversationButtonLabel}
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
      {speakerControls != null ? (
        <IconButton
          Icon={speakerControls.enabled ? Volume : VolumeOff}
          label="Speakers"
          type={speakerControls.enabled ? "activated" : iconButtonType}
          onClick={() => {
            speakerControls.setEnabled((prev) => !prev);
          }}
        />
      ) : null}
      {renderCollapse ? (
        <IconButton
          label="Collapse"
          type={errorThemedCloseButton ?? false ? "error" : iconButtonType}
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
