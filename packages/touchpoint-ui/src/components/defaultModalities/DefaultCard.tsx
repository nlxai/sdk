/* eslint-disable react/prop-types */
/* eslint-disable jsdoc/require-jsdoc */
import { clsx } from "clsx";
import { type CustomModalityComponent } from "../../interface";
import {
  CustomCard,
  CustomCardImageRow,
  CustomCardRow,
} from "../ui/CustomCard";
import { BaseText } from "../ui/Typography";
import { type CardData } from "./shared";

export const DefaultCard: CustomModalityComponent<CardData> = ({
  data,
  className,
  backdropBlur,
}) => {
  return (
    <CustomCard className={clsx(className)}>
      {data.thumbnail != null ? (
        <CustomCardImageRow src={data.thumbnail} alt={data.thumbnailAlt} />
      ) : null}
      {data.rows != null
        ? data.rows.map((row, rowIndex) => (
            <CustomCardRow
              className={backdropBlur ? "backdrop-blur-overlay" : ""}
              key={rowIndex}
              left={<BaseText faded>{row.label}</BaseText>}
              right={<BaseText>{row.value}</BaseText>}
            />
          ))
        : null}
    </CustomCard>
  );
};
