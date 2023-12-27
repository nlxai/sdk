import React, { type ReactNode, type FC } from "react";
import { flatten } from "ramda";
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
import { WebWidgetComponentsDisclaimer } from "./content/03-03-disclaimer";
import { WebWidgetComponentsCarousel } from "./content/03-04-carousel";
import { WebWidgetComponentsFeedbackForm } from "./content/03-05-feedback-form";
import { WebWidgetComponentsDatePicker } from "./content/03-06-datepicker";
// 4
import { CustomWidgetsGettingStarted } from "./content/04-01-custom-widgets-getting-started";
import { CustomWidgetsReact } from "./content/04-02-custom-widgets-react";
import { CustomWidgetsOther } from "./content/04-03-custom-widgets-other";
// 5
import { HeadlessSetup } from "./content/05-01-headless-setup";
import { HeadlessApi } from "./content/05-02-headless-api";
// 6
import { MultimodalSetup } from "./content/06-01-multimodal-setup";
import { MultimodalApiReference } from "./content/06-02-multimodal-api-reference";
import { WebWidgetComponentsFileUpload } from "./content/03-07-file-upload";

export const routes: {
  heading: string;
  items: { label: string; url: string; element: ReactNode }[];
}[] = [
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
      {
        label: "Disclaimer",
        url: "/widget-components-disclaimer",
        element: <WebWidgetComponentsDisclaimer />,
      },
      {
        label: "Carousel",
        url: "/widget-components-carousel",
        element: <WebWidgetComponentsCarousel />,
      },
      {
        label: "Feedback form",
        url: "/widget-components-feedback-form",
        element: <WebWidgetComponentsFeedbackForm />,
      },
      {
        label: "Date picker",
        url: "/widget-components-datepicker",
        element: <WebWidgetComponentsDatePicker />,
      },
      {
        label: "File upload",
        url: "/widget-components/file-upload",
        element: <WebWidgetComponentsFileUpload />,
      },
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
        element: <HeadlessSetup />,
      },
      {
        label: "API reference",
        url: "/headless-api-reference",
        element: <HeadlessApi />,
      },
    ],
  },
  {
    heading: "Voice Compass",
    items: [
      {
        label: "Getting started",
        url: "/voice-compass-setup",
        element: <MultimodalSetup />,
      },
      {
        label: "API reference",
        url: "/voice-compass-api-reference",
        element: <MultimodalApiReference />,
      },
    ],
  },
];

export const ContentRoutes: FC<{}> = () => {
  const flattenedRoutes = flatten(
    routes.map((r) => r.items.map((item) => ({ ...item, heading: r.heading }))),
  );
  return (
    <Routes>
      {flattenedRoutes.map(({ url, element }, index) => {
        const prev = flattenedRoutes[index - 1];
        const next = flattenedRoutes[index + 1];
        return (
          <Route
            path={url.slice(1)}
            element={
              <>
                {element}
                <NextPrevPage
                  prev={
                    prev && {
                      label: `${prev.heading}: ${prev.label}`,
                      url: prev.url,
                    }
                  }
                  next={
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
