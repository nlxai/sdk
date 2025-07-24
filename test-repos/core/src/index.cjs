const { createConversation } = require("@nlxai/core");

const config = {
  applicationUrl: "", // obtain from NLX deployments page
  headers: {
    "nlx-api-key": "", // obtain from NLX deployments page
  },
  userId: "abcd-1234", // optional property to identify the user
  conversationId: "", // start with a specific conversation ID - useful if you want to resume a previous conversation
  languageCode: "es-US", // optional language code for standard bots that do not run on US English
  environment: "production", // optional environment name for multi-environment bots to control which data request environment should be used.  "production" or "development" are the only supported values.
};

createConversation(config);

console.log("✅ CJS test passed!");
