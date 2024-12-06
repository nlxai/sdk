import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { packageUrls } from "../constants";
import { umdScriptTags } from "../snippets";

export const content = `
SDK packages can be installed as follows:

## Using script tags

The following packages are available as direct script tags:

* [@nlxai/chat-widget](${packageUrls.chatWidget}) - add a chat widget to your website with only HTML:

~~~html
${umdScriptTags.chatWidget}
~~~

* [@nlxai/chat-core](${packageUrls.chatCore}) - talk to a bot in plain JavaScript without a bundler:

~~~html
${umdScriptTags.chatCore}
~~~

* [@nlxai/voice-plus](${packageUrls.voicePlus}) - add multimodal capabilities to a plain HTML page:

~~~html
${umdScriptTags.voicePlus}
~~~

## Using npm

All packages are available on npm as CommonJS modules. They are written in TypeScript and include comprehensive type definitions.

~~~bash
# The Chat widget
npm install @nlxai/chat-widget

# React hooks, along with peer dependencies
npm install @nlxai/chat-react react react-dom

# Preact hooks, along with peer dependencies
npm install @nlxai/chat-preact preact

# Core chat SDK
npm install @nlxai/chat-core

# Multimodal
npm install @nlxai/voice-plus
~~~
`;

// initial eslint integration
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Installation = () => {
  return (
    <>
      <PageTitle pretitle="Install" title="Installation" />
      <PageContent md={content} />
    </>
  );
};
