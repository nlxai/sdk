import React, { useState } from "react";
import { PageTitle } from "../components/PageTitle";
import { type Config } from "@nlxai/voice-compass";
import { PageContent } from "../components/PageContent";
import {
  getInitialConfig,
  ConfigEditor,
} from "../components/MultimodalConfiguration";
import { Note } from "../components/Note";
import { voiceCompassSetupSnippet, Environment } from "../snippets";

export const content = `
You can try your journeys directly on this configuration page.
`;

export const snippetContent = ({
  config,
  environment,
}: {
  config: Config;
  environment: Environment;
}) => `

### Setup snippet

\`\`\`html
${voiceCompassSetupSnippet({ config, environment })}
\`\`\`
`;

export const MultimodalTryLive = () => {
  const [config, setConfig] = useState<Config>(getInitialConfig());

  return (
    <>
      <PageTitle pretitle="Voice Compass" title="Try live" />
      <PageContent md={content} />
      <Note
        title="Important"
        body="In order for the journey communication to work (i.e. not trigger CORS errors), make sure that the URL of your webpage is added to the whitelisted URL list of your journey in Dialog Studio."
      />
      <div className="mt-6 space-y-4">
        <ConfigEditor
          value={config}
          onChange={(val) => {
            setConfig((prev) => ({ ...prev, ...val }));
          }}
        />
        <PageContent
          md={snippetContent({
            config,
            environment: Environment.Html,
          })}
        />
      </div>
    </>
  );
};
