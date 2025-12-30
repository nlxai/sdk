import { clsx } from "clsx";
import { type FC } from "react";
import { type IconProps } from "./Icons";

/**
 * Props for the TextButton component
 * @inline
 * @hidden
 */
export interface TextButtonProps {
  /**
   * Handler function called when the button is clicked
   */
  onClick?: () => void;
  /**
   * Text to display on the button
   */
  label: string;
  /**
   * Additional CSS classes to apply to the button
   */
  className?: string;
  /**
   * Visual style variant of the button
   * Default value is "ghost"
   */
  type?: "main" | "ghost";
  /**
   * Icon component to display inside the button.
   */
  Icon: FC<IconProps>;
}

/**
 * A button with a visible textual label
 * @example
 * ```tsx
 * import { TextButton, ArrowForward, React } from '@nlx/touchpoint-ui';
 *
 * const MyTextButton = ({ onClickHandler }) => (
 *  <TextButton
 *    onClick={onClickHandler}
 *    label="Continue"
 *  />
 * );
 * ```
 * @category Modality components
 */
export const TextButton: FC<TextButtonProps> = ({
  onClick,
  label,
  type = "ghost",
  Icon,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={onClick == null}
      className={clsx(
        "relative z-10 w-full px-5 py-4 transition-colors rounded-outer flex justify-between items-center focus:outline-0 overflow-hidden before:content-[''] before:absolute before:transition-colors before:-z-10 before:inset-0 before:bg-transparent",
        {
          "bg-primary-80 text-secondary-80 enabled:hover:before:bg-primary-80 focus:before:bg-primary-80 enabled:active:before:bg-secondary-10 disabled:bg-primary-10 disabled:text-secondary-40":
            type === "main",
          "bg-primary-5 text-primary-80 enabled:hover:before:bg-primary-5 focus:before:bg-primary-5 enabled:active:before:bg-secondary-10 disabled:bg-primary-5 disabled:text-primary-20":
            type === "ghost",
        },
        className,
      )}
    >
      {label}
      <Icon size={16} />
    </button>
  );
};
