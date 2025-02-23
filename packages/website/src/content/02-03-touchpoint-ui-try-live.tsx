import { type FC, useState, useEffect } from "react";
import { type Config } from "@nlxai/chat-core";

import { Labeled, inputClass } from "../components/Ui";
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

export const snippetContent = ({
  config,
  theme,
}: {
  config: Config;
  theme: EditableTheme;
}): string => `

### Setup snippet

\`\`\`html
${touchpointUiSetupSnippet({ config, theme })}
\`\`\`
`;

export const navGroup: string = "Touchpoint";

export const title: string = "Try live";

interface EditableTheme {
  fontFamily: string;
  accent: string;
}

const defaultFont = '"Neue Haas Grotesk", sans-serif';

const ThemeEditor: FC<{
  value: EditableTheme;
  onChange: (val: EditableTheme) => void;
}> = (props) => {
  const theme = props.value;
  return (
    <div className="space-y-4">
      <Labeled label="Font">
        <select
          className={inputClass}
          value={theme.fontFamily}
          onChange={(ev: any) => {
            props.onChange({
              ...theme,
              fontFamily: ev.target.value ?? theme.fontFamily,
            });
          }}
        >
          {[
            defaultFont,
            "Helvetica",
            "Arial",
            "Monaco",
            "Georgia",
            "monospace",
          ].map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
      </Labeled>
      <Labeled label="Accent color">
        <input
          type="color"
          value={theme.accent}
          onInput={(ev: any) => {
            props.onChange({ ...theme, accent: ev.target.value });
          }}
        />
      </Labeled>
    </div>
  );
};

export const Content: FC<unknown> = () => {
  const [config, setConfig] = useState<Config>(getInitialConfig());

  const [theme, setTheme] = useState<EditableTheme>({
    fontFamily: defaultFont,
    accent: "#AECAFF",
  });

  useEffect(() => {
    let instance: any;
    // Import has to happen dynamically after mount because the bundle has an issue with server rendering at the moment
    import("@nlxai/touchpoint-ui/lib/index.js")
      .then(({ create }) => {
        instance = create({ config, theme });
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
  }, [config, theme]);

  return (
    <>
      <PageContent md={content} />
      <div className="mt-6 grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl">Setup</h3>
          <Note body="In order for the bot communication to work (i.e., not trigger CORS errors), make sure that the URL of your webpage is added to the whitelisted URL list of your API channel in Dialog Studio." />
          <ConfigEditor
            value={config}
            onChange={(val: any) => {
              setConfig((prev) => ({ ...prev, ...val }));
            }}
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-xl">Theme</h3>
          <ThemeEditor value={theme} onChange={setTheme} />
        </div>
      </div>
      <PageContent
        className="mt-8"
        md={snippetContent({
          config,
          theme,
        })}
      />
    </>
  );
};
