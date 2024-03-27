import { type FC } from "react";
import { type Config, type ConversationHandler } from "@nlxai/chat-core";
import { type Theme } from "./theme";

export interface TitleBar {
  logo?: string;
  title: string;
  withCollapseButton?: boolean;
}

export type StorageType = "localStorage" | "sessionStorage";

export type CustomModalityComponent = FC<{ data: any }>;

export interface Props {
  config: Config;
  theme?: Partial<Theme>;
  titleBar?: TitleBar;
  chatIcon?: string;
  bubble?: string;
  inputPlaceholder?: string;
  loaderMessage?: string;
  showLoaderMessageAfter?: number;
  storeIn?: StorageType;
  onExpand?: (conversationHandler: ConversationHandler) => void;
  onCollapse?: (conversationHandler: ConversationHandler) => void;
  customModalities?: Record<string, CustomModalityComponent>;
}
