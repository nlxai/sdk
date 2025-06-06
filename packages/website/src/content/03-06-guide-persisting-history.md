- [Implementation](#implementation)
  - [Save Session Function](#save-session-function)
  - [Retrieve Session Function](#retrieve-session-function)
  - [Initialize with Persisted History](#initialize-with-persisted-history)
- [Complete Examples](#complete-examples)

## Implementation

Local Storage (`localStorage`) persists conversations across browser sessions. Session storage (`sessionStorage`) clears when the tab closes, while local storage persists until manually cleared.

To use local storage instead of session for persistence across browser sessions, make the change in the code below:

- replace `sessionStorage` with `localStorage`

### Save Session Function

Save the current conversation state to session storage:

```touchpointui
const saveSession = (conversationHandler, responses) => {
  const sessionData = {
    conversationId: conversationHandler.currentConversationId(),
    responses: responses,
  };
  sessionStorage.setItem("touchpoint-session", JSON.stringify(sessionData));
};
```

### Retrieve Session Function

Retrieve the saved session data on page load:

```touchpointui
const retrieveSession = () => {
  try {
    const data = JSON.parse(
      sessionStorage.getItem("touchpoint-session") || "{}",
    );
    if (data.responses && data.conversationId) {
      return data;
    }
    return null;
  } catch (err) {
    return null;
  }
};
```

### Initialize with Persisted History

Use the saved session when creating the Touchpoint instance:

```touchpointui
const savedSession = retrieveSession();

const config = {
  applicationUrl: "YOUR_APPLICATION_URL",
  headers: { "nlx-api-key": "YOUR_API_KEY" },
  languageCode: "en-US",
  conversationId: savedSession?.conversationId,
  responses: savedSession?.responses,
};
```

## Complete Examples

```touchpointui
const storageKey = "touchpoint-session";

const saveSession = (conversationHandler, responses) => {
  const sessionData = {
    conversationId: conversationHandler.currentConversationId(),
    responses: responses,
  };
  sessionStorage.setItem(storageKey, JSON.stringify(sessionData));
};

const retrieveSession = () => {
  try {
    const data = JSON.parse(sessionStorage.getItem(storageKey) || "{}");
    if (data.responses && data.conversationId) {
      return data;
    }
    return null;
  } catch (err) {
    return null;
  }
};

// Initialize touchpoint with persisted history
const savedSession = retrieveSession();

const touchpoint = await create({
  config: {
    applicationUrl: "YOUR_APPLICATION_URL",
    headers: { "nlx-api-key": "YOUR_API_KEY" },
    languageCode: "en-US",
    conversationId: savedSession?.conversationId,
    responses: savedSession?.responses,
  },
});

// Save session on every update
touchpoint.conversationHandler.subscribe((responses) => {
  saveSession(touchpoint.conversationHandler, responses);
});
```
