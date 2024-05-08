import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";

export const content = `
[@nlxai/chat-core]() is the lowest-level package used to handle bot communication in a completely headless, platform- and UI-agnostic way.

This package can be used to:
- communicate with a bot on a website without rendering a widget.
- communicate with a bot on a Node.js server, passing along responses to a third-party chat system.
`;

// initial eslint integration
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const HeadlessGettingStarted = () => {
  return (
    <>
      <PageTitle pretitle="Headless API" title="Getting started" />
      <PageContent md={content} />
    </>
  );
};
