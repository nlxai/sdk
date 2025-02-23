import { type FC, useState, useEffect, useRef } from "react";
import { type Config } from "@nlxai/chat-core";
import {
  Widget,
  type Theme,
  type TitleBar,
  defaultTheme,
} from "@nlxai/chat-widget";
import { omit } from "ramda";

import { PageContent } from "../components/PageContent";
import {
  ThemeEditor,
  TitleBarEditor,
  ConfigEditor,
  getInitialConfig,
  saveTheme,
  saveTitleBar,
  retrieveTitleBar,
  retrieveTheme,
} from "../components/ChatConfiguration";
import { Note } from "../components/Note";
import { setupSnippet, Behavior } from "../snippets";

export const content = `
You can try your bots directly on this configuration widget.
`;

export const snippetContent = ({
  config,
  titleBar,
  theme,
  behavior,
}: {
  config: Config;
  titleBar: TitleBar;
  theme: Partial<Theme>;
  behavior: Behavior;
}): string => `

### Setup snippet

\`\`\`html
${setupSnippet({ config, titleBar, theme, behavior })}
\`\`\`
`;

export const navGroup: string = "Web widget";

export const title: string = "Try live";

export const Content: FC<unknown> = () => {
  const [config, setConfig] = useState<Config>(getInitialConfig());

  const [theme, setTheme] = useState<Partial<Theme>>(
    retrieveTheme() ?? defaultTheme,
  );

  useEffect(() => {
    saveTheme(theme);
  }, [theme]);

  const [titleBar, setTitleBar] = useState<TitleBar>(
    retrieveTitleBar() ?? {
      title: "Support",
      withCollapseButton: true,
      withCloseButton: true,
    },
  );

  useEffect(() => {
    saveTitleBar(titleBar);
  }, [titleBar]);

  const welcomeIntentSent = useRef<boolean>(false);

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
          <ThemeEditor
            value={theme}
            onChange={(val: any) => {
              setTheme((prev) => ({ ...prev, ...val }));
            }}
          />
          <TitleBarEditor
            value={titleBar}
            onChange={(val: any) => {
              setTitleBar((prev) => {
                const titleBar = { ...prev, ...val };
                if (titleBar.logo?.length === 0)
                  return omit(["logo"], titleBar);
                else return titleBar;
              });
            }}
          />
        </div>
      </div>
      <PageContent
        className="mt-8"
        md={snippetContent({
          config,
          theme,
          titleBar,
          behavior: Behavior.WelcomeIntentOnOpen,
        })}
      />
      <Widget
        config={config}
        theme={theme}
        titleBar={titleBar}
        onExpand={(handler) => {
          if (config.botUrl !== "" && !welcomeIntentSent.current) {
            handler.sendWelcomeIntent();
            welcomeIntentSent.current = true;
          }
        }}
      />
    </>
  );
};
