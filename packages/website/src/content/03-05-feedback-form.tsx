import React from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { Note } from "../components/Note";
import { FeedbackForm } from "../custom-components/FeedbackForm";
import { InlineWidget } from "../components/InlineWidget";
import { feedbackFormSnippet } from "../snippets";

export const content = `
The feedback form allows multiple custom fields to be captured in the same UI element, all submitted at the same time. For example, it can be used to confirm information collected throughout the conversation.

~~~js
${feedbackFormSnippet}
~~~
`;

export const WebWidgetComponentsFeedbackForm = () => {
  return (
    <>
      <PageTitle pretitle="Web widget components" title="Feedback form" />
      <InlineWidget
        className="mb-8"
        items={[
          [
            {
              type: "custom",
              element: <FeedbackForm />
            }
          ]
        ]}
      />
      <PageContent md={content} />
      <Note
        title="Note"
        body="This code presents an example of how the feedback form can be implemented. In order for this to work in production, you must make sure the slot names match the ones defined in Dialog Studio."
      />
    </>
  );
};
