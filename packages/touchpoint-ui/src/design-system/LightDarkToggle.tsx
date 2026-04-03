/* eslint-disable jsdoc/require-jsdoc */
import { type SVGProps, type FC } from "react";
import { clsx } from "clsx";
import { type ColorMode } from "../interface";
import { type Icon, type IconProps } from "../components/ui/Icons";

const iconSvgProps = (props: IconProps): SVGProps<SVGSVGElement> => ({
  width: props.size != null ? `${props.size}px` : "100%",
  height: props.size != null ? `${props.size}px` : "100%",
  className: props.className,
});

export const LightMode: Icon = (props) => {
  return (
    <svg viewBox="0 0 24 24" {...iconSvgProps(props)}>
      <path
        d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM11 1H13V4H11V1ZM11 20H13V23H11V20ZM3.51472 4.92893L4.92893 3.51472L7.05025 5.63604L5.63604 7.05025L3.51472 4.92893ZM16.9497 18.364L18.364 16.9497L20.4853 19.0711L19.0711 20.4853L16.9497 18.364ZM19.0711 3.51472L20.4853 4.92893L18.364 7.05025L16.9497 5.63604L19.0711 3.51472ZM5.63604 16.9497L7.05025 18.364L4.92893 20.4853L3.51472 19.0711L5.63604 16.9497ZM23 11V13H20V11H23ZM4 11V13H1V11H4Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const DarkMode: Icon = (props) => {
  return (
    <svg viewBox="0 0 24 24" {...iconSvgProps(props)}>
      <path
        d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1"
        fill="currentColor"
      />
    </svg>
  );
};

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
  const handleClick = (): void => {
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
