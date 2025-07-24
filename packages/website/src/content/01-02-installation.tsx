import { type FC } from "react";

import { PageContent } from "../components/PageContent";
import { packageUrls } from "../constants";
import { umdScriptTags } from "../snippets";

export const content = `
SDK packages can be installed as follows:

## Using script tags

The following packages are available as direct script tags:

* [@nlxai/touchpoint-ui](${packageUrls.touchpointUi}) - the modern and themeable chat widget:

~~~html
${umdScriptTags.touchpointUi}
~~~

* [@nlxai/core](${packageUrls.core}) - talk to a bot in plain JavaScript without a bundler:

~~~html
${umdScriptTags.core}
~~~

* [@nlxai/voice-plus-core](${packageUrls.voicePlusCore}) - add Voice+ capabilities to a plain HTML page:

~~~html
${umdScriptTags.voicePlusCore}
~~~

## Using npm

All packages are available on npm as CommonJS modules. They are written in TypeScript and include comprehensive type definitions.

~~~bash
# Touchpoint UI
npm install @nlxai/touchpoint-ui

# Core chat SDK
npm install @nlxai/core

# Voice+
npm install @nlxai/voice-plus-core
~~~
`;

export const navGroup: string = "Introduction";

export const title: string = "Installation";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
