import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import ContentRaw from "./03-03-guide-custom-launch.md?raw";

export const navGroup = "Conversation Control";
export const title = "Launching with Context";

export const content = `
Touchpoint UI offers flexible ways to customize the conversation's launch. You can pass initial data to your NLX application using \`initialContext\` or implement custom startup logic with the \`initializeConversation\` function.
${ContentRaw}
`;

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
