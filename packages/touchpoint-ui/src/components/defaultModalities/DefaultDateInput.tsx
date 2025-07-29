/* eslint-disable react/prop-types */
/* eslint-disable jsdoc/require-jsdoc */
import { type SaveAs } from "./types";
import { type CustomModalityComponent } from "../../types";
import { DateInput } from "../ui/DateInput";

export const DefaultDateInput: CustomModalityComponent<{
  $saveAs: SaveAs;
}> = ({ data, conversationHandler }) => {
  return (
    <DateInput
      onSubmit={(date) => {
        const { $saveAs } = data;
        if ($saveAs.type === "slot") {
          conversationHandler.sendSlots({ [$saveAs.id]: date });
        }
        if ($saveAs.type === "context") {
          conversationHandler.sendContext({ [$saveAs.id]: date });
        }
      }}
    />
  );
};
