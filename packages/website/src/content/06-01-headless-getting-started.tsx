import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { headlessSetupSnippet } from "../snippets";

export const content = `
[@nlxai/chat-core](https://www.npmjs.com/package/@nlxai/chat-core) is the lowest-level package used to handle bot communication in a completely headless, platform- and UI-agnostic way.

This package can be used to:
- communicate with a bot on a website without rendering a widget.
- communicate with a bot on a Node.js server, passing along responses to a third-party chat system.

## Sample code

After installing the package, you can start a basic headless conversation using the following code snippet:

~~~ts
${headlessSetupSnippet}
~~~
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
