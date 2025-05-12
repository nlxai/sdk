import { createContext, useContext, useState, useMemo, type ReactNode, type FC } from "react";
import type { TouchpointInstance, ConversationHandler } from "@nlxai/touchpoint-ui";

interface TouchpointContextType {
  instance: TouchpointInstance | null;
  setInstance: (instance: TouchpointInstance | null) => void;
  conversationHandler: ConversationHandler | null;
  isTouchpointReady: boolean;
}

const TouchpointContext = createContext<TouchpointContextType | undefined>(undefined);

export const TouchpointProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [instance, setInstance] = useState<TouchpointInstance | null>(null);

  const conversationHandler = useMemo(() => instance?.conversationHandler || null, [instance]);
  const isTouchpointReady = useMemo(() => instance !== null && conversationHandler !== null, [instance, conversationHandler]);

  const contextValue = useMemo(() => ({
    instance,
    setInstance,
    conversationHandler,
    isTouchpointReady,
  }), [instance, conversationHandler, isTouchpointReady]);

  return (
    <TouchpointContext.Provider value={contextValue}>
      {children}
    </TouchpointContext.Provider>
  );
};

export const useTouchpoint = (): TouchpointContextType => {
  const context = useContext(TouchpointContext);
  if (context === undefined) {
    throw new Error("useTouchpoint must be used within a TouchpointProvider");
  }
  return context;
};