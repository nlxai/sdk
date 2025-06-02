import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import ContentRaw from "./03-05-guide-show-hide-touchpoint.md?raw";

export const navGroup = "Conversation Control";
export const title = "Showing and Hiding Touchpoint";

export const content = `
The visibility of Touchpoint UI can be programmatically controlled including showing, hiding, and completely removing the widget from your webpage. You interact with the Touchpoint UI through the \`TouchpointInstance\` object returned when you initialize the widget.

${ContentRaw}`;

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
