import { type FC, useState, useEffect } from "react";
import { type Config } from "@nlxai/chat-core";

import { PageContent } from "../components/PageContent";
import {
  ConfigEditor,
  getInitialConfig,
} from "../components/ChatConfiguration";
import { Note } from "../components/Note";
import { touchpointUiSetupSnippet } from "../snippets";

export const content = `
You can try your bots directly on this configuration widget.
`;

export const snippetContent = ({ config }: { config: Config }): string => `

### Setup snippet

\`\`\`html
${touchpointUiSetupSnippet({ config })}
\`\`\`
`;

export const navGroup: string = "Touchpoint";

export const title: string = "Try live";

export const Content: FC<unknown> = () => {
  const [config, setConfig] = useState<Config>(getInitialConfig());

  useEffect(() => {
    let instance: any;
    // Import has to happen dynamically after mount because the bundle has an issue with server rendering at the moment
    import("@nlxai/touchpoint-ui/lib/index.js")
      .then(({ create }) => {
        instance = create({ config });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.warn(err);
      });
    return () => {
      if (instance != null) {
        instance.teardown();
      }
    };
  }, [config]);

  return (
    <>
      <PageContent md={content} />
      <Note
        title="Important"
        body="In order for the bot communication to work (i.e., not trigger CORS errors), make sure that the URL of your webpage is added to the whitelisted URL list of your API channel in Dialog Studio."
      />
      <div className="mt-6 space-y-4">
        <ConfigEditor
          value={config}
          onChange={(val: any) => {
            setConfig((prev) => ({ ...prev, ...val }));
          }}
        />
        <PageContent
          md={snippetContent({
            config,
          })}
        />
      </div>
    </>
  );
};
