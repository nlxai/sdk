import { type FC, useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Nav, MobileNav } from "./components/Nav";
import { ContentRoutes } from "./routes";
import { ReactContext } from "./context";
import { type SnippetEnv } from "./types";

export const App: FC<unknown> = () => {
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState<boolean>(false);
  const [snippetEnv, setSnippetEnv] = useState<SnippetEnv>("html");

  return (
    <ReactContext.Provider value={{ snippetEnv, setSnippetEnv }}>
      <div className="flex w-full flex-col text-primary-80">
        <Header
          mobileMenuExpanded={mobileMenuExpanded}
          setMobileMenuExpanded={setMobileMenuExpanded}
        />
        {mobileMenuExpanded && (
          <MobileNav setMobileMenuExpanded={setMobileMenuExpanded} />
        )}
        <Hero />
        <div className="relative mx-auto flex w-full max-w-8xl flex-auto justify-center">
          <Nav />
          <div className="min-w-0 max-w-2xl flex-auto px-4 lg:px-8 py-16 lg:max-w-none xl:px-16">
            <article>
              <ContentRoutes />
            </article>
          </div>
        </div>
      </div>
    </ReactContext.Provider>
  );
};

export default App;
