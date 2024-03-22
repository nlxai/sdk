import React from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { coreSetupSnippet } from "../snippets";

export const content = `
The main method exported by this package is \`createConversation\`, which takes the bot configuration and returns a conversation handler.

~~~js
${coreSetupSnippet}
~~~

## Handler API

The conversation handler has the following methods. For each send method, conversation context can be optionally specified as a second argument.

### \`sendText: (text: string, context?: Record<string, unknown>) => void\`

Send a simple text to your bot.

### \`sendChoice: (choiceId: string, context?: Record<string, unknown>) => void\`

Your bot may send a list of choices to choose from, each with a \`choiceText\` and a \`choiceId\` field. You can use \`choiceText\` as button labels, and include the \`choiceId\` in this method when sending responses.

### \`sendSlots: (slots: Record<string, unknown>, context?: Record<string, unknown>) => void\`

Send slot values directly through custom widgets such as interactive maps.

### \`sendIntent: (intentId: string, context?: Record<string, unknown>) => void\`

Trigger a specific intent. The most common use of this method is to show welcome messages by sending the \`NLX.Welcome\` intent.

### \`sendStructured: (request: StructuredRequest, context?: Record<string, unknown>) => void\`

Send a combination of choice, slots, and intent ID in one request.

### \`subscribe: (subscriber: (responses: Response[], newResponse: Response | undefined) => void) => void\`

Subscribe to the current state of messages whenever there is a change. The second argument returns the new response that is triggering the subscription, if there is one.

### \`unsubscribe: (subscriber: (responses: Response[]) => void) => void\`

Remove a subscription.

### \`unsubscribeAll: () => void\`

Remove all subscriptions.

### \`reset: () => void\`

Reset the conversation. This makes sure that information previously collected by your bot will not affect the logic of the conversation any longer.
`;

export const HeadlessApi = () => {
  return (
    <>
      <PageTitle pretitle="Headless API" title="API reference" />
      <PageContent md={content} />
    </>
  );
};
