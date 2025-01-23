import { type FC } from "react";
import { Labeled, inputClass } from "./Ui";
import { isNil, mergeRight, reject } from "ramda";

interface HardCodedConfig {
  workspaceId: string;
  apiKey: string;
  scriptId: string;
  testStepId: string;
}

interface DynamicConfigAsStrings {
  languageCode: string;
  conversationId: string;
}
interface DynamicConfigAsCode {
  languageCodeSnippet: string;
  conversationIdSnippet: string;
}

export type Config = HardCodedConfig &
  (DynamicConfigAsCode | DynamicConfigAsStrings);

export type ConfigAsStrings = HardCodedConfig & DynamicConfigAsStrings;

const defaultConfigAsStrings: ConfigAsStrings = {
  workspaceId: "",
  apiKey: "",
  languageCode: "en-US",
  scriptId: "",
  conversationId: "",
  testStepId: "",
};

export const getInitialConfig = (): ConfigAsStrings => {
  if (typeof window === "undefined") {
    return defaultConfigAsStrings;
  }

  const searchParams = new URLSearchParams(window.location.search);
  return mergeRight(
    defaultConfigAsStrings,
    reject(isNil)({
      workspaceId: searchParams.get("workspaceId"),
      apiKey: searchParams.get("apiKey"),
      languageCode: searchParams.get("languageCode"),
      scriptId: searchParams.get("scriptId") ?? searchParams.get("journeyId"),
      conversationId: searchParams.get("conversationId"),
      testStepId: searchParams.get("testStepId"),
    }),
  );
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
      <Labeled label="Script ID">
        <input
          placeholder="Enter script ID"
          className={inputClass}
          value={config.scriptId}
          onInput={(ev: any) => {
            props.onChange({ scriptId: ev.target.value });
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
