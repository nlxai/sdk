import { type FC } from "react";
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

export const navGroup: string = "Touchpoint";

export const title: string = "Theming";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
