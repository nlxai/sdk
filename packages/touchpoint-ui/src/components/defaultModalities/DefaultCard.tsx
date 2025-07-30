/* eslint-disable react/prop-types */
/* eslint-disable jsdoc/require-jsdoc */
import { type CustomModalityComponent } from "../../types";
import {
  CustomCard,
  CustomCardImageRow,
  CustomCardRow,
} from "../ui/CustomCard";
import { BaseText } from "../ui/Typography";

export interface Cd {
  id: string;
  thumbnail: string;
  thumbnailAlt: string;
  label: string;
  value: string;
}

export const DefaultCard: CustomModalityComponent<Cd> = ({ data }) => {
  return (
    <CustomCard>
      <CustomCardImageRow src={data.thumbnail} alt={data.thumbnailAlt} />
      <CustomCardRow
        left={<BaseText faded>{data.label}</BaseText>}
        right={<BaseText>{data.value}</BaseText>}
      />
    </CustomCard>
  );
};
