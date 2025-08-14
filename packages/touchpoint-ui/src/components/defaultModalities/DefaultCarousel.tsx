/* eslint-disable react/prop-types */
/* eslint-disable jsdoc/require-jsdoc */
import { useState, useMemo } from "react";
import { type CustomModalityComponent } from "../../interface";
import { Carousel } from "../ui/Carousel";
import {
  CustomCard,
  CustomCardImageRow,
  CustomCardRow,
} from "../ui/CustomCard";
import { BaseText } from "../ui/Typography";
import { type SaveAs, type CardData, saveFn } from "./shared";

export const DefaultCarousel: CustomModalityComponent<{
  cards: CardData[];
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
      {data.cards.map((card, index) => (
        <CustomCard
          key={card.id ?? index}
          selected={card.id === selectedCard}
          onClick={
            card.id != null
              ? () => {
                  if (card.id != null) {
                    handleClick(card.id);
                  }
                }
              : undefined
          }
        >
          {card.thumbnail != null ? (
            <CustomCardImageRow src={card.thumbnail} alt={card.thumbnailAlt} />
          ) : null}
          {card.rows != null
            ? card.rows.map((row, rowIndex) => (
                <CustomCardRow
                  key={rowIndex}
                  left={<BaseText faded>{row.label}</BaseText>}
                  right={<BaseText>{row.value}</BaseText>}
                />
              ))
            : null}
        </CustomCard>
      ))}
    </Carousel>
  );
};
