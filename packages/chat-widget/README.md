# Chat Widget

The chat widget is a styled, configurable UI widget you can drop in on your website or web application.

## Installation

`npm install --save @nlxai/chat-widget react react-dom`

## Usage

You can render a chat widget in your document with just a few lines of code:

```jsx
import { create } from "@nlxai/chat-widget";

// This will render the widget as the last element in the <body>

create({
  config: {
    botUrl: "",
    headers: {
      "nlx-api-key": "",
    },
  },
  initiallyExpanded: true,
  theme: {
    primaryColor: "teal",
    darkMessageColor: "#000",
    lightMessageColor: "#fff",
    fontFamily: "Helvetica",
  },
});
```

There is also a packaged version of the SDK that exposes the `nlxChat.widget.create` as a global on window:

```html
<body>
  <script src="https://unpkg.com/@nlxai/chat-widget@0.0.14/lib/index.umd.js"></script>
  <script>
    window.nlxChat.widget.create({
      config: {
        botUrl: "",
        headers: {
          "nlx-api-key": "",
        },
      },
      initiallyExpanded: true,
      theme: {
        primaryColor: "teal",
        darkMessageColor: "#000",
        lightMessageColor: "#fff",
        fontFamily: "Helvetica",
      },
    });
  </script>
</body>
```

## Configuration

Initiating the chat takes the following parameters (see [type definition](https://github.com/nlxai/chat-sdk/blob/master/packages/widget/src/props.ts) for details):

### `config`

The configuration of the chat itself, containing `botUrl` and request headers. See the [core SDK example](https://github.com/nlxai/chat-sdk/tree/master/packages/core#getting-started).

### `theme`

Overrides for the visual theme constants. See [Theme type definition](https://github.com/nlxai/chat-sdk/blob/master/packages/widget/src/theme.ts) for details.

### `chatIcon`

The URL of an image you can set to override the default chat icon in the chat pin in the lower right corner. PNG and SVG work best.

### `titleBar`

Renders an optional title bar at the top. If the object is provided, it has the following fields:

- `title` (mandatory): title text.
- `icon` (optional): a URL for an icon image.
- `downloadable` (optional): if set to true, the title bar will include a button that allows chat history to be downloaded.

### `bubble`

When set to a non-empty string, a small bubble will appear above the chat pin when the chat is not expanded, helping the user understand what the chat is for. This bubble appears 3s after the chat is loaded, and disappears after 20s.

### `storeIn`

When this option is set to `"localStorage"` or `"sessionStorage"`, the state of the chat conversation is persisted in [local](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) or [session](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) storage respectively. This allows the state and history of the conversation to persist between full page refreshes.

> When using the session storage feature, it is your responsibility to make sure that your website complies with your data protection and privacy policy requirements.

### `loaderMessage`

When a bot response is expected, the UI shows a message bubble with a loading animation. By setting a `loaderMessage` property, a message will appear next to it, by default after a few seconds. This can help long responses seem less frustrating to the user.

Some example strategies:

- inform the user of the delay: `Your request is taking longer than expected, please wait`.
- inform the user what is happening exactly: `Processing your booking`.

### `showLoaderMessageAfter`

A duration in milliseconds after which the `loaderMessage` should appear. If you want the loader message to appear instantly, simply set this value to `0`.

## The widget instance

The `create` function (`window.nlxChat.widget.create` if you are using the packaged version) returns an object that you can use to control the widget programmatically. It has the following methods:

- `expand`: expand the widget programmatically. You can do this as a response to e.g. a button on your page being clicked.
- `collapse`: collapse the widget programmatically.
- `teardown`: remove the chat widget from the page. This cleans up all internal event listeners.
- `getConversationHandler`: a function that returns the current [conversation handler](https://github.com/nlxai/chat-sdk/tree/master/packages/core#api-reference) object. Note that this handler might not be available synchronously after widget initialization, and therefore an `undefined` check is highly recommended before use.

## Recipes

### Fine-grain control on triggering the welcome intent

You can trigger the welcome intent when the widget is expanded, provided there are no messages already in the chat, using the following pattern:

```js
window.nlxChat.widget.create({
  config: {
    // Bot configuration (`botUrl` etc.)
  },
  onExpand: () => {
    const checkMessages = (messages) => {
      if (messages.length === 0) {
        conversationHandler.sendWelcomeIntent();
      }
      conversationHandler.unsubscribe(checkMessages);
    };
    conversationHandler.subscribe(checkMessages);
  },
});
```

### Open the widget from the outside

```js
const widget = window.nlxChat.widget.create({
  config: {
    // Bot configuration (`botUrl` etc.)
  },
});

// Expand the widget as a result of a button on the page being clicked
document.querySelector("#my-button").addEventListener("click", () => {
  widget.expand();
});
```

### Trigger a custom message after a period of time spent on a page

This example triggers a custom intent after a period of time spent on the `/product` page of a website.

```js
const widget = window.nlxChat.widget.create({
  config: {
    // Bot configuration (`botUrl` etc.)
  },
});

if (window.location.pathname === "/product") {
  setTimeout(() => {
    const conversationHandler = widget.getConversationHandler();
    if (conversationHandler) {
      conversationHandler.sendIntent("ProductInfoIntent");
    }
    widget.expand();
  }, 20000);
}
```

## License

MIT.
