/* eslint-disable react/prop-types */
/* eslint-disable jsdoc/require-jsdoc */
import { type CustomModalityComponent } from "../../interface";
import {
  CustomCard,
  CustomCardImageRow,
  CustomCardRow,
} from "../ui/CustomCard";
import { BaseText } from "../ui/Typography";
import { type CardData } from "./shared";

export const DefaultCard: CustomModalityComponent<CardData> = ({ data }) => {
  return (
    <CustomCard>
      {data.thumbnail != null ? (
        <CustomCardImageRow src={data.thumbnail} alt={data.thumbnailAlt} />
      ) : null}
      {data.rows != null
        ? data.rows.map((row, rowIndex) => (
            <CustomCardRow
              key={rowIndex}
              left={<BaseText faded>{row.label}</BaseText>}
              right={<BaseText>{row.value}</BaseText>}
            />
          ))
        : null}
    </CustomCard>
  );
};
