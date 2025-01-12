import { type FC, useState } from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import {
  type Config,
  getInitialConfig,
  ConfigEditor,
  type ConfigAsStrings,
} from "../components/VoicePlusConfiguration";
import { voicePlusSetupSnippet, Environment } from "../snippets";

export const content = `
You can generate the setup code for your scripts directly on this configuration page.
`;

export const snippetContent = (config: Config): string => `

### Setup snippet

~~~html
${voicePlusSetupSnippet({ config, environment: Environment.Html })}
~~~
`;

export const VoicePlusTryLive: FC<unknown> = () => {
  const [config, setConfig] = useState<ConfigAsStrings>(getInitialConfig());

  return (
    <>
      <PageTitle pretitle="Voice+" title="Try live" />
      <PageContent md={content} />
      <div className="mt-6 space-y-4">
        <ConfigEditor
          value={config}
          onChange={(val) => {
            setConfig((prev) => ({ ...prev, ...val }));
          }}
        />
        <PageContent md={snippetContent(config)} />
      </div>
    </>
  );
};
