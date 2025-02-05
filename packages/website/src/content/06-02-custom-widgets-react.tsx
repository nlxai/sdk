import { type FC } from "react";

import { PageContent } from "../components/PageContent";

const content = `
The React and Preact packages expose a single custom hook called \`useChat\`.

The following code snippet shows a few features easily implemented using this hook:
- set up a controlled input field.
- send a message when the enter key is pressed.
- render text messages from both the user and the bot.
- render a loading element when a bot response is expected to arrive.

~~~jsx
import { useChat } from "@nlxai/chat-react";

const CustomWidget = () => {
  // Instantiate the chat with the same bot configuration as the off-the-shelf widget
  const chat = useChat({
    botUrl: "",
    headers: {
      "nlx-api-key": ""
    }
  });

  return (
    <div>
      {chat.responses.map((response, index) => {
        if (response.type === "user" && response.payload.type === "text") {
          return <div className="chat-bubble chat-bubble--user">{response.payload.text}</div>;
        }
        if (response.type === "bot") {
          return response.payload.messages.map((message, messageIndex) => {
            return <div className="chat-bubble chat-bubble--bot">{message.text}</div>;
          });
        }
      })}
      {chat.waiting && <div>...</div>}
      <input
        value={chat.inputValue}
        onInput={(event) => {
          chat.setInputValue(event.target.value);
        }}
      />
    </div>
  );
}
~~~
`;

export const navGroup: string = "Custom widgets";

export const title: string = "React & Preact";

export const Content: FC<unknown> = () => {
  return (
    <>
      <PageContent md={content} />
    </>
  );
};
