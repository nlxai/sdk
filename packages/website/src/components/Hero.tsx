import { type FC } from "react";
import { useLocation } from "react-router-dom";
import { clsx } from "clsx";

import { Disclaimer } from "../custom-components/Disclaimer";
import { FeedbackForm } from "../custom-components/FeedbackForm";
import { Carousel, carouselExampleData } from "../custom-components/Carousel";
import { InlineWidget } from "../components/InlineWidget";

const buttonBaseClass =
  "rounded-xl py-1.5 px-8 text-sm focus:outline focus:outline-accent-50 focus:outline-2";

export const Hero: FC<unknown> = () => {
  const location = useLocation();
  const pathname =
    location.pathname === "/" ? "/getting-started" : location.pathname;
  if (pathname !== "/getting-started") {
    return null;
  }
  return (
    <div
      className="overflow-hidden bg-black bg-cover min-h-[calc(100vh-4.75rem)]"
      style={{
        backgroundImage: "url(/DevDocsHeroBG.webp)",
      }}
    >
      <div className="py-4 sm:px-2 lg:relative lg:px-0 lg:py-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-end gap-x-8 gap-y-16 px-4 lg:max-w-8xl lg:grid-cols-2 lg:h-full lg:px-8 xl:gap-x-16 xl:px-12">
          <div className="relative z-10 md:text-center lg:text-left text-primary-90">
            <div className="relative">
              <p className="inline text-primary-90 font-display text-4xl">
                SDK for rich conversational experiences powered by NLX®
              </p>
              <p className="mt-3 text-base">
                Add chat and Voice+ capabilities to your page in minutes.
                Introduce fully custom components with only a dozen lines of
                code, or engineer from the ground up yourself.
              </p>
              <div className="mt-8 flex gap-4 md:justify-center lg:justify-start">
                <button
                  className={clsx(
                    buttonBaseClass,
                    "bg-accent text-secondary-80 hover:bg-accent-20 hover:text-accent",
                  )}
                  onClick={() => {
                    document.querySelector("article")?.scrollIntoView({
                      block: "start",
                      behavior: "smooth",
                    });
                  }}
                >
                  Get started
                </button>
                <a
                  className={clsx(
                    buttonBaseClass,
                    "bg-accent-20 text-accent hover:bg-accent hover:text-secondary-80",
                  )}
                  href="https://github.com/nlxai/sdk"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
          <div className="relative lg:static">
            <InlineWidget
              className="w-full h-[360px] lg:h-[calc(100vh-4.75rem-80px)]"
              animated
              items={[
                [
                  {
                    type: "custom",
                    element: <Disclaimer />,
                  },
                ],
                [
                  {
                    type: "user",
                    message: "I would like to buy a new bike.",
                  },
                ],
                [
                  {
                    type: "bot",
                    message:
                      "Sure, do any of these options look interesting to you?",
                  },
                  {
                    type: "custom",
                    element: <Carousel data={carouselExampleData} />,
                  },
                ],
                [
                  {
                    type: "user",
                    message: "I would like the sporty one",
                  },
                ],
                [
                  {
                    type: "bot",
                    message: "Great, I noted that to your account.",
                  },
                  {
                    type: "bot",
                    message:
                      "Would you like to take a moment to give us feedback on your experience with us?",
                  },
                ],
                [
                  {
                    type: "user",
                    message: "Yes",
                  },
                ],
                [
                  {
                    type: "bot",
                    message: "Amazing, please fill out the following form:",
                  },
                  {
                    type: "custom",
                    element: <FeedbackForm />,
                  },
                ],
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
