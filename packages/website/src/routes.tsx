import { type FC } from "react";
import { flatten, groupBy, sortBy, uniq } from "ramda";
import { Routes, Route } from "react-router-dom";
import { Prototyping } from "./components/Prototyping";
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
  disabled?: boolean;
  items: Item[];
}

const getRoutes = (): RouteGroup[] => {
  const sortedPages = sortBy((entry) => entry[0], Object.entries(pages));
  // TODO: improve types (Object.entries seems to assume that values can be `undefined`)
  const pageEntries: [string, [string, Page][]][] = Object.entries(
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

interface RouteInfo {
  heading: string;
  label: string;
  url: string;
  element: JSX.Element;
}

const flattenedRoutes: RouteInfo[] = flatten(
  routes.map((r) =>
    r.disabled ? [] : r.items.map((item) => ({ ...item, heading: r.heading })),
  ),
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
            }
            key={index}
          />
        );
      })}
      <Route path="*" element={<p>Not found</p>} />
      {import.meta.env.DEV ? (
        <Route path="/dev" element={<Prototyping />} />
      ) : null}
    </Routes>
  );
};
