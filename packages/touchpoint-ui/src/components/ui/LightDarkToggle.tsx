import { type FC } from "react";
import { clsx } from "clsx";
import { type ColorMode } from "../../interface";
import { LightMode, DarkMode } from "./Icons";

/**
 * Props for the LightDarkToggle component
 * @inline
 * @hidden
 */
interface Props {
  /**
   * Current theme state
   */
  value: ColorMode;
  /**
   * Callback fired when the toggle is changed
   */
  onChange: (value: ColorMode) => void;
  /**
   * Additional CSS classes to apply to the toggle
   */
  className?: string;
  /**
   * Accessible label for the toggle
   */
  label?: string;
}

/**
 * A controlled light/dark mode toggle component
 * @example
 * ```tsx
 * import { LightDarkToggle, React, useState } from '@nlx/touchpoint-ui';
 *
 * const MyToggle = () => {
 *   const [theme, setTheme] = useState<'light' | 'dark'>('light');
 *
 *   return (
 *     <LightDarkToggle
 *       value={theme}
 *       onChange={setTheme}
 *       label="Toggle theme"
 *     />
 *   );
 * };
 * ```
 * @category Modality components
 */
export const LightDarkToggle: FC<Props> = ({
  value,
  onChange,
  className,
  label = "Toggle light/dark mode",
}) => {
  const handleClick = () => {
    onChange(value === "light" ? "dark" : "light");
  };

  const Icon = value === "light" ? LightMode : DarkMode;
  const iconColor = value === "light" ? "text-primary-80" : "text-accent";

  return (
    <button
      onClick={handleClick}
      aria-label={label}
      className={clsx(
        "relative inline-flex items-center w-14 h-7 rounded-full transition-colors cursor-pointer",
        value === "dark" ? "bg-accent" : "bg-primary-10",
        className,
      )}
    >
      <div
        className={clsx(
          "absolute left-1 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-secondary-80 transition-all duration-200 flex items-center justify-center",
          value === "dark" ? "translate-x-7" : "translate-x-0",
        )}
      >
        <Icon className={clsx("w-3 h-3", iconColor)} />
      </div>
    </button>
  );
};
