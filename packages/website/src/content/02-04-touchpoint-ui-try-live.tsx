import { type FC, useState, useEffect, useRef, type ReactNode } from "react";
import { type Config, isConfigValid } from "@nlxai/chat-core";

import { TouchpointIcon } from "../components/Icons";
import { Toggle } from "../components/Toggle";
import { Labeled, inputClass } from "../components/Ui";
import { PageContent } from "../components/PageContent";
import {
  ConfigEditor,
  getInitialConfig,
} from "../components/ChatConfiguration";
import { Note } from "../components/Note";
import { touchpointUiSetupSnippet } from "../snippets";
import { clsx } from "clsx";

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

const FullscreenButton: FC<{
  onClick?: () => void;
  icon?: ReactNode;
  label: string;
}> = (props) => {
  return (
    <button
      className={clsx(
        "w-full flex items-center justify-center gap-2 py-3 bg-accent text-base rounded-2xl",
        "bg-accent text-secondary-80 enabled:hover:bg-accent-20 enabled:hover:text-accent",
        "disabled:bg-secondary-10 disabled:text-primary-20",
      )}
      disabled={props.onClick == null}
      onClick={props.onClick}
    >
      {props.icon != null ? (
        <span className="w-6 h-6 block flex-none">{props.icon}</span>
      ) : null}
      {props.label}
    </button>
  );
};

export const Content: FC<unknown> = () => {
  const [config, setConfig] = useState<Config>(getInitialConfig());

  const [theme, setTheme] = useState<EditableTheme>({
    fontFamily: defaultFont,
    accent: "#AECAFF",
  });

  const [colorMode, setColorMode] = useState<"light" | "dark">("dark");

  const touchpointInstance = useRef<any>();

  useEffect(() => {
    // Import has to happen dynamically after mount because the bundle has an issue with server rendering at the moment
    import("@nlxai/touchpoint-ui/lib/index.js")
      .then(async ({ create }) => {
        touchpointInstance.current = await create({
          config,
          theme,
          colorMode,
          launchIcon: false,
        });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.warn(err);
      });
    return () => {
      if (touchpointInstance.current != null) {
        touchpointInstance.current.teardown();
      }
    };
  }, [config, theme, colorMode]);

  return (
    <>
      <PageContent md={content} />
      <div className="space-y-6">
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

            <Labeled label="Color mode">
              <Toggle
                value={colorMode}
                onChange={setColorMode}
                options={[
                  { value: "dark", label: "Dark mode" },
                  { value: "light", label: "Light mode" },
                ]}
              />
            </Labeled>
          </div>
        </div>
        <FullscreenButton
          onClick={
            isConfigValid(config)
              ? () => {
                  const instance = touchpointInstance.current;
                  if (instance != null) {
                    instance.expanded = true;
                  }
                }
              : undefined
          }
          icon={<TouchpointIcon />}
          label="Try live"
        />
      </div>
      <PageContent
        md={snippetContent({
          config,
          theme,
        })}
      />
    </>
  );
};
