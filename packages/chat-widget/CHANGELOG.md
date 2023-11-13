# 1.0.0

Initial version.

# 2.0.0

* UMD version now available as `window.nlxChat.widget.create(/* ... */)`. This nested namespacing makes it possible to use other packages like `window.nlxChat.core`.
* removed `lowLevel` handler in favor of `getConversationHandler`.
* removed `initiallyExpanded`. Use the `widget.expand()` method on the return value of standalone.
* removed documentation for the `Widget` component, which is no longer publically supported.
