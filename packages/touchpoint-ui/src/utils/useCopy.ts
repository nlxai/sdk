/* eslint-disable jsdoc/require-jsdoc */
import { createContext, useContext } from "react";
import { type Copy } from "../interface";

export const defaultCopy = (languageCode: string): Copy => {
  if (languageCode.startsWith("es")) {
    return {
      escalationAttemptNotice:
        "Estoy intentando transferir tu conversación a un agente.",
      escalationNotice: "Su conversación ha sido transferida a un agente",
      restartConversationButtonLabel: "Reiniciar conversación",
      escalationButtonLabel: "Hablar con un agente",
      sendMessageButtonLabel: "Enviar mensaje",
    };
  }
  // TODO: add default copy for other languages
  return {
    escalationAttemptNotice:
      "I'm attempting to transfer your conversation to an agent",
    escalationNotice: "Your conversation has been transferred to an agent",
    restartConversationButtonLabel: "Restart conversation",
    escalationButtonLabel: "Talk to an agent",
    sendMessageButtonLabel: "Send message",
  };
};

const CopyContext = createContext<Copy>(defaultCopy("en-US"));

export const CopyProvider = CopyContext.Provider;

export const useCopy = (): Copy => useContext(CopyContext);
