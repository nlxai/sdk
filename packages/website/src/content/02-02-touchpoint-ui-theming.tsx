import { type FC } from "react";
import { PageContent } from "../components/PageContent";

export const content = `
Touchpoint exposes a number of style theme parameters that can be customized under the \`theme\` configuration option:
- \`fontFamily\`: the font setting for the widget.
- \`accent\`: the general accent color, used for the loading animation or selected cards.
`;

export const navGroup: string = "Touchpoint";

export const title: string = "Theming";

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
