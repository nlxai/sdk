import { clsx } from "clsx";
import { type FC } from "react";

import { type IconProps } from "./Icons";
import { HeadlessIconButton } from "./IconButton";

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
export type MessageButtonType = "main" | "activated";

/**
 * Props for the MessageButton component
 * @inline
 * @hidden
 */
export interface MessageButtonProps {
  /**
   * Handler function called when the button is clicked
   */
  onClick?: () => void;
  /**
   * Accessible label for the button
   */
  label: string;
  /**
   * Additional CSS classes to apply to the button
   */
  className?: string;
  /**
   * Visual style variant of the button. One of MessageButtonType.
   */
  type: MessageButtonType;
  /**
   * Icon component to display inside the button
   */
  Icon: FC<IconProps>;
}

const baseClass =
  "p-2.5 w-8 h-8 transition-colors rounded-inner relative z-10 overflow-hidden focus:outline-0";

const mainClass =
  "text-primary-60 hover:bg-primary-10 focus:bg-primary-10 active:bg-secondary-20 disabled:text-primary-20";

const activatedClass =
  "bg-accent text-secondary-80 enabled:hover:before:bg-primary-40 focus:before:bg-primary-40 enabled:active:before:bg-secondary-10 disabled:bg-accent-20";

/**
 * A button showing only an icon (textual label is provided for accessibility)
 * @example
 * ```tsx
 * import { MessageButton, Icons, React } from '@nlx/touchpoint-ui';
 *
 * const MyMessageButton = () => (
 *   <MessageButton
 *     label="Send message"
 *     onClick={() => alert('Icon button clicked!')}
 *     type="main"
 *     Icon={Icons.ArrowForward}
 *   />
 * );
 * ```
 * @category Modality components
 */
export const MessageButton: FC<MessageButtonProps> = ({
  onClick,
  type,
  label,
  className,
  Icon,
}) => {
  return (
    <HeadlessIconButton
      onClick={onClick}
      label={label}
      className={clsx(
        baseClass,
        type === "main" ? mainClass : null,
        type === "activated" ? activatedClass : null,
        className,
      )}
    >
      <Icon size={12} />
    </HeadlessIconButton>
  );
};
