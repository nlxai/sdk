/* eslint-disable react/prop-types */
/* eslint-disable jsdoc/require-jsdoc */
import { useState, useMemo } from "react";
import { type CustomModalityComponent } from "../../types";
import { Carousel } from "../ui/Carousel";
import {
  CustomCard,
  CustomCardImageRow,
  CustomCardRow,
} from "../ui/CustomCard";
import { BaseText } from "../ui/Typography";
import { type Cd } from "./DefaultCard";
import { type SaveAs, saveFn } from "./shared";

export const DefaultCarousel: CustomModalityComponent<{
  items: Cd[];
  $saveAs: SaveAs;
}> = ({ data, conversationHandler }) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const save = useMemo(
    () => saveFn(data.$saveAs, conversationHandler),
    [data.$saveAs, conversationHandler],
  );

  const handleClick = (cardId: string): void => {
    setSelectedCard(cardId);
    save(cardId);
  };

  return (
    <Carousel>
      {data.items.map((item) => (
        <CustomCard
          key={item.id}
          selected={item.id === selectedCard}
          onClick={() => {
            handleClick(item.id);
          }}
        >
          <CustomCardImageRow src={item.thumbnail} alt={item.thumbnailAlt} />
          <CustomCardRow
            left={<BaseText faded>{item.label}</BaseText>}
            right={<BaseText>{item.value}</BaseText>}
          />
        </CustomCard>
      ))}
    </Carousel>
  );
};
