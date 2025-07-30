/* eslint-disable react/prop-types */
/* eslint-disable jsdoc/require-jsdoc */
import { useMemo } from "react";

import { type SaveAs, saveFn } from "./shared";
import { type CustomModalityComponent } from "../../types";
import { DateInput } from "../ui/DateInput";

export const DefaultDateInput: CustomModalityComponent<{
  $saveAs: SaveAs;
}> = ({ data, conversationHandler }) => {
  const save = useMemo(
    () => saveFn(data.$saveAs, conversationHandler),
    [data.$saveAs, conversationHandler],
  );
  return <DateInput onSubmit={save} />;
};
