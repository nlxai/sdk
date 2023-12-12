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
    <div
      className="overflow-hidden bg-black dark:-mb-32 dark:mt-[-4.75rem] dark:pb-32 dark:pt-[4.75rem] bg-cover"
      style={{
        backgroundImage: "url(./banner.jpeg)",
      }}
    >
      <div className="py-16 sm:px-2 lg:relative lg:px-0 lg:py-20">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:max-w-8xl lg:grid-cols-2 lg:px-8 xl:gap-x-16 xl:px-12">
          <div className="relative z-10 md:text-center lg:text-left">
            <div className="relative">
              <p className="inline text-white font-display text-5xl">
                SDK for rich conversational experiences
              </p>
              <p className="mt-3 text-2xl text-white65">
                Add chat and multimodal capabilities to your page in minutes.
                Add fully custom components with a dozen lines of code, or
                engineer from the ground up yourself.
              </p>
              <div className="mt-8 flex gap-4 md:justify-center lg:justify-start">
                <button
                  className="rounded-xl bg-lightBlueMain hover:bg-lightBlueDarker text-black80 py-2 px-6 text-sm hover:bg-gray-900 focus:outline-none"
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
                  className="rounded-xl bg-lightBlueMain hover:bg-lightBlueDarker text-black80 py-2 px-6 text-sm hover:bg-gray-900 focus:outline-none"
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
