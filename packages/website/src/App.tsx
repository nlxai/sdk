import { type FC, useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Nav, MobileNav } from "./components/Nav";
import { ContentRoutes } from "./routes";
import { Touchpoint } from "./components/Touchpoint"; 
import { TouchpointProvider } from "./contexts/TouchpointContext"; // Import the provider


export const App: FC<unknown> = () => {
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState<boolean>(false);

  return (
    <TouchpointProvider>
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
      <Touchpoint />
    </div>
    </TouchpointProvider>
  );
};

export default App;
