import { type FC } from "react";
import { aperture, flatten } from "ramda";
import { Routes, Route } from "react-router-dom";
import { NextPrevPage } from "./components/NextPrevPage";
// 1
import { GettingStarted } from "./content/01-01-getting-started";
import { Installation } from "./content/01-02-installation";
// 2
import { WebWidgetSetup } from "./content/02-01-web-widget-setup";
import { WebWidgetTheming } from "./content/02-02-web-widget-theming";
import { WebWidgetCustomBehaviors } from "./content/02-03-web-widget-custom-behaviors";
import { WebWidgetTryLive } from "./content/02-04-web-widget-try-live";
// 3
import { WebWidgetComponentsGettingStarted } from "./content/03-01-web-widget-components-getting-started";
import { WebWidgetComponentsAddressInput } from "./content/03-02-address-input";
import { WebWidgetComponentsDisclaimer } from "./content/03-03-disclaimer";
import { WebWidgetComponentsCarousel } from "./content/03-04-carousel";
import { WebWidgetComponentsDatePicker } from "./content/03-05-datepicker";
import { WebWidgetComponentsFeedbackForm } from "./content/03-06-feedback-form";
import { WebWidgetComponentsFileUpload } from "./content/03-07-file-upload";
import { WebWidgetComponentsVideoPlayer } from "./content/03-08-video-player";
import { WebWidgetComponentsSecureInput } from "./content/03-09-secure-input";
// 4
import { CustomWidgetsGettingStarted } from "./content/04-01-custom-widgets-getting-started";
import { CustomWidgetsReact } from "./content/04-02-custom-widgets-react";
import { ReactApi } from "./content/04-03-react-api-reference";
import { PreactApi } from "./content/04-04-preact-api-reference";
import { CustomWidgetsOther } from "./content/04-05-custom-widgets-other";
// 5
import { HeadlessGettingStarted } from "./content/05-01-headless-getting-started";
import { HeadlessApi } from "./content/05-02-headless-api-reference";
// 6
import { MultimodalGettingStarted } from "./content/06-01-multimodal-getting-started";
import { MultimodalUsage } from "./content/06-02-multimodal-usage";
import { MultimodalApiReference } from "./content/06-03-multimodal-api-reference";
import { MultimodalTryLive } from "./content/06-04-multimodal-try-live";

interface Item {
  label: string;
  url: string;
  element: JSX.Element;
}

function throwIfUnsorted(items: Item[]): Item[] {
  aperture(2, items).forEach(([a, b]) => {
    if (a.label.localeCompare(b.label) > 0) {
      throw new Error("Items are not sorted by label");
    }
  });

  return items;
}

export const routes: Array<{
  heading: string;
  items: Item[];
}> = [
  {
    heading: "Introduction",
    items: [
      {
        label: "Getting started",
        url: "/getting-started",
        element: <GettingStarted />,
      },
      {
        label: "Installation",
        url: "/installation",
        element: <Installation />,
      },
    ],
  },
  {
    heading: "Web widget",
    items: [
      { label: "Setup", url: "/widget-setup", element: <WebWidgetSetup /> },
      {
        label: "Theming",
        url: "/widget-theming",
        element: <WebWidgetTheming />,
      },
      {
        label: "Custom behaviors",
        url: "/widget-custom-behaviors",
        element: <WebWidgetCustomBehaviors />,
      },
      {
        label: "Try live",
        url: "/widget-try-live",
        element: <WebWidgetTryLive />,
      },
    ],
  },
  {
    heading: "Web widget components",
    items: [
      {
        label: "Getting started",
        url: "/widget-components-getting-started",
        element: <WebWidgetComponentsGettingStarted />,
      },
      ...throwIfUnsorted([
        {
          label: "Address input",
          url: "/widget-components-address-input",
          element: <WebWidgetComponentsAddressInput />,
        },
        {
          label: "Carousel",
          url: "/widget-components-carousel",
          element: <WebWidgetComponentsCarousel />,
        },
        {
          label: "Date picker",
          url: "/widget-components-datepicker",
          element: <WebWidgetComponentsDatePicker />,
        },
        {
          label: "Disclaimer",
          url: "/widget-components-disclaimer",
          element: <WebWidgetComponentsDisclaimer />,
        },
        {
          label: "Feedback form",
          url: "/widget-components-feedback-form",
          element: <WebWidgetComponentsFeedbackForm />,
        },
        {
          label: "File upload",
          url: "/widget-components-file-upload",
          element: <WebWidgetComponentsFileUpload />,
        },
        {
          label: "Secure input",
          url: "/widget-components-secure-input",
          element: <WebWidgetComponentsSecureInput />,
        },
        {
          label: "Video player",
          url: "/widget-components-video-player",
          element: <WebWidgetComponentsVideoPlayer />,
        },
      ]),
    ],
  },
  {
    heading: "Building your own widget",
    items: [
      {
        label: "Getting started",
        url: "/custom-widget-getting-started",
        element: <CustomWidgetsGettingStarted />,
      },
      {
        label: "React & Preact",
        url: "/custom-widget-react-preact",
        element: <CustomWidgetsReact />,
      },
      {
        label: "React API Reference",
        url: "/react-api-reference",
        element: <ReactApi />,
      },
      {
        label: "Preact API Reference",
        url: "/preact-api-reference",
        element: <PreactApi />,
      },
      {
        label: "Other frameworks",
        url: "/custom-widget-other-frameworks",
        element: <CustomWidgetsOther />,
      },
    ],
  },
  {
    heading: "Headless API",
    items: [
      {
        label: "Getting started",
        url: "/headless-getting-started",
        element: <HeadlessGettingStarted />,
      },
      {
        label: "API reference",
        url: "/headless-api-reference",
        element: <HeadlessApi />,
      },
    ],
  },
  {
    heading: "Multimodal",
    items: [
      {
        label: "Getting started",
        url: "/multimodal-getting-started",
        element: <MultimodalGettingStarted />,
      },
      {
        label: "Usage",
        url: "/multimodal-usage",
        element: <MultimodalUsage />,
      },
      {
        label: "API reference",
        url: "/multimodal-api-reference",
        element: <MultimodalApiReference />,
      },
      {
        label: "Try live",
        url: "/multimodal-try-live",
        element: <MultimodalTryLive />,
      },
    ],
  },
];

interface RouteInfo {
  heading: string;
  label: string;
  url: string;
  element: JSX.Element;
}

const flattenedRoutes: RouteInfo[] = flatten(
  routes.map((r) => r.items.map((item) => ({ ...item, heading: r.heading }))),
);

export const urls: string[] = flattenedRoutes.map(({ url }) => url);

export const ContentRoutes: FC<unknown> = () => {
  return (
    <Routes>
      {flattenedRoutes.map(({ url, element }, index) => {
        const prev: RouteInfo | undefined = flattenedRoutes[index - 1];
        const next: RouteInfo | undefined = flattenedRoutes[index + 1];
        return (
          <Route
            path={url.slice(1)}
            element={
              <>
                {element}
                <NextPrevPage
                  prev={
                    // initial eslint integration
                    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                    prev && {
                      label: `${prev.heading}: ${prev.label}`,
                      url: prev.url,
                    }
                  }
                  next={
                    // initial eslint integration
                    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                    next && {
                      label: `${next.heading}: ${next.label}`,
                      url: next.url,
                    }
                  }
                />
              </>
            }
            key={index}
          />
        );
      })}
      <Route path="*" element={<GettingStarted />} />
    </Routes>
  );
};
