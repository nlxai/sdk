/* eslint-disable jsdoc/require-jsdoc */
import { createContext, useContext } from "react";
import { type Copy } from "../interface";

export const defaultCopy = (languageCode: string): Copy => {
  if (languageCode.startsWith("es")) {
    return {
      escalationNotice: "Tu conversación ha sido escalada a un agente",
      restartConversationButtonLabel: "Reiniciar conversación",
      escalationButtonLabel: "Hablar con un agente",
      sendMessageButtonLabel: "Enviar mensaje",
    };
  }
  // TODO: add default copy for other languages
  return {
    escalationNotice: "Your conversation has been escalated to an agent",
    restartConversationButtonLabel: "Restart conversation",
    escalationButtonLabel: "Talk to an agent",
    sendMessageButtonLabel: "Send message",
  };
};

const CopyContext = createContext<Copy>(defaultCopy("en-US"));

export const CopyProvider = CopyContext.Provider;

export const useCopy = (): Copy => useContext(CopyContext);
