/* eslint-disable jsdoc/require-jsdoc */
import ScrollContainer from "react-indiana-drag-scroll";
import { type FC, useState } from "react";
import { clsx } from "clsx";

export interface CardContent {
  imgSrc: string;
  choiceId: string;
  titleLeftText: string;
  titleRightText?: string;
  bottomLeftText: string;
  bottomRightText?: string;
}

interface CardsContainerProps {
  payload: CardContent[];
  type: "sm" | "lg";
}

export const CardsContainer: FC<CardsContainerProps> = ({ payload, type }) => {
  const [activeChoiceId, setActiveChoiceId] = useState<string | null>(null);

  return (
    <ScrollContainer className="flex gap-x-2 pt-3 pb-1 overflow-x-auto no-scrollbar px-2 -mx-2">
      {payload.map(
        (
          {
            imgSrc,
            choiceId,
            titleLeftText,
            titleRightText,
            bottomLeftText,
            bottomRightText,
          },
          key,
        ) => (
          <button
            className={clsx(
              "block shrink-0 rounded-base overflow-hidden",
              type === "sm" ? "w-[7.5rem]" : "w-80",
              activeChoiceId === choiceId
                ? "outline outline-2 outline-accent"
                : "",
            )}
            key={key}
            onClick={() => {
              setActiveChoiceId(choiceId);
            }}
          >
            <img src={imgSrc} alt="" className="w-full h-52 object-cover" />
            <div className="">
              <p className="text-primary-80 bg-primary-5 px-3 py-4 mb-px flex justify-between">
                <span>{titleLeftText}</span>
                <span>{titleRightText}</span>
              </p>
              {type === "lg" && (
                <p className="text-primary-60 bg-primary-5 px-3 py-4 flex justify-between">
                  <span>{bottomLeftText}</span>
                  <span>{bottomRightText}</span>
                </p>
              )}
            </div>
          </button>
        ),
      )}
    </ScrollContainer>
  );
};
