/* eslint-disable jsdoc/require-jsdoc */
import { type FC } from "react";
import ScrollContainer from "react-indiana-drag-scroll";

export interface PicturesProps {
  imgSrc: string;
}

interface PicturesContainerProps {
  payload: PicturesProps[];
}

export const PicturesContainer: FC<PicturesContainerProps> = ({ payload }) => {
  return (
    <ScrollContainer className="flex gap-x-2 overflow-x-auto no-scrollbar">
      {payload.map(({ imgSrc }, key) => (
        <div className="block shrink-0 relative" key={key}>
          <img src={imgSrc} alt="" className="h-64 rounded-base" />
        </div>
      ))}
    </ScrollContainer>
  );
};
