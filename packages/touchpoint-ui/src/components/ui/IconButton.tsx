/* eslint-disable jsdoc/require-jsdoc */
import { clsx } from "clsx";
import { type MouseEventHandler, type FC } from "react";

import { type IconProps } from "./Icons";
import { Tooltip } from "@base-ui/react/tooltip";
import { useAppRoot } from "../../utils/useAppRoot";
/**
 * Represents the different types of icon buttons available in the application.
 *
 * - `main`: The primary icon button.
 * - `ghost`: A transparent or less prominent icon button.
 * - `activated`: An icon button that indicates an active state.
 * - `coverup`: An icon button used to cover up or mask something.
 * - `overlay`: An icon button that appears over other content.
 * @category Modality components
 */
export type IconButtonType =
  | "main"
  | "ghost"
  | "activated"
  | "coverup"
  | "error"
  | "overlay";

/**
 * Props for the IconButton component
 * @inline
 * @hidden
 */
export interface IconButtonProps {
  /**
   * Handler function called when the button is clicked
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /**
   * Accessible label for the button
   */
  label: string;
  /**
   * Additional CSS classes to apply to the button
   */
  className?: string;
  /**
   * Visual style variant of the button. One of IconButtonType.
   */
  type: IconButtonType;
  /**
   * Icon component to display inside the button
   */
  Icon: FC<IconProps>;
}

const baseClass =
  "p-3 w-10 h-10 transition-colors rounded-inner relative z-10 overflow-hidden before:content-[''] before:absolute before:transition-colors before:-z-10 before:inset-0 before:bg-transparent focus:outline-0";

const mainClass =
  "bg-primary-80 text-secondary-80 enabled:hover:before:bg-primary-80 focus:before:bg-primary-80 enabled:active:before:bg-secondary-10 disabled:bg-primary-10 disabled:text-secondary-40";

const ghostClass =
  "bg-primary-5 text-primary-80 enabled:hover:before:bg-primary-10 focus:before:bg-primary-10 enabled:active:before:bg-secondary-10 disabled:bg-primary-5 disabled:text-primary-20";

const activatedClass =
  "bg-accent text-secondary-80 enabled:hover:before:bg-primary-40 focus:before:bg-primary-40 enabled:active:before:bg-secondary-10 disabled:bg-accent-20";

const coverupClass =
  "bg-secondary-60 backdrop-blur-sm text-primary-80 enabled:hover:before:bg-primary-10 focus:before:bg-primary-10 enabled:active:before:bg-secondary-10 disabled:bg-secondary-20 disabled:text-primary-20";

const overlayClass =
  "bg-background backdrop-blur-sm text-primary-80 enabled:hover:before:bg-primary-10 focus:before:bg-primary-10 enabled:active:before:bg-secondary-10 disabled:bg-secondary-20 disabled:text-primary-20";

const errorClass =
  "bg-error-primary text-secondary-80 enabled:hover:before:bg-primary-10";

// Used in <summary> tags
export const UnsemanticIconButton: FC<{
  type: IconButtonType;
  Icon: FC<IconProps>;
}> = ({ type, Icon }) => {
  return (
    <span
      className={clsx(
        baseClass,
        "block",
        type === "main" ? mainClass : null,
        type === "ghost" ? ghostClass : null,
        type === "activated" ? activatedClass : null,
        type === "coverup" ? coverupClass : null,
        type === "overlay" ? overlayClass : null,
        type === "error" ? errorClass : null,
      )}
    >
      <Icon />
    </span>
  );
};

/**
 * A button showing only an icon (textual label is provided for accessibility)
 * @example
 * ```tsx
 * import { IconButton, Icons, React } from '@nlx/touchpoint-ui';
 *
 * const MyIconButton = () => (
 *   <IconButton
 *     label="Send message"
 *     onClick={() => alert('Icon button clicked!')}
 *     type="main"
 *     Icon={Icons.ArrowForward}
 *   />
 * );
 * ```
 * @category Modality components
 */
export const IconButton: FC<IconButtonProps> = ({
  onClick,
  type,
  label,
  className,
  Icon,
}) => {
  const isDisabled = onClick == null;
  const appRoot = useAppRoot();
  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        onClick={isDisabled ? undefined : onClick}
        disabled={isDisabled}
        aria-label={label}
        className={clsx(
          baseClass,
          type === "main" ? mainClass : null,
          type === "ghost" ? ghostClass : null,
          type === "activated" ? activatedClass : null,
          type === "coverup" ? coverupClass : null,
          type === "overlay" ? overlayClass : null,
          type === "error" ? errorClass : null,
          className,
        )}
      >
        <Icon />
      </Tooltip.Trigger>
      <Tooltip.Portal
        container={appRoot}
        className={"z-touchpoint pointer-events-none"}
      >
        <Tooltip.Positioner sideOffset={4}>
          <Tooltip.Popup className="bg-primary-90 text-secondary-90 text-xs px-2 py-1 rounded-[calc(var(--radius-inner)*0.6667)] shadow-lg">
            {label}
          </Tooltip.Popup>
        </Tooltip.Positioner>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
};
