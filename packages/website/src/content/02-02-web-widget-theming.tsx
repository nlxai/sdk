import React from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";

export const content = `
The chat widget exposes a number of style theme parameters that can be customized:
- \`primaryColor\`: the general primary color, used for the header bubble.
- \`darkMessageColor\`: the background color of the dark message bubbles. As a starting point, we recommend making this identical with the primaryColor, but this is by no means a requirement.
- \`lightMessageColor\`: the background color of the light message bubbles.
- \`white\`: the hex code of the general chat background, supporting off-white.
- \`fontFamily\`: the font setting for the widget.
- \`spacing\`: the general spacing unit.
- \`borderRadius\`: border radius for the chat widget.
- \`chatWindowMaxHeight\`: the maximum height of the chat box, relevant for large screens.
`;

// initial eslint integration
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const WebWidgetTheming = () => {
  return (
    <>
      <PageTitle pretitle="Web widget" title="Theming" />
      <PageContent md={content} />
    </>
  );
};
