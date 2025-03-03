import { type FC } from "react";
import { Link } from "react-router-dom";

const PrevArrow: FC<unknown> = () => (
  <svg
    viewBox="0 0 16 16"
    aria-hidden="true"
    className="h-4 w-4 flex-none fill-current -scale-x-100"
  >
    <path d="m9.182 13.423-1.17-1.16 3.505-3.505H3V7.065h8.517l-3.506-3.5L9.181 2.4l5.512 5.511-5.511 5.512Z"></path>
  </svg>
);

const NextArrow: FC<unknown> = () => (
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

const headingClass = "text-base text-primary-60";

export const NextPrevPage: FC<{ prev?: LinkData; next?: LinkData }> = (
  props,
) => (
  <dl className="mt-12 border-t border-primary-10 pt-6">
    <div className="flex max-w-3xl mx-auto">
      {props.prev && (
        <div>
          <dt className={headingClass}>Previous</dt>
          <dd className="mt-1">
            <Link
              className="flex items-center gap-x-1 text-base text-primary-90 hover:text-white flex-row-reverse"
              to={props.prev.url}
            >
              {props.prev.label}
              <PrevArrow />
            </Link>
          </dd>
        </div>
      )}
      {props.next && (
        <div className="ml-auto text-right">
          <dt className={headingClass}>Next</dt>
          <dd className="mt-1">
            <Link
              to={props.next.url}
              className="flex items-center gap-x-1 text-base text-primary-90 hover:text-white"
            >
              {props.next.label}
              <NextArrow />
            </Link>
          </dd>
        </div>
      )}
    </div>
  </dl>
);
