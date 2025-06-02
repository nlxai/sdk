import { type FC } from "react";
import { PageContent } from "../components/PageContent";
import markdownContent from "./03-01-touchpoint-ui-ConversationHandler.md?raw";


export const navGroup: string = "Conversation Control";

export const title: string = "The Conversation Handler";

export const content = `
The \`ConversationHandler\` is a key part of the Touchpoint UI SDK, providing the primary interface for your application to interact with the NLX backend. It allows you to send messages, trigger intents, manage conversation context, and subscribe to conversation events.

Refer to the [Headless API Reference (ConversationHandler interface)](/headless-api-reference#interfacesconversationhandlermd) for a complete list of methods and their detailed type signatures.

${markdownContent}`;


export const Content: FC<unknown> = () => {
  return <PageContent md={content} />;
};
