import { type FC } from "react";
import { createPortal } from "react-dom";
import { useLocation, Link } from "react-router-dom";
import { getFilteredRoutes } from "../routes";
import { Logo } from "./Logo";
import { Toggle } from "./Toggle";

const MenuListItem: FC<{
  heading: string;
  items: Array<{ label: string; url: string }>;
}> = (props) => {
  const location = useLocation();
  const pathname =
    location.pathname === "/" ? "/getting-started" : location.pathname;
  return (
    <li>
      <h2 className="font-display font-medium text-slate-700">
        {props.heading}
      </h2>
      <ul
        role="list"
        className="mt-2 space-y-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200"
      >
        {props.items.map((item, index) => {
          const active = pathname === item.url;
          return (
            <li className="relative" key={index}>
              <Link
                className={`block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full ${
                  active
                    ? "font-medium text-blueMain before:bg-blueMain"
                    : "text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block"
                }`}
                to={item.url}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export const Nav: FC<{
  touchpoint: boolean;
}> = ({ touchpoint }) => (
  <div className="hidden lg:relative lg:block lg:flex-none">
    <div className="absolute inset-y-0 right-0 w-[50vw] bg-gray-50"></div>
    <div className="absolute bottom-0 right-0 top-16 hidden h-12 w-px bg-gradient-to-t from-slate-800"></div>
    <div className="absolute bottom-0 right-0 top-28 hidden w-px bg-slate-800"></div>
    <div className="sticky top-[4.75rem] -ml-0.5 h-[calc(100vh-4.75rem)] w-64 overflow-y-auto overflow-x-hidden py-16 pl-0.5 pr-8 xl:w-72 xl:pr-16">
      <nav className="text-base lg:text-sm">
        <ul role="list" className="space-y-9">
          {getFilteredRoutes({ touchpoint }).map((route, index) => (
            <MenuListItem
              key={index}
              heading={route.heading}
              items={route.items}
            />
          ))}
        </ul>
      </nav>
    </div>
  </div>
);

export const MobileNav: FC<{
  touchpoint: boolean;
  setTouchpoint: (val: boolean) => void;
  setMobileMenuExpanded: (val: boolean) => void;
}> = (props) => {
  const location = useLocation();
  const pathname =
    location.pathname === "/" ? "/getting-started" : location.pathname;
  return createPortal(
    <div>
      <div>
        <div
          className="fixed inset-0 z-50 flex items-start overflow-y-auto bg-slate-900/50 pr-10 backdrop-blur lg:hidden"
          aria-label="Navigation"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="min-h-full w-full max-w-xs bg-white px-4 pb-12 pt-5 sm:px-6"
            data-headlessui-state="open"
          >
            <div className="flex items-center">
              <button
                type="button"
                aria-label="Close navigation"
                tabIndex={0}
                onClick={() => {
                  props.setMobileMenuExpanded(false);
                }}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="h-6 w-6 stroke-slate-500"
                >
                  <path d="M5 5l14 14M19 5l-14 14"></path>
                </svg>
              </button>
              <a className="ml-6" aria-label="Home page" href="/">
                <Logo size={32} />
              </a>
            </div>
            <Toggle
              className="mt-4"
              value={props.touchpoint}
              options={[
                { value: true, label: "Touchpoint (beta)" },
                { value: false, label: "Chat Widget" },
              ]}
              onChange={(val) => {
                props.setTouchpoint(val);
              }}
            />
            <nav className="text-base lg:text-sm mt-5 px-1">
              <ul role="list" className="space-y-9">
                {getFilteredRoutes({ touchpoint: props.touchpoint }).map(
                  (route, routeIndex) => (
                    <li key={routeIndex}>
                      <h2 className="font-display font-medium text-slate-900 ">
                        {route.heading}
                      </h2>
                      <ul
                        role="list"
                        className="mt-2 space-y-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200"
                      >
                        {route.items.map((item, itemIndex) => {
                          const active = pathname === item.url;
                          return (
                            <li className="relative" key={itemIndex}>
                              <Link
                                className={`block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full ${
                                  active
                                    ? "font-medium text-blueMain before:bg-blueMain"
                                    : "text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block"
                                }`}
                                to={item.url}
                                onClick={() => {
                                  props.setMobileMenuExpanded(false);
                                }}
                              >
                                {item.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  ),
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>,
    // initial eslint integration
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.querySelector("#portal")!,
  );
};
