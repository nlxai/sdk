/* eslint-disable react/prop-types */
/* eslint-disable jsdoc/require-jsdoc */
import { useMemo, useEffect } from "react";
import { debug } from "../debug";

import { type SaveAs, saveFn } from "./shared";
import { type CustomModalityComponent } from "../../interface";
import { DateInput } from "../ui/DateInput";

export const DefaultDateInput: CustomModalityComponent<{
  $saveAs: SaveAs;
}> = ({ data, conversationHandler }) => {
  useEffect(() => {
    if (data.$saveAs == null) {
      debug(
        "Expecting the 'DefaultDateInput' custom modality to be triggered with a field '$saveAs', but the field is missing.",
      );
    }
  }, [data]);
  const save = useMemo(
    () => saveFn(data.$saveAs, conversationHandler),
    [data.$saveAs, conversationHandler],
  );
  return <DateInput onSubmit={save} />;
};
