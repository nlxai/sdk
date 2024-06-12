import { type FC, useState, useEffect, useRef } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Nav, MobileNav } from "./components/Nav";
import { ContentRoutes } from "./routes";
import { run } from "@nlxai/journey-manager";

export const App: FC<unknown> = () => {
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState<boolean>(false);

  const isRun = useRef(false);

  useEffect(() => {
    if (isRun.current) {
      return;
    }
    isRun.current = true;
    run({
      config: {
        apiKey: "",
        journeyId: "",
        workspaceId: "",
        conversationId: "abcd",
        languageCode: "en-US",
      },
      ui: {
        title: "abcd",
        subtitle: "abcd",
        escalationStep: "abcd-1234",
        endStep: "1234-1234",
      },
      triggers: {},
    });
  }, []);

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
              <ContentRoutes />
            </article>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
