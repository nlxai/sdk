# Touchpoint

Touchpoint UI provides a customizable chat interface that you can embed in your web applications. Touchpoint UI allows users to interact with your application and provides a seamless conversational experience.

```js
import { create } from "@nlxai/touchpoint-ui";

const touchpoint = await create({
  config: {
    applicationUrl: "REPLACE_WITH_APPLICATION_URL",
    headers: {
      "nlx-api-key": "REPLACE_WITH_API_KEY",
    },
    languageCode: "en-US",
    userId: "REPLACE_WITH_USER_ID",
  },
  colorMode: "light",
  input: "voice",
  theme: { fontFamily: '"Neue Haas Grotesk", sans-serif', accent: "#AECAFF" },
});
```

[Official documentation](https://docs.nlx.ai/platform/touchpoint)

## Run locally

`npm install`
`npm run dev`

## Styling

Touchpoint UI is styled with [Tailwind](https://tailwindcss.com), with the compiled CSS injected inside the custom element's shadow root.

> Since the @property rule doesn't work properly inside the shadow root, translation-related classes must specify both x and y coordinates, for example `transform translate-x-full translate-y-0` (where normally the last class name is not necessary).
