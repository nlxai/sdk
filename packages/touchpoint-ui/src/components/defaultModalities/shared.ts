/* eslint-disable jsdoc/require-jsdoc */
import { type ConversationHandler } from "@nlxai/core";

export interface SaveAs {
  type: "slot" | "context";
  id: string;
}

export const saveFn = (
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
