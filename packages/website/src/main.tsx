import React, { type FC, useState } from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Nav, MobileNav } from "./components/Nav";
import { ContentRoutes } from "./routes";
import { CodeComponents } from "./components/PageContent";
import { MDXProvider } from "@mdx-js/react";

const App: FC<{}> = () => {
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState<boolean>(false);

  return (
    <>
      <div className="flex w-full flex-col">
        <Header
          mobileMenuExpanded={mobileMenuExpanded}
          setMobileMenuExpanded={setMobileMenuExpanded}
        />
        {mobileMenuExpanded && (
          <MobileNav setMobileMenuExpanded={setMobileMenuExpanded} />
        )}
        <Hero />
        <div className="relative mx-auto flex w-full max-w-8xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
          <Nav />
          <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none lg:pl-8 lg:pr-0 xl:px-16">
            <article>
              <MDXProvider components={CodeComponents}>
                <ContentRoutes />
              </MDXProvider>
            </article>
          </div>
        </div>
      </div>
    </>
  );
};

createRoot(document.getElementById("app") as Element).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
