/* eslint-disable jsdoc/require-jsdoc */
import { useState, type Dispatch, type SetStateAction } from "react";
import { type WidgetVoiceState } from "./voice";
import { type Response } from "@nlxai/core";

export interface AppState {
  responses: Response[];
  voice: WidgetVoiceState;
  interimMessage: string | undefined;
  isSettingsOpen: boolean;
}

type SetState<T> = Dispatch<SetStateAction<T>>;

export interface AppStateSetters {
  setResponses: SetState<Response[]>;
  setVoice: SetState<WidgetVoiceState>;
  setInterimMessage: SetState<string | undefined>;
  setIsSettingsOpen: SetState<boolean>;
}

export const useAppState = (): AppState & AppStateSetters => {
  const [appState, setAppState] = useState<AppState>({
    responses: [],
    voice: null,
    interimMessage: undefined,
    isSettingsOpen: false,
  });

  const setResponses: SetState<Response[]> = (action) => {
    setAppState((prev) => ({
      ...prev,
      responses:
        typeof action === "function"
          ? (action as (prev: Response[]) => Response[])(prev.responses)
          : action,
    }));
  };

  const setVoice: SetState<WidgetVoiceState> = (action) => {
    setAppState((prev) => ({
      ...prev,
      voice:
        typeof action === "function"
          ? (action as (prev: WidgetVoiceState) => WidgetVoiceState)(prev.voice)
          : action,
    }));
  };

  const setInterimMessage: SetState<string | undefined> = (action) => {
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

  const setIsSettingsOpen: SetState<boolean> = (action) => {
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
