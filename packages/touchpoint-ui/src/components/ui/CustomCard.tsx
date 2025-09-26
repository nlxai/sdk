/* eslint-disable jsdoc/require-jsdoc */
import { clsx } from "clsx";
import { useEffect, type FC, type ReactNode, useRef } from "react";

import { type Icon } from "../ui/Icons";

/**
 * Props for the CustomCard component
 */
export interface CustomCardProps {
  /**
   * Class name
   */
  className?: string;
  /**
   * Content to be rendered inside the card.
   */
  children: ReactNode;
  /**
   * Whether the card is in a selected state. Used to highlight the card.
   */
  selected?: boolean;
  /**
   * Handler function for when the card is clicked
   */
  onClick?: () => void;
  /**
   *  Transform the card into an anchor tag with the href specified
   */
  href?: string;
  /**
   * Specify whether the URL should take the user to a new tab
   */
  newTab?: boolean;
}

export const CustomCard: FC<CustomCardProps> = ({
  children,
  className,
  selected,
  onClick,
  href,
  newTab,
}) => {
  const containerClassName = clsx(
    "block shrink-0 rounded-inner overflow-hidden",
    "w-80 space-y-px",
    selected ? "outline outline-2 outline-accent" : "",
    onClick != null || href != null ? "hover:bg-primary-5" : "",
    className,
  );

  const buttonContainerRef = useRef<HTMLButtonElement | null>(null);
  const anchorContainerRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (href == null && newTab != null) {
      // eslint-disable-next-line no-console
      console.warn(
        "Setting the `newTab` prop on the `<CustomCard/>` has no effect if the `href` is not also set.",
      );
    }
  }, [href, newTab]);
  if (href != null) {
    return (
      <a
        className={containerClassName}
        href={href}
        ref={anchorContainerRef}
        onClick={onClick}
        {...(newTab ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  const onClickCustom =
    onClick == null
      ? onClick
      : () => {
          // TODO: check parent container
          onClick();
        };
  if (onClick != null) {
    return (
      <button
        className={containerClassName}
        onClick={onClickCustom}
        ref={buttonContainerRef}
      >
        {children}
      </button>
    );
  }
  return <div className={containerClassName}>{children}</div>;
};

export const CustomCardImageRow: FC<{ src: string; alt?: string }> = ({
  src,
  alt,
}) => {
  return <img src={src} alt={alt} className="w-full h-52 object-cover" />;
};

/**
 * Props for the CustomCardRow component
 */
export interface CustomCardRowProps {
  /**
   * Content to be displayed on the left side of the row
   */
  left: ReactNode;
  /**
   * Content to be displayed on the right side of the row
   */
  right: ReactNode;
  /**
   * Optional icon to be displayed in the center of the row
   */
  icon?: Icon;
}

export const CustomCardRow: FC<CustomCardRowProps> = ({
  left,
  right,
  icon: Icon,
}) => {
  return (
    <div className="flex items-center relative justify-between gap-2 bg-primary-5 px-3 py-4">
      <div className="space-y-1 text-left">{left}</div>
      <div className="space-y-1 text-right">{right}</div>
      {Icon != null ? (
        <Icon className="text-primary-60 w-4 h-4 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2" />
      ) : null}
    </div>
  );
};
