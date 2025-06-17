import { type FC, useState, useEffect, useRef, type ReactNode } from "react";
import { type Config, isConfigValid } from "@nlxai/chat-core";
import {
  MuseumExhibitCarousel,
  MuseumExhibitDetails,
  MuseumKBCitationsNoButton,
} from "../components/exampleComponents/kbHTMLcomponents";
import { TouchpointIcon } from "../components/Icons";
import { Toggle } from "../components/Toggle";
import { Labeled, inputClass } from "../components/Ui";
import { PageContent } from "../components/PageContent";
import {
  ConfigEditor,
  getInitialConfig,
} from "../components/ChatConfiguration";
import { Note } from "../components/Note";
import { kbTouchpointDemo } from "../snippets";
import { clsx } from "clsx";

export const navGroup: string = "Custom Components";

export const title: string = "Museum Exhibits Demo";

export const content = `Touchpoint can be extended with Custom Components to provide a more tailored experience for your users. This allows you to create a unique and engaging interface that meets the specific needs of your application.

This example demonstrates using Touchpoint to render Museum Exhibit selection carousel, additional information info card, and show Knowledge Base cited sources.`;

export const snippetContent = ({ config }: { config: Config }): string => `

### Setup snippet

\`\`\`html
${kbTouchpointDemo({ config })}
\`\`\`
`;

interface EditableTheme {
  fontFamily: string;
  accent: string;
}

const defaultFont = '"Neue Haas Grotesk", sans-serif';

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

  const [input, setInput] = useState<any>("text");

  const [colorMode, setColorMode] = useState<"light" | "dark">("dark");

  const touchpointInstance = useRef<any>();

  const generateAndSetUserId = (config: Config): Config => {
    const isUserIdEmpty = config.userId === undefined || config.userId === "";
    return isUserIdEmpty
      ? { ...config, userId: "TemporaryUserId_" + crypto.randomUUID() }
      : config;
  };

  useEffect(() => {
    if (!isConfigValid(config)) {
      return;
    }

    const initializeTouchpoint = async () => {
      try {
        const { Icons, html, create, React, BaseText, TextButton, SmallText } =
          await import("@nlxai/touchpoint-ui/lib/index.js");

        const MuseumExhibitCarousel = ({ data, conversationHandler }) => {
          const [selected, setSelected] = React.useState(null);

          return html`
            <Carousel>
              ${data.map(
                (exhibit, index) =>
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
                      right=${html`<BaseText>${exhibit.name}</BaseText>`}
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
        };

        const MuseumExhibitDetails = ({ data, conversationHandler }) => {
          console.log("MuseumExhibitDetails data", data);
          // put other imagees into a carousel
          const detailedUrls = data.detailImageUrls;
          return html`
            <Carousel>
              <CustomCard>
                <CustomCardImageRow src=${data.imageUrl} alt=${data.name} />
              </CustomCard>
              ${detailedUrls.map(
                (imageUrl) =>
                  html` <CustomCard>
                    <CustomCardImageRow src=${imageUrl} alt=${data.name} />
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
        };

        const touchpointConfig = generateAndSetUserId(config);
        touchpointInstance.current = await create({
          config: touchpointConfig,
          theme,
          colorMode,
          input,
          launchIcon: false,
          customModalities: {
            MuseumExhibitDetails: MuseumExhibitDetails,
            MuseumExhibitCarousel: MuseumExhibitCarousel,
          },
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn(err);
      }
    };

    initializeTouchpoint();

    return () => {
      if (touchpointInstance.current != null) {
        touchpointInstance.current.teardown();
      }
    };
  }, [config, theme, colorMode, input]);

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
        })}
      />
    </>
  );
};
