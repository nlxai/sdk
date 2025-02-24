import { type FC } from "react";
import { createPortal } from "react-dom";
import { useLocation, Link } from "react-router-dom";
import { getFilteredRoutes } from "../routes";
import { Toggle } from "./Toggle";
import { clsx } from "clsx";

const MenuListItem: FC<{
  heading: string;
  items: Array<{ label: string; url: string }>;
}> = (props) => {
  const location = useLocation();
  const pathname =
    location.pathname === "/" ? "/getting-started" : location.pathname;
  return (
    <li>
      <h2 className="text-primary-90">{props.heading}</h2>
      <ul role="list" className="mt-2 space-y-2 lg:mt-4 lg:space-y-4">
        {props.items.map((item, index) => {
          const active = pathname === item.url;
          return (
            <li className="relative" key={index}>
              <Link
                className={clsx(
                  "block",
                  active
                    ? "font-medium text-accent"
                    : "text-primary-60 hover:text-primary-80",
                )}
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
    <div className="sticky top-[4.75rem] -ml-0.5 h-[calc(100vh-4.75rem)] w-64 overflow-y-auto overflow-x-hidden px-6 py-16">
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
    <div
      className="fixed inset-0 z-50 items-start overflow-y-auto bg-background-docs backdrop-blur lg:hidden p-4"
      aria-label="Navigation"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-center justify-between p-2">
        <button
          type="button"
          aria-label="Close navigation"
          className="text-primary-60 hover:text-primary-80"
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
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path d="M5 5l14 14M19 5l-14 14"></path>
          </svg>
        </button>
        <Toggle
          value={props.touchpoint}
          options={[
            { value: true, label: "Touchpoint (beta)" },
            { value: false, label: "Chat Widget" },
          ]}
          onChange={(val) => {
            props.setTouchpoint(val);
          }}
        />
      </div>

      <nav className="text-base lg:text-sm mt-5 px-1">
        <ul role="list" className="space-y-9">
          {getFilteredRoutes({ touchpoint: props.touchpoint }).map(
            (route, routeIndex) => (
              <li key={routeIndex}>
                <h2 className="text-primary-90">{route.heading}</h2>
                <ul role="list" className="mt-2 space-y-2 lg:mt-4 lg:space-y-4">
                  {route.items.map((item, itemIndex) => {
                    const active = pathname === item.url;
                    return (
                      <li className="relative" key={itemIndex}>
                        <Link
                          className={clsx(
                            "block",
                            active
                              ? "font-medium text-accent"
                              : "text-primary-60 hover:text-primary-80",
                          )}
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
    </div>,
    // initial eslint integration
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    document.querySelector("#portal")!,
  );
};
