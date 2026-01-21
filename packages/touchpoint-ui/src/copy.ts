// Copy settings

export interface Copy {
  /**
   * Escalation notice
   */
  escalationNotice: string;
  /**
   * Restart conversation button label
   */
  restartConversationButtonLabel: string;
  /**
   * Restart conversation button label
   */
  escalationButtonLabel: string;
  /**
   * Send message button label
   */
  sendMessageButtonLabel: string;
}

export const defaultCopy = (languageCode: string): Copy => {
  return {
    escalationNotice: "Your conversation has been escalated to an agent",
    restartConversationButtonLabel: "Restart conversation",
    escalationButtonLabel: "Talk to an agent",
    sendMessageButtonLabel: "Send message",
  };
};
