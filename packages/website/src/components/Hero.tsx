import React from "react";
import { useLocation } from "react-router-dom";
import { Disclaimer } from "../custom-components/Disclaimer";
import { FeedbackForm } from "../custom-components/FeedbackForm";
import { Carousel, carouselExampleData } from "../custom-components/Carousel";
import { InlineWidget } from "../components/InlineWidget";

export const Hero = () => {
  const location = useLocation();
  const pathname =
    location.pathname === "/" ? "/getting-started" : location.pathname;
  if (pathname !== "/getting-started") {
    return null;
  }
  return (
    <div className="overflow-hidden bg-slate-900 dark:-mb-32 dark:mt-[-4.75rem] dark:pb-32 dark:pt-[4.75rem]">
      <div className="py-16 sm:px-2 lg:relative lg:px-0 lg:py-20">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
          <div className="relative z-10 md:text-center lg:text-left">
            <div className="relative">
              <p className="inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                SDK for rich conversational experiences
              </p>
              <p className="mt-3 text-2xl tracking-tight text-slate-400">
                Add chat and multimodal capabilities to your page in minutes.
                Add fully custom components with a dozen lines of code, or
                engineer from the ground up yourself.
              </p>
              <div className="mt-8 flex gap-4 md:justify-center lg:justify-start">
                <button
                  className="rounded-full bg-sky-300 py-2 px-4 text-sm font-semibold text-slate-900 hover:bg-sky-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500"
                  onClick={() => {
                    document.querySelector("article")?.scrollIntoView({
                      block: "start",
                      behavior: "smooth"
                    });
                  }}
                >
                  Get started
                </button>
                <a
                  className="rounded-full bg-slate-800 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-400"
                  href="https://github.com/nlxai/chat-sdk"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
          <div className="relative lg:static xl:pl-10">
            <InlineWidget
              className="mx-auto h-[480px]"
              animated
              items={[
                [
                  {
                    type: "user",
                    message:
                      "I would like to order a Friday afternoon snack for the office."
                  }
                ],
                [
                  {
                    type: "bot",
                    message: "Sure, I have these options available:"
                  },
                  {
                    type: "custom",
                    element: <Disclaimer />
                  },
                  {
                    type: "custom",
                    element: <Carousel data={carouselExampleData} />
                  }
                ],
                [
                  {
                    type: "user",
                    message: "I would like the fancy coffees"
                  }
                ],
                [
                  {
                    type: "bot",
                    message: "Great, I added the coffees to your order."
                  },
                  {
                    type: "bot",
                    message:
                      "Would you like to take a moment to give us feedback on your experience with us?"
                  }
                ],
                [
                  {
                    type: "user",
                    message: "Yes"
                  }
                ],
                [
                  {
                    type: "bot",
                    message: "Please fill out the following form:"
                  },
                  {
                    type: "custom",
                    element: <FeedbackForm />
                  }
                ]
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
