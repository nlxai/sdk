import { type FC } from "react";

import { PageContent } from "../components/PageContent";
import { touchpointUiSetupSnippet } from "../snippets";

export const content = `
Touchpoint provides the basic building blocks within the package to build and support fully custom embeddable components. The basic building blocks consist of:

* [TextButton](/touchpoint-TextButton)
* [IconButton](/touchpoint-IconButton)
* [BaseText](/touchpoint-BaseText)
* [SmallText](/touchpoint-SmallText)
* [CustomCards](/touchpoint-CustomCards)
* [CustomCard](/touchpoint-CustomCard)
* [CustomCardRow](/touchpoint-CustomCardRow)
* [CustomCardImageRow](/touchpoint-CustomCardImageRow)
* [Icons](/touchpoint-Icons)

## How it works

The building blocks are exposed as a single \`html\` object that can be used to create custom components for Touchpoint to render in the chat session.

The building blocks are used together to create a an embeddable component that can be rendered in the chat session. The component is then passed to the \`customModalities\` field of the widget configuration, and is rendered whenever the modality by the same key is triggered.

<img src="../images/CustomCard-Touchpoint.svg" alt="Custom Card Diagram" style="max-width: 40%;">

## Configuration Example

~~~html
${touchpointUiSetupSnippet({
  config: { 
    botUrl: "",
    languageCode: "en-US",
    headers: { "nlx-api-key": "" }
    },
  customModalitiesExample: true
})}
~~~
`;

export const navGroup: string = "Touchpoint Components";

export const title: string = "Getting started with Touchpoint components";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
