# React hook wrapper for the NLX Chat SDK

This package provides the `useChat` [custom hook](https://react.dev/learn/reusing-logic-with-custom-hooks), making it effortless to create fully custom chat widgets for web and mobile.

## Installation

`npm install --save @nlxai/chat-react react react-dom`

## Usage

```jsx
import React from "react";
import { useChat } from "@nlxai/chat-react";

const ChatWidget = () => {
  const chat = useChat({
    botUrl: "", // obtain from NLX deployments page
    headers: {
      "nlx-api-key": "", // obtain from NLX deployments page
    },
    userId: "abcd-1234", // optional property to identify the user
    conversationId: "", // start with a specific conversation ID - useful if you want to resume a previous conversation
    context: {}, // context that is shared with the bot
    languageCode: "es-US", // optional language code for standard bots that do not run on US English
  });

  return (
    <div>
      {chat.responses.map(/* render messages in the current conversation */)}
      <input
        value={chat.inputValue}
        onChange={(event) => {
          chat.setInputValue(event.target.value);
        }}
      />
      <button
        onClick={() => {
          chat.conversationHandler.sendText(chat.inputValue);
        }}
      >
        Send
      </button>
    </div>
  );
};
```

See the [standalone chat widget implemention](https://github.com/nlxai/chat-sdk/blob/master/packages/widget/src/index.tsx) for a production-grade example.

## API

The `useChat` hook returns an object containing the following fields:

#### `conversationHandler`

Contains the full conversation handler object from the [the @nlxai/chat-core package](https://github.com/nlxai/chat-sdk/blob/master/packages/chat-core/README.md). This is mostly used for the `send*` methods like `sendText` or `sendStructured`, as the response subscription is handled by the hook automatically.

#### `inputValue` and `setInputValue`

Hold and modify the value of the chat input field, which is auto-cleared whenever a message is sent. Using this field is optional and you can hold input state separately.

#### `responses`

The reactive full history of the chat messages. It contains the `type: "user" | "bot"` field and an associated payload. Please refer to the type definitions for a complete structure.

#### `waiting`

A reactive value that is `true` whenever a response from the bot is in progress, used to render a message bubble with loading dots.

#### `messagesContainerRef` (DOM only)

A ref object you can attach to the container of the messages. The browser will automatically scroll to the bottom of this container whenever new messages arrive.

#### `scrollToBottom` (DOM only)

The scroll logic applied on `messagesContainerRef` so you can scroll to the bottom of the messages container programmatically.

## React Native

This library is fully headless and does not make assumptions on the view layer, therefore it can be used in React Native.

## License

MIT.
