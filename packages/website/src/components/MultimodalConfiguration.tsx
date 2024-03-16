import React, { type FC } from "react";
import { Labeled, inputClass } from "./Ui";

type HardCodedConfig = {
  workspaceId: string;
  apiKey: string;
  journeyId: string;
  testStepId: string;
};

type DynamicConfigAsStrings = {
  languageCode: string;
  conversationId: string;
};
type DynamicConfigAsCode = {
  languageCodeSnippet: string;
  conversationIdSnippet: string;
};

export type Config = HardCodedConfig &
  (DynamicConfigAsCode | DynamicConfigAsStrings);

export type ConfigAsStrings = HardCodedConfig & DynamicConfigAsStrings;

export const getInitialConfig = (): ConfigAsStrings => {
  const searchParams = new URLSearchParams(window.location.search);
  const workspaceId = searchParams.get("workspaceId") || "";
  const apiKey = searchParams.get("apiKey") || "";
  const languageCode = searchParams.get("languageCode") || "en-US";
  const journeyId = searchParams.get("journeyId") || "";
  const conversationId = searchParams.get("conversationId") || "";
  const testStepId = searchParams.get("testStepId") || "";
  return {
    workspaceId,
    apiKey,
    languageCode,
    journeyId,
    conversationId,
    testStepId,
  };
};

export const ConfigEditor: FC<{
  value: ConfigAsStrings;
  onChange: (newValue: Partial<ConfigAsStrings>) => void;
}> = (props) => {
  const config = props.value;
  return (
    <div className="space-y-4">
      <Labeled label="Workspace ID">
        <input
          placeholder="Enter workspace ID"
          className={inputClass}
          value={config.workspaceId}
          onInput={(ev: any) => {
            props.onChange({ workspaceId: ev.target.value });
          }}
        />
      </Labeled>
      <Labeled label="API key">
        <input
          placeholder="Enter API key"
          className={inputClass}
          value={config.apiKey}
          onInput={(ev: any) => {
            props.onChange({ apiKey: ev.target.value });
          }}
        />
      </Labeled>
      <Labeled label="Journey ID">
        <input
          placeholder="Enter journey ID"
          className={inputClass}
          value={config.journeyId}
          onInput={(ev: any) => {
            props.onChange({ journeyId: ev.target.value });
          }}
        />
      </Labeled>
      <Labeled label="Language">
        <input
          placeholder="Enter language"
          className={inputClass}
          value={config.languageCode}
          onInput={(ev: any) => {
            props.onChange({ languageCode: ev.target.value });
          }}
        />
      </Labeled>
      <Labeled label="Conversation ID">
        <input
          placeholder="Enter conversation ID"
          className={inputClass}
          value={config.conversationId}
          onInput={(ev: any) => {
            props.onChange({ conversationId: ev.target.value });
          }}
        />
      </Labeled>
      <Labeled label="Test step ID">
        <input
          placeholder="Enter step ID"
          className={inputClass}
          value={config.testStepId}
          onInput={(ev: any) => {
            props.onChange({ testStepId: ev.target.value });
          }}
        />
      </Labeled>
    </div>
  );
};
