import { type FC, Fragment, useEffect } from "react";
import { flatten, groupBy, sortBy } from "ramda";
import { useLocation } from "react-router-dom";

import { Routes, Route } from "react-router-dom";
import { Prototyping } from "./components/Prototyping";
import { PageTitle } from "./components/PageTitle";
import { NextPrevPage } from "./components/NextPrevPage";

interface Page {
  navGroup: string;
  title: string;
  Content: FC<unknown>;
}

const pages: Record<string, Page> = import.meta.glob("./content/*.tsx", {
  eager: true,
});

interface Item {
  label: string;
  url: string;
  element: JSX.Element;
}

interface RouteGroup {
  heading: string;
  items: Item[];
}

const getRoutes = (): RouteGroup[] => {
  const sortedPages = sortBy((entry) => entry[0], Object.entries(pages));
  // TODO: improve types (Object.entries seems to assume that values can be `undefined`)
  const pageEntries: Array<[string, Array<[string, Page]>]> = Object.entries(
    groupBy((entry: [string, Page]) => entry[1].navGroup, sortedPages),
  ) as any;
  return pageEntries.map(([heading, pages]) => {
    return {
      heading,
      items: pages.map(([filePath, page]) => {
        const path = filePath.slice(16, -4);
        return {
          label: page.title,
          url: `/${path}`,
          element: <page.Content />,
        };
      }),
    };
  });
};

export const routes: RouteGroup[] = getRoutes();

export const getFilteredRoutes = ({
  touchpoint,
}: {
  touchpoint: boolean;
}): RouteGroup[] =>
  routes.filter(
    (route) =>
      !(
        !touchpoint &&
        (route.heading === "Touchpoint" ||
          route.heading === "Touchpoint components")
      ) &&
      !(
        touchpoint &&
        (route.heading === "Web widget" ||
          route.heading === "Web widget components")
      ),
  );

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
  const location = useLocation();

  // Scroll down to hash route if available
  useEffect(() => {
    setTimeout(() => {
      const node = document.querySelector(location.hash);
      if (node != null) {
        node.scrollIntoView({ behavior: "smooth" });
      }
    });
  }, [location.hash]);

  return (
    <Routes>
      {flattenedRoutes.map(({ url, heading, label, element }, index) => {
        const prev: RouteInfo | undefined = flattenedRoutes[index - 1];
        const next: RouteInfo | undefined = flattenedRoutes[index + 1];
        const elementWithPageNav = (
          <>
            <PageTitle pretitle={heading} title={label} />
            {element}
            <NextPrevPage
              prev={
                prev != null
                  ? {
                      label: `${prev.heading}: ${prev.label}`,
                      url: prev.url,
                    }
                  : undefined
              }
              next={
                next != null
                  ? {
                      label: `${next.heading}: ${next.label}`,
                      url: next.url,
                    }
                  : undefined
              }
            />
          </>
        );
        return (
          <Fragment key={index}>
            {index === 0 ? (
              <Route element={elementWithPageNav} path={"/"} />
            ) : null}
            <Route path={url.slice(1)} element={elementWithPageNav} />
          </Fragment>
        );
      })}
      <Route path="*" element={<p>Not found</p>} />
      {import.meta.env.DEV ? (
        <Route path="/dev" element={<Prototyping />} />
      ) : null}
    </Routes>
  );
};
