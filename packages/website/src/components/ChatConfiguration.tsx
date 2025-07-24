import { type FC } from "react";
import { type PartialDeep } from "type-fest";
import { type Config } from "../../../core/lib";
import { Labeled, inputClass } from "./Ui";

function defaultInitialConfig({
  applicationUrl,
  apiKey,
  languageCode,
}: {
  applicationUrl?: string | null;
  apiKey?: string | null;
  languageCode?: string | null;
} = {}): Config {
  return {
    applicationUrl: applicationUrl ?? "",
    headers: {
      "nlx-api-key": apiKey ?? "",
    },
    languageCode: languageCode ?? "en-US",
  };
}

export const getInitialConfig = (): Config => {
  // for static rendering
  if (typeof window === "undefined") {
    return defaultInitialConfig();
  }
  const searchParams = new URLSearchParams(window.location.search);
  return defaultInitialConfig({
    applicationUrl:
      searchParams.get("applicationUrl") ?? searchParams.get("botUrl"),
    apiKey: searchParams.get("apiKey"),
    languageCode: searchParams.get("languageCode"),
  });
};

export const ConfigEditor: FC<{
  value: Config;
  onChange: (val: PartialDeep<Config>) => void;
}> = (props) => {
  const config = props.value;
  return (
    <div className="space-y-4">
      <Labeled label="Application URL">
        <input
          type="url"
          placeholder="Enter application URL"
          className={inputClass}
          value={config.applicationUrl}
          onInput={(ev: any) => {
            props.onChange({ applicationUrl: ev.target.value });
          }}
        />
      </Labeled>
      <Labeled label="API key">
        <input
          type="text"
          placeholder="Enter API key"
          className={inputClass}
          value={config.headers?.["nlx-api-key"]}
          onInput={(ev: any) => {
            props.onChange({ headers: { "nlx-api-key": ev.target.value } });
          }}
        />
      </Labeled>
      <Labeled label="User ID">
        <input
          type="text"
          placeholder="Enter user ID"
          className={inputClass}
          value={config.userId ?? ""}
          onInput={(ev: any) => {
            props.onChange({
              userId: ev.target.value === "" ? undefined : ev.target.value,
            });
          }}
        />
      </Labeled>
      <Labeled label="Language code">
        <input
          type="text"
          placeholder="Enter language code"
          className={inputClass}
          value={config.languageCode}
          onInput={(ev: any) => {
            props.onChange({ languageCode: ev.target.value });
          }}
        />
      </Labeled>
    </div>
  );
};
