/* eslint-disable jsdoc/require-jsdoc */
import { type ConversationHandler } from "@nlxai/core";
import { CustomModalityComponent } from "../../interface";
import { DefaultDateInput } from "./DefaultDateInput";
import { DefaultCard } from "./DefaultCard";
import { DefaultCarousel } from "./DefaultCarousel";

export interface SaveAs {
  type: "slot" | "context" | "choiceId";
  id: string;
}

export const defaultModalities: Record<
  string,
  CustomModalityComponent<unknown>
> = {
  DefaultDateInput: DefaultDateInput as CustomModalityComponent<unknown>,
  DefaultCard: DefaultCard as CustomModalityComponent<unknown>,
  DefaultCarousel: DefaultCarousel as CustomModalityComponent<unknown>,
};

export interface CardRow {
  label: string;
  value: string;
}

export interface CardData {
  id?: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  rows?: CardRow[];
  label?: string;
  value?: string;
}

export const saveFn = (
  $saveAs: SaveAs,
  conversationHandler: ConversationHandler,
): ((val: any) => void) => {
  return (val) => {
    if ($saveAs == null) {
      return;
    }
    if ($saveAs.type === "slot") {
      conversationHandler.sendSlots({ [$saveAs.id]: val });
    }
    if ($saveAs.type === "context") {
      void conversationHandler.sendContext({ [$saveAs.id]: val });
    }
    if ($saveAs.type === "choiceId") {
      conversationHandler.sendChoice(
        typeof val === "string" ? val : JSON.stringify(val),
      );
    }
  };
};
