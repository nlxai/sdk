import { type FC, useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { PageTitle } from "../components/PageTitle";
import { type Config } from "@nlxai/chat-core";
import {
  Widget,
  type Theme,
  type TitleBar,
  defaultTheme,
} from "@nlxai/chat-widget";
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
import { omit } from "ramda";

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

export const WebWidgetTryLive: FC<unknown> = () => {
  const [config, setConfig] = useState<Config>(getInitialConfig());

  const [searchParams] = useSearchParams();

  const isTouchpoint = searchParams.get("touchpoint") === "true";

  useEffect(() => {
    if (!isTouchpoint) {
      return;
    }
    import("@nlxai/touchpoint-ui/lib/index.js")
      .then(({ create }) => {
        create({ config });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.warn(err);
      });
  }, [isTouchpoint, config]);

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
      <PageTitle pretitle="Web widget" title="Try live" />
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
              if (titleBar.logo?.length === 0) return omit(["logo"], titleBar);
              else return titleBar;
            });
          }}
        />
        <PageContent
          md={snippetContent({
            config,
            theme,
            titleBar,
            behavior: Behavior.WelcomeIntentOnOpen,
          })}
        />
      </div>
      {isTouchpoint ? null : (
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
      )}
    </>
  );
};
