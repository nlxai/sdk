/* eslint-disable react/prop-types */
/* eslint-disable jsdoc/require-jsdoc */
import { type CustomModalityComponent } from "../../types";
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
      {data.label != null && data.value != null ? (
        <CustomCardRow
          left={<BaseText faded>{data.label}</BaseText>}
          right={<BaseText>{data.value}</BaseText>}
        />
      ) : null}
    </CustomCard>
  );
};
