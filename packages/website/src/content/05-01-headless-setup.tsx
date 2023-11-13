import React from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";

export const content = `
[@nlxai/chat-core]() is the lowest-level package used to handle bot communication in a completely headless, platform- and UI-agnostic way.

This package can be used to:
- communicate with a bot on a website without rendering a widget.
- communicate with a bot on a Node.js server, passing along responses to a third-party chat system.
`;

export const HeadlessSetup = () => {
  return (
    <>
      <PageTitle pretitle="Headless API" title="Setup" />
      <PageContent md={content} />
    </>
  );
};
