/* eslint-disable react/prop-types */
/* eslint-disable jsdoc/require-jsdoc */
import { useMemo } from "react";
import { type ConversationHandler } from "@nlxai/core";

import { type SaveAs } from "./types";
import { type CustomModalityComponent } from "../../types";
import { DateInput } from "../ui/DateInput";

const saveFn = (
  $saveAs: SaveAs,
  conversationHandler: ConversationHandler,
): ((val: any) => void) => {
  return (val) => {
    if ($saveAs.type === "slot") {
      conversationHandler.sendSlots({ [$saveAs.id]: val });
    }
    if ($saveAs.type === "context") {
      conversationHandler.sendContext({ [$saveAs.id]: val });
    }
  };
};

export const DefaultDateInput: CustomModalityComponent<{
  $saveAs: SaveAs;
}> = ({ data, conversationHandler }) => {
  const save = useMemo(
    () => saveFn(data.$saveAs, conversationHandler),
    [data.$saveAs, conversationHandler],
  );
  return <DateInput onSubmit={save} />;
};
