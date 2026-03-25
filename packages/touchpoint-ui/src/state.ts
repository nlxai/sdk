/* eslint-disable jsdoc/require-jsdoc */
import { useState, type Dispatch, type SetStateAction } from "react";
import { type WidgetVoiceState } from "./voice";

export interface AppState {
  responses: Response[];
  voice: WidgetVoiceState;
  interimMessage: string | undefined;
  isSettingsOpen: boolean;
}

export const useAppState = () => {
  const [appState, setAppState] = useState<AppState>({
    responses: [],
    voice: null,
    interimMessage: undefined,
    isSettingsOpen: false,
  });

  const setResponses: Dispatch<SetStateAction<Response[]>> = (action) => {
    setAppState((prev) => ({
      ...prev,
      responses:
        typeof action === "function"
          ? (action as (prev: Response[]) => Response[])(prev.responses)
          : action,
    }));
  };

  const setVoice: Dispatch<SetStateAction<WidgetVoiceState>> = (action) => {
    setAppState((prev) => ({
      ...prev,
      voice:
        typeof action === "function"
          ? (action as (prev: WidgetVoiceState) => WidgetVoiceState)(prev.voice)
          : action,
    }));
  };

  const setInterimMessage: Dispatch<SetStateAction<string | undefined>> = (
    action,
  ) => {
    setAppState((prev) => ({
      ...prev,
      interimMessage:
        typeof action === "function"
          ? (action as (prev: string | undefined) => string | undefined)(
              prev.interimMessage,
            )
          : action,
    }));
  };

  const setIsSettingsOpen: Dispatch<SetStateAction<boolean>> = (action) => {
    setAppState((prev) => ({
      ...prev,
      isSettingsOpen:
        typeof action === "function"
          ? (action as (prev: boolean) => boolean)(prev.isSettingsOpen)
          : action,
    }));
  };

  return {
    responses: appState.responses,
    setResponses,
    voice: appState.voice,
    setVoice,
    interimMessage: appState.interimMessage,
    setInterimMessage,
    isSettingsOpen: appState.isSettingsOpen,
    setIsSettingsOpen,
  };
};
