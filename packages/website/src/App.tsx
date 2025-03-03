import { type FC, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Nav, MobileNav } from "./components/Nav";
import { ContentRoutes } from "./routes";

export const App: FC<unknown> = () => {
  const [mobileMenuExpanded, setMobileMenuExpanded] = useState<boolean>(false);
  const location = useLocation();
  const [touchpoint, setTouchpoint] = useState<boolean>(
    !location.pathname.includes("web-widget"),
  );

  return (
    <div className="flex w-full flex-col text-primary-80">
      <Header
        touchpoint={touchpoint}
        setTouchpoint={setTouchpoint}
        mobileMenuExpanded={mobileMenuExpanded}
        setMobileMenuExpanded={setMobileMenuExpanded}
      />
      {mobileMenuExpanded && (
        <MobileNav
          setMobileMenuExpanded={setMobileMenuExpanded}
          touchpoint={touchpoint}
          setTouchpoint={setTouchpoint}
        />
      )}
      <Hero />
      <div className="relative mx-auto flex w-full max-w-8xl flex-auto justify-center">
        <Nav touchpoint={touchpoint} />
        <div className="min-w-0 max-w-2xl flex-auto px-4 lg:px-8 py-16 lg:max-w-none xl:px-16">
          <article>
            <ContentRoutes />
          </article>
        </div>
      </div>
    </div>
  );
};

export default App;
