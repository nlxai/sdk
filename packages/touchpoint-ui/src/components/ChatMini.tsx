/* eslint-disable jsdoc/require-jsdoc */
import type { ConversationHandler, Response, UploadUrl } from "@nlxai/core";
import { type ReactNode, useState, type FC } from "react";
import { clsx } from "clsx";

import type { CustomModalityComponent, ColorMode } from "../interface";
import { Messages } from "./Messages";
import { Input } from "./Input";
import { IconButton } from "./ui/IconButton";
import { Close, Settings as SettingsIcon } from "./ui/Icons";
import { ErrorMessage } from "./ErrorMessage";

// Constants following user rules - define at top
const CHAT_MINI_MAX_WIDTH = "400px";
const CHAT_MINI_HEIGHT = "800px";
const CHAT_MINI_CONTAINER_CLASSES = "bg-background backdrop-blur text-primary-80 rounded-outer shadow-lg border border-primary-10";
const CHAT_MINI_RESPONSIVE_WIDTH = "w-[calc(100vw-16px)]";
const CHAT_MINI_RESPONSIVE_MAX_WIDTH = "max-w-[400px]";
const CHAT_MINI_HEIGHT_CLASSES = "h-[800px]";

const ChatMiniContainer: FC<{
  children: ReactNode;
  onClose: () => void;
  renderCollapse: boolean;
  className?: string;
}> = ({ children, renderCollapse, onClose, className }) => {
  const containerClasses = clsx(
    CHAT_MINI_CONTAINER_CLASSES,
    "flex flex-col",
    CHAT_MINI_RESPONSIVE_WIDTH,
    CHAT_MINI_RESPONSIVE_MAX_WIDTH,
    CHAT_MINI_HEIGHT_CLASSES,
    className
  );

  return (
    <div className={containerClasses}>
      {renderCollapse && (
        <div className="flex items-center justify-between p-2 border-b border-primary-10 flex-none">
          <span className="text-sm font-medium text-primary-80">Chat</span>
          <IconButton onClick={onClose} Icon={Close} type="ghost" label="Close" />
        </div>
      )}
      {children}
    </div>
  );
};

export const ChatMini: FC<{
  customModalities: Record<string, CustomModalityComponent<unknown>>;
  handler: ConversationHandler;
  renderCollapse: boolean;
  onClose: (event: Event) => void;
  responses: Response[];
  isWaiting: boolean;
  userMessageBubble: boolean;
  agentMessageBubble: boolean;
  colorMode: ColorMode;
  uploadedFiles: Record<string, File>;
  lastApplicationResponseIndex?: number;
  enabled: boolean;
  onFileUpload: (params: { uploadId: string; file: File }) => void;
  uploadUrl?: UploadUrl;
}> = ({
  handler,
  onClose,
  customModalities,
  renderCollapse,
  responses,
  isWaiting,
  userMessageBubble,
  agentMessageBubble,
  colorMode,
  uploadedFiles,
  lastApplicationResponseIndex,
  enabled,
  onFileUpload,
  uploadUrl
}) => {
  const onCloseHandler = (): void => {
    onClose(new Event("close"));
  };

  return (
    <ChatMiniContainer renderCollapse={renderCollapse} onClose={onCloseHandler}>
      {/* Messages Area */}
      <div className="flex-grow overflow-hidden relative">
        <Messages
          enabled={enabled}
          userMessageBubble={userMessageBubble}
          agentMessageBubble={agentMessageBubble}
          chatMode={true} // Always use chat mode for mini
          isWaiting={isWaiting}
          lastApplicationResponseIndex={lastApplicationResponseIndex}
          responses={responses}
          colorMode={colorMode}
          handler={handler}
          uploadedFiles={uploadedFiles}
          customModalities={customModalities}
          className="h-full"
        />
      </div>
      
      {/* Input Area */}
      <div className="flex-none p-2 border-t border-primary-10">
        <Input
          enabled={enabled}
          handler={handler}
          uploadUrl={uploadUrl}
          onFileUpload={onFileUpload}
          className="w-full"
        />
      </div>
    </ChatMiniContainer>
  );
};
