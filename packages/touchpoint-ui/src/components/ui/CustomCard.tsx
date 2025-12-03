 
import { clsx } from "clsx";
import { useEffect, type FC, type ReactNode, useContext } from "react";
import { CarouselContext } from "./Carousel";

import { type Icon } from "../ui/Icons";

/**
 * Props for the CustomCard component
 * @inline
 * @hidden
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

/**
 * A customizable card component that can function as a button or link.
 * @example
 * ```tsx
 * import { CustomCard, CustomCardImageRow, CustomCardRow, React } from '@nlx/touchpoint-ui';
 *
 * const MyCard = ({data}) => (
 *   <CustomCard selected={data.active} onClick={() => alert('Card clicked!')}>
 *     <CustomCardImageRow src="https://example.com/image.jpg" alt="Example Image" />
 *     <CustomCardRow
 *       left={<div>Left Content</div>}
 *       right={<div>Right Content</div>}
 *       icon={MyIcon}
 *     />
 *   </CustomCard>
 * );
 * ```
 * @category Modality components
 */
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
    selected ? "outline-solid outline-2 outline-accent" : "",
    onClick != null || href != null ? "hover:bg-primary-5" : "",
    className,
  );

  const carouselContext = useContext(CarouselContext);

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
          if (carouselContext.recentlyEndedScrolling) {
            return;
          }

          onClick();
        };
  if (onClick != null) {
    return (
      <button className={containerClassName} onClick={onClickCustom}>
        {children}
      </button>
    );
  }
  return <div className={containerClassName}>{children}</div>;
};

/**
 * A row within a CustomCard that displays an image.
 * @category Modality components
 */
export const CustomCardImageRow: FC<{ src: string; alt?: string }> = ({
  src,
  alt,
}) => {
  return <img src={src} alt={alt} className="w-full h-52 object-cover" />;
};

/**
 * Props for the CustomCardRow component
 * @inline
 * @hidden
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
  /**
   * Class name
   */
  className?: string;
}

/**
 * A row within a CustomCard that displays left and right content, with an optional centered icon.
 * @example
 * ```tsx
 * import { CustomCardRow, Icons, BaseText, React } from '@nlx/touchpoint-ui';
 *
 * const MyCardRow = () => (
 *   <CustomCardRow
 *     left={<BaseText>Left Content</BaseText>}
 *     right={<BaseText>Right Content</BaseText>}
 *     icon={Icons.ArrowRight}
 *   />
 * );
 * ```
 * @category Modality components
 */
export const CustomCardRow: FC<CustomCardRowProps> = ({
  left,
  right,
  className,
  icon: Icon,
}) => {
  return (
    <div
      className={clsx(
        className,
        "flex items-center relative justify-between gap-2 bg-primary-5 px-3 py-4",
      )}
    >
      <div className="space-y-1 text-left">{left}</div>
      <div className="space-y-1 text-right">{right}</div>
      {Icon != null ? (
        <Icon className="text-primary-60 w-4 h-4 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2" />
      ) : null}
    </div>
  );
};
