# NLX SDK

Welcome to the official NLX SDK. In this repository you will find several packages that help you use NLX in different ways.

## Which package do I need?

- I want **users of my website** to be able to **chat** or **talk** to my NLX conversational application, optionally allowing it to interact with my own application using **Voice+**.  
  ➡️ [@nlxai/touchpoint-ui](https://github.com/nlxai/sdk/tree/main/packages/touchpoint-ui/README.md)

- I want to build a very custom chat experience for my users, with customizations outwith what Touchpoint provides.  
  ➡️ [@nlxai/core](https://github.com/nlxai/sdk/tree/main/packages/core/README.md)

- I want a native mobile experience for my users.  
  ➡️ [iOS SDK](https://docs.nlx.ai/platform/developers/conversation-sdk/setup/ios) or [Android SDK](https://docs.nlx.ai/platform/developers/conversation-sdk/setup/android) or [@nlxai/core](https://github.com/nlxai/sdk/tree/main/packages/core/README.md) or [use the REST API](https://docs.nlx.ai/platform/developers/conversation-api/rest)

- I want to integrate my application with a **channel** not directly supported by NLX.  
  ➡️ [@nlxai/core](https://github.com/nlxai/sdk/tree/main/packages/core/README.md) or [use the REST API](https://docs.nlx.ai/platform/developers/conversation-api/rest)

- I want my application using a telephony channel to interect with my website.  
  ➡️ [@nlxai/core](https://github.com/nlxai/sdk/tree/main/packages/core/README.md#sendvoiceplusstep).

- I want to **automate aspects of my integration with NLX**, such as typecheck modalities, sync OpenAPI docs into Data requests or run conversation tests.  
  ➡️ [@nlxai/cli](https://github.com/nlxai/sdk/tree/main/packages/cli/README.md)

## Technical considerations

### NPM & TypeScript

The documentation here on GitHub assumes you are familiar with Typescript and using NPM tooling and package management. However, most of our SDK supports holtinking from CDNs and using JavaScript. Please refer to our [documentation website](https://docs.nlx.ai/platform/developers/conversation-sdk/setup/web#cdn-script-tag) for details.

As such all of these projects come with complete TypeScript type definitions available to use.

## License

The project overall is MIT licensed. Most packages however are licensed under the Attribution-NonCommercial 4.0 International license. NLX customers also get a commercial license as part of their agreement with NLX.
