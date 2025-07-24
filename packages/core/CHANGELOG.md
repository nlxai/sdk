## 1.0.0

* first stable release working with multilingual bots.

## 1.0.1

* `subscribe` method now returns a function you can call to unsubscribe directly.
* verified that the core package now satisfies the [Svelte store contract](https://svelte.dev/docs#component-format-script-4-prefix-stores-with-$-to-access-their-values-store-contract), making integration with the framework seamless.

## 1.0.2

* fix the logic that assembles the websocket URL.

## 2.0.0

* context is now sent by individual requests and cannot be added when initializing the SDK.
* new UMD standalone modules: `window.nlxChat.core`. 
