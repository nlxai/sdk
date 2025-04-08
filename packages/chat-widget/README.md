# Chat Widget

The chat widget is a styled, configurable UI widget you can drop in on your website or web application.

## Getting started

The simplest way to talk to a bot is to include an out-of-the-box chat widget on your existing website.

~~~html
<!-- Chat widget sample HTML -->
<!-- Downloaded from https://developers.nlx.ai -->
<html lang="en">
  <head>
    <title>NLX Widget Sample HTML</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <script defer src="https://unpkg.com/@nlxai/chat-widget/lib/index.umd.js"></script>
    <script>
      const contentLoaded = () => {
        if (document.readyState === "loading") {
          return new Promise((resolve) => {
            window.addEventListener("DOMContentLoaded", () => {
              resolve();
            });
          });
        } else {
          return Promise.resolve();
        }
      };

      contentLoaded().then(() => {
        const widget = nlxai.chatWidget.create({
          config: {
            botUrl: "REPLACE_WITH_BOT_URL",
            headers: {
              "nlx-api-key": "REPLACE_WITH_API_KEY"
            },
            languageCode: "en-US"
          },
          titleBar: {
            "title": "Support chat"
          },
          
        });
      });
    </script>
  </body>
</html>
~~~

In this snippet, the script is deferred in order to reduce impact on page speed. After the script is initialized, we use the `nlxai.chatWidget` global to instantiate the widget. The following parameters are used:
- `config`: the [bot configuration](/headless-api-reference#interfacesconfigmd), including the bot URL obtained and headers obtained from the deployment of your bot.
- `titleBar`: configuration for the header bar of the widget, containing the following fields:
  - `title`: the text content of the title, e.g. "Support chat".
  - `logo`: the static URL of a logo image that appears left of the title.

### Using a bundler

You can install the web widget via npm and use a bundler:

`npm install --save @nlxai/chat-widget react react-dom`

After installation, you can render a chat widget in your document with just a few lines of code:

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

## Configuration

Initiating the chat takes the following parameters (see [type definition](https://github.com/nlxai/chat-sdk/blob/master/packages/widget/src/props.ts) for details):

### `config`

The configuration of the chat itself, containing `botUrl` and request headers. See the [core SDK example](https://github.com/nlxai/chat-sdk/tree/master/packages/core#getting-started).

### `theme`

The web widget exposes a number of style theme parameters that can be customized:

- \`primaryColor\`: the general primary color, used for the header bubble.
- \`darkMessageColor\`: the background color of the dark message bubbles. As a starting point, we recommend making this identical with the primaryColor, but this is by no means a requirement.
- \`lightMessageColor\`: the background color of the light message bubbles.
- \`white\`: the hex code of the general chat background, supporting off-white.
- \`fontFamily\`: the font setting for the widget.
- \`spacing\`: the general spacing unit.
- \`borderRadius\`: border radius for the chat widget.
- \`chatWindowMaxHeight\`: the maximum height of the chat box, relevant for large screens.

See [Theme type definition](https://github.com/nlxai/chat-sdk/blob/master/packages/widget/src/theme.ts) for additional details.

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

## Custom behaviors

The widget can be configured to handle a number of custom behaviors. Select one from below and see how the code snippet changes:

<details>
<summary>Simple chat</summary>

```html
<!-- Chat widget sample HTML -->
<!-- Downloaded from https://developers.nlx.ai -->
<html lang="en">
  <head>
    <title>NLX Widget Sample HTML</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <script
      defer
      src="https://unpkg.com/@nlxai/chat-widget/lib/index.umd.js"
    ></script>
    <script>
      const contentLoaded = () => {
        if (document.readyState === "loading") {
          return new Promise((resolve) => {
            window.addEventListener("DOMContentLoaded", () => {
              resolve();
            });
          });
        } else {
          return Promise.resolve();
        }
      };

      contentLoaded().then(() => {
        const widget = nlxai.chatWidget.create({
          config: {
            botUrl: "REPLACE_WITH_BOT_URL",
            headers: {
              "nlx-api-key": "REPLACE_WITH_API_KEY",
            },
            languageCode: "en-US",
          },
          titleBar: {
            title: "Support chat",
          },
        });
      });
    </script>
  </body>
</html>
```

</details>

<details>
    <summary>Send welcome intent when the chat is opened</summary>

~~~html
<!-- Chat widget sample HTML -->
<!-- Downloaded from https://developers.nlx.ai -->
<html lang="en">
  <head>
    <title>NLX Widget Sample HTML</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <script defer src="https://unpkg.com/@nlxai/chat-widget/lib/index.umd.js"></script>
    <script>
      const contentLoaded = () => {
        if (document.readyState === "loading") {
          return new Promise((resolve) => {
            window.addEventListener("DOMContentLoaded", () => {
              resolve();
            });
          });
        } else {
          return Promise.resolve();
        }
      };

      contentLoaded().then(() => {
        const widget = nlxai.chatWidget.create({
          config: {
            botUrl: "REPLACE_WITH_BOT_URL",
            headers: {
              "nlx-api-key": "REPLACE_WITH_API_KEY"
            },
            languageCode: "en-US"
          },
          titleBar: {
            "title": "Support chat"
          },
          // CUSTOM BEHAVIOR SNIPPET
          onExpand: (conversationHandler) => {
            const checkMessages = (messages) => {
              if (messages.length === 0) {
                conversationHandler.sendWelcomeIntent();
              }
              conversationHandler.unsubscribe(checkMessages);
            };
            conversationHandler.subscribe(checkMessages);
          },
          // CUSTOM BEHAVIOR SNIPPET END
          
        });
      });
    </script>
  </body>
</html>
~~~

</details>

<details>
    <summary>Send custom intent after a period of inactivity</summary>

~~~html
<!-- Chat widget sample HTML -->
<!-- Downloaded from https://developers.nlx.ai -->
<html lang="en">
  <head>
    <title>NLX Widget Sample HTML</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <script defer src="https://unpkg.com/@nlxai/chat-widget/lib/index.umd.js"></script>
    <script>
      const contentLoaded = () => {
        if (document.readyState === "loading") {
          return new Promise((resolve) => {
            window.addEventListener("DOMContentLoaded", () => {
              resolve();
            });
          });
        } else {
          return Promise.resolve();
        }
      };

      contentLoaded().then(() => {
        const widget = nlxai.chatWidget.create({
          config: {
            botUrl: "REPLACE_WITH_BOT_URL",
            headers: {
              "nlx-api-key": "REPLACE_WITH_API_KEY"
            },
            languageCode: "en-US"
          },
          titleBar: {
            "title": "Support chat"
          },
          
        });
        
        // CUSTOM BEHAVIOR SNIPPET
        setTimeout(() => {
          const conversationHandler = widget.getConversationHandler();
          if (conversationHandler) {
            conversationHandler.sendIntent("MyCustomIntent");
            widget.expand();
          }
        }, 16000);
        // CUSTOM BEHAVIOR SNIPPET END
      });
    </script>
  </body>
</html>
~~~

</details>

<details>
    <summary>Initialize conversation with context</summary>

~~~html
<!-- Chat widget sample HTML -->
<!-- Downloaded from https://developers.nlx.ai -->
<html lang="en">
  <head>
    <title>NLX Widget Sample HTML</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <script defer src="https://unpkg.com/@nlxai/chat-widget/lib/index.umd.js"></script>
    <script>
      const contentLoaded = () => {
        if (document.readyState === "loading") {
          return new Promise((resolve) => {
            window.addEventListener("DOMContentLoaded", () => {
              resolve();
            });
          });
        } else {
          return Promise.resolve();
        }
      };

      contentLoaded().then(() => {
        const widget = nlxai.chatWidget.create({
          config: {
            botUrl: "REPLACE_WITH_BOT_URL",
            headers: {
              "nlx-api-key": "REPLACE_WITH_API_KEY"
            },
            languageCode: "en-US"
          },
          titleBar: {
            "title": "Support chat"
          },
          
        });
        
        // CUSTOM BEHAVIOR SNIPPET
        const conversationHandler = widget.getConversationHandler();
        
        const context = {
          firstName: "Joe"
        };
        
        conversationHandler.sendWelcomeIntent(context);
        // CUSTOM BEHAVIOR SNIPPET END
      });
    </script>
  </body>
</html>
~~~

</details>

<details>
    <summary>Retain conversation through refreshes (SessionStorage)</summary>

~~~html
<!-- Chat widget sample HTML -->
<!-- Downloaded from https://developers.nlx.ai -->
<html lang="en">
  <head>
    <title>NLX Widget Sample HTML</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <script defer src="https://unpkg.com/@nlxai/chat-widget/lib/index.umd.js"></script>
    <script>
      const contentLoaded = () => {
        if (document.readyState === "loading") {
          return new Promise((resolve) => {
            window.addEventListener("DOMContentLoaded", () => {
              resolve();
            });
          });
        } else {
          return Promise.resolve();
        }
      };

      contentLoaded().then(() => {
        const widget = nlxai.chatWidget.create({
          config: {
            botUrl: "REPLACE_WITH_BOT_URL",
            headers: {
              "nlx-api-key": "REPLACE_WITH_API_KEY"
            },
            languageCode: "en-US"
          },
          titleBar: {
            "title": "Support chat"
          },
          // CUSTOM BEHAVIOR SNIPPET
          storeIn: "sessionStorage",
          // CUSTOM BEHAVIOR SNIPPET END
          
        });
      });
    </script>
  </body>
</html>
~~~

</details>

<details>
    <summary>Retain conversation through refreshes and closed browser sessions (LocalStorage)</summary>

~~~html
<!-- Chat widget sample HTML -->
<!-- Downloaded from https://developers.nlx.ai -->
<html lang="en">
  <head>
    <title>NLX Widget Sample HTML</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <script defer src="https://unpkg.com/@nlxai/chat-widget/lib/index.umd.js"></script>
    <script>
      const contentLoaded = () => {
        if (document.readyState === "loading") {
          return new Promise((resolve) => {
            window.addEventListener("DOMContentLoaded", () => {
              resolve();
            });
          });
        } else {
          return Promise.resolve();
        }
      };

      contentLoaded().then(() => {
        const widget = nlxai.chatWidget.create({
          config: {
            botUrl: "REPLACE_WITH_BOT_URL",
            headers: {
              "nlx-api-key": "REPLACE_WITH_API_KEY"
            },
            languageCode: "en-US"
          },
          titleBar: {
            "title": "Support chat"
          },
          // CUSTOM BEHAVIOR SNIPPET
          storeIn: "localStorage",
          // CUSTOM BEHAVIOR SNIPPET END
          
        });
      });
    </script>
  </body>
</html>
~~~

</details>

## Custom components

The chat widget supports fully custom embeddable components to augment the out-of-the-box chat bubbles and choice buttons. Embeddable components represent the best-of-both-worlds combination of a fully built widget and one custom-engineered from the ground up.

### How it works

As the widget is built in [React](https://react.dev), it exposes the React instance that allows the user to define embeddable components that not only support fully custom styling but can interact with the conversation in a granular way. This component is included in the `customModalities` field of the widget configuration, and is rendered whenever the modality by the same key is triggered:

~~~html
<!-- Chat widget sample HTML -->
<!-- Downloaded from https://developers.nlx.ai -->
<html lang="en">
  <head>
    <title>NLX Widget Sample HTML</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <script defer src="https://unpkg.com/@nlxai/chat-widget/lib/index.umd.js"></script>
    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/htm/3.1.1/htm.js" integrity="sha512-RilD4H0wcNNxG2GvB+L1LRXCntT0zgRvRLnmGu+e9wWaLKGkPifz3Ozb6+WPsyEkTBLw6zWCwwEjs9JLL1KIHg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
      const contentLoaded = () => {
        if (document.readyState === "loading") {
          return new Promise((resolve) => {
            window.addEventListener("DOMContentLoaded", () => {
              resolve();
            });
          });
        } else {
          return Promise.resolve();
        }
      };

      contentLoaded().then(() => {

        // EMBEDDABLE COMPONENT SETUP
        // Destructure dependencies
        const React = nlxai.chatWidget.React;
        const useConversationHandler = nlxai.chatWidget.useConversationHandler;

        // Use the https://github.com/developit/htm package as a JSX alternative
        const html = htm.bind(React);

        // Render component that supports user interaction and conversation handler support
        const SendExampleSlot = () => {
          const conversationHandler = useConversationHandler();
          return html`
            <button onClick=${() => {
              conversationHandler.sendSlots({ "firstName": "Rachel" });
            }>Send a slot</button>
          `;
        };
        // EMBEDDABLE COMPONENT SETUP END

        const widget = nlxai.chatWidget.create({
          config: {
            botUrl: "REPLACE_WITH_BOT_URL",
            headers: {
              "nlx-api-key": "REPLACE_WITH_API_KEY"
            },
            languageCode: "en-US"
          },
          // Include custom embeddable component under the 'customModalities' field
          customModalities: { SendExampleSlot },
          titleBar: {
            "title": "Support chat"
          },
          
        });
      });
    </script>
  </body>
</html>
~~~

## License

MIT.
