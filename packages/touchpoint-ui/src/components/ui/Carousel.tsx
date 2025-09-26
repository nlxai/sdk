/* eslint-disable jsdoc/require-jsdoc */
import {
  type FC,
  type ReactNode,
  createContext,
  useState,
  useEffect,
} from "react";
import { clsx } from "clsx";
import ScrollContainer from "react-indiana-drag-scroll";

export interface CarouselProps {
  className?: string;
  children?: ReactNode;
}

// Stores whether the carousel recently went through a scroll end event. During this period, click events on child cards should not trigger
export const CarouselContext = createContext<{
  recentlyEndedScrolling: boolean;
}>({ recentlyEndedScrolling: false });

export const Carousel: FC<CarouselProps> = (props) => {
  const [recentlyEndedScrolling, setRecentlyEndedScrolling] =
    useState<boolean>(false);

  useEffect(() => {
    if (!recentlyEndedScrolling) {
      return;
    }
    const timeout = setTimeout(() => {
      setRecentlyEndedScrolling(false);
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, [recentlyEndedScrolling, setRecentlyEndedScrolling]);

  return (
    <CarouselContext.Provider value={{ recentlyEndedScrolling }}>
      <ScrollContainer
        className={clsx(
          "flex gap-x-2 overflow-x-auto no-scrollbar px-2 -mx-2",
          props.className,
        )}
        onEndScroll={() => {
          setRecentlyEndedScrolling(true);
        }}
      >
        {props.children}
      </ScrollContainer>
    </CarouselContext.Provider>
  );
};
