import { type FC, useRef, type ReactNode } from "react";
import { type Config, isConfigValid } from "@nlxai/chat-core";
import { useDebouncedEffect } from "@react-hookz/web";
import { TouchpointIcon } from "../components/Icons";
import { Toggle } from "../components/Toggle";
import { Labeled, inputClass } from "../components/Ui";
import { PageContent } from "../components/PageContent";
import {
  ConfigEditor,
  getInitialConfig,
} from "../components/ChatConfiguration";
import { Note } from "../components/Note";
import { touchpointUiSetupSnippet, museumComponentDemo } from "../snippets";
import { clsx } from "clsx";
import useUrlState from "../useUrlState";

export const content = `
Touchpoint-UI provides a customizable chat interface that you can embed in your web applications. Touchpoint UI allows users to interact with your application and provides a seamless conversational experience.

You can try your applications directly on this configuration page. Then you can copy the code snippet to your HTML file.
`;

export const snippetContent = ({
  config,
  theme,
  input,
  colorMode,
  museumComponentsMode,
}: {
  config: Config;
  theme: EditableTheme;
  input: string;
  colorMode: "light" | "dark";
  museumComponentsMode: string;
}): string => {
  if (museumComponentsMode === "museumComponents") {
    return `

### Museum Components Demo

\`\`\`touchpointui
${museumComponentDemo({ config })}
\`\`\`
`;
  }

  return `

### Setup snippet

\`\`\`touchpointui
${touchpointUiSetupSnippet({ config, theme, input, colorMode })}
\`\`\`
`;
};

export const navGroup: string = "Touchpoint Setup";

export const title: string = "Quick Start";

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
  const [config, setConfig] = useUrlState<Config>("config", getInitialConfig());

  const [theme, setTheme] = useUrlState<EditableTheme>("theme", {
    fontFamily: defaultFont,
    accent: "#AECAFF",
  });

  const [input, setInput] = useUrlState<any>("input", "text");
  const [museumComponentMode, setMuseumComponentMode] = useUrlState<
    "noComponents" | "museumComponents"
  >("museumComponentMode", "noComponents");

  const [colorMode, setColorMode] = useUrlState<"light" | "dark">(
    "color-mode",
    "dark",
  );

  const touchpointInstance = useRef<any>();

  const generateAndSetUserId = (config: Config): Config => {
    const isUserIdEmpty = config.userId == null || config.userId === "";
    return isUserIdEmpty
      ? { ...config, userId: "TemporaryUserId_" + crypto.randomUUID() }
      : config;
  };

  useDebouncedEffect(() => {
    if (!isConfigValid(config)) {
      return;
    }

    // Import has to happen dynamically after mount because the bundle has an issue with server rendering at the moment
    import("@nlxai/touchpoint-ui/lib/index.js")
      .then(async (touchpointModule) => {
        const { create, React, html } = touchpointModule;
        const touchpointConfig = generateAndSetUserId(config);

        // Define KB components when museumComponentMode is "museumComponents"
        const customModalities =
          museumComponentMode === "museumComponents"
            ? {
                MuseumExhibitCarousel: ({
                  data,
                  conversationHandler,
                }: any): any => {
                  const [selected, setSelected] = React.useState<number | null>(
                    null,
                  );

                  return html`
                    <Carousel>
                      ${data.map(
                        (exhibit: any, index: number) =>
                          html` <CustomCard
                            key=${index}
                            selected=${selected === index}
                            onClick=${() => {
                              setSelected(index);
                              conversationHandler.sendChoice(exhibit.id);
                            }}
                          >
                            <CustomCardImageRow
                              src=${exhibit.imageUrl}
                              alt=${exhibit.name}
                            />
                            <CustomCardRow
                              left=${html`<BaseText faded><div /></BaseText>`}
                              right=${html`<BaseText
                                >${exhibit.name}</BaseText
                              >`}
                            />
                            <CustomCardRow
                              left=${html`<BaseText faded>Dates:</BaseText>`}
                              right=${html`<BaseText
                                >Through ${exhibit.endDate}</BaseText
                              >`}
                            />
                          </CustomCard>`,
                      )}
                    </Carousel>
                  `;
                },
                MuseumExhibitDetails: ({ data }: any): any => {
                  const detailedUrls = data.detailImageUrls;
                  return html`
                    <Carousel>
                      <CustomCard>
                        <CustomCardImageRow
                          src=${data.imageUrl}
                          alt=${data.name}
                        />
                      </CustomCard>
                      ${detailedUrls.map(
                        (imageUrl: string) =>
                          html` <CustomCard>
                            <CustomCardImageRow
                              src=${imageUrl}
                              alt=${data.name}
                            />
                          </CustomCard>`,
                      )}
                    </Carousel>
                    <BaseText faded>Dates</BaseText>
                    <BaseText>Through ${data.endDate}</BaseText>

                    <BaseText faded>Location</BaseText>
                    <BaseText>${data.galleryLocation}</BaseText>

                    <BaseText faded>About this exhibition</BaseText>
                    <BaseText>${data.summary}</BaseText>
                  `;
                },
              }
            : undefined;

        touchpointInstance.current = await create({
          config: touchpointConfig,
          theme,
          colorMode,
          input,
          launchIcon: false,
          ...(customModalities && { customModalities }),
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
  }, [config, theme, colorMode, input, museumComponentMode]);

  return (
    <>
      <PageContent md={content} />
      <div className="space-y-6">
        <div className="mt-6 grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl">Setup</h3>
            <Note body="In order for the application communication to work with NLX (i.e., not trigger CORS errors), make sure that the URL of your webpage is added to the whitelisted URL list of your API channel in Dialog Studio." />
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
                className="w-full"
                value={colorMode}
                onChange={setColorMode}
                options={[
                  { value: "dark", label: "Dark mode" },
                  { value: "light", label: "Light mode" },
                ]}
              />
            </Labeled>
            <Labeled label="Input">
              <Toggle
                className="w-full"
                value={input}
                onChange={setInput}
                options={[
                  { value: "text", label: "Text" },
                  { value: "voice", label: "Voice" },
                  { value: "voiceMini", label: "Voice mini" },
                ]}
              />
            </Labeled>
            <Labeled label="Museum Demo Components">
              <Toggle
                className="w-full"
                value={museumComponentMode}
                onChange={setMuseumComponentMode}
                options={[
                  { value: "noComponents", label: "No Components" },
                  {
                    value: "museumComponents",
                    label: "Show Components",
                  },
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
          input,
          colorMode,
          museumComponentsMode: museumComponentMode,
        })}
      />
    </>
  );
};
