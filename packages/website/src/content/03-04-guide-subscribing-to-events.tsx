import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import ContentRaw from "./03-04-guide-subscribing-to-events.md?raw";

export const navGroup = "Conversation Control";
export const title = "Subscribing to Events";

export const content = `
The ConversationHandler allows your application to listen and react to updates within the Touchpoint UI conversation, such as new messages from the bot or user inputs. This enables you to build dynamic experiences, trigger custom UI changes, integrate with analytics, or perform other actions based on the conversation flow.

${ContentRaw}`;

export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
