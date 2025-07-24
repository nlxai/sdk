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
