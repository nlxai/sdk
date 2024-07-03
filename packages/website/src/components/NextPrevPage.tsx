import { type FC } from "react";
import { Link } from "react-router-dom";

// initial eslint integration
// eslint-disable-next-line @typescript-eslint/ban-types
const PrevArrow: FC<{}> = () => (
  <svg
    viewBox="0 0 16 16"
    aria-hidden="true"
    className="h-4 w-4 flex-none fill-current -scale-x-100"
  >
    <path d="m9.182 13.423-1.17-1.16 3.505-3.505H3V7.065h8.517l-3.506-3.5L9.181 2.4l5.512 5.511-5.511 5.512Z"></path>
  </svg>
);

// initial eslint integration
// eslint-disable-next-line @typescript-eslint/ban-types
const NextArrow: FC<{}> = () => (
  <svg
    viewBox="0 0 16 16"
    aria-hidden="true"
    className="h-4 w-4 flex-none fill-current"
  >
    <path d="m9.182 13.423-1.17-1.16 3.505-3.505H3V7.065h8.517l-3.506-3.5L9.181 2.4l5.512 5.511-5.511 5.512Z"></path>
  </svg>
);

interface LinkData {
  label: string;
  url: string;
}

export const NextPrevPage: FC<{ prev?: LinkData; next?: LinkData }> = (
  props,
) => (
  <dl className="mt-12 flex border-t border-gray-200 pt-6">
    {/* initial eslint integration */}
    { }
    {props.prev && (
      <div>
        <dt className="font-display text-sm font-medium text-gray-800">
          Previous
        </dt>
        <dd className="mt-1">
          <Link
            className="flex items-center gap-x-1 text-base font-medium text-black60 hover:text-blueMain flex-row-reverse"
            to={props.prev.url}
          >
            {props.prev.label}
            <PrevArrow />
          </Link>
        </dd>
      </div>
    )}
    {/* initial eslint integration */}
    { }
    {props.next && (
      <div className="ml-auto text-right">
        <dt className="font-display text-sm font-medium text-gray-900">Next</dt>
        <dd className="mt-1">
          <Link
            to={props.next.url}
            className="flex items-center gap-x-1 text-base font-medium text-black60 hover:text-blueMain"
          >
            {props.next.label}
            <NextArrow />
          </Link>
        </dd>
      </div>
    )}
  </dl>
);
