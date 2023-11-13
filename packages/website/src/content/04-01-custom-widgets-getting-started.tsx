import React from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";

export const content = `
The [@nlxai/chat-react]() and [@nlxai/chat-preact]() packages expose a complete headless UI interface that allows developers to create [React](https://react.dev) and [Preact](https://preactjs.com/) chat widgets with a completely custom presentational layer, yet minimal amount of code.

The [@nlxai/chat-core]() framework-agnostic package is available for widget authors working in other frameworks.
`;

export const CustomWidgetsGettingStarted = () => {
  return (
    <>
      <PageTitle pretitle="Custom widgets" title="Getting started" />
      <PageContent md={content} />
    </>
  );
};
