import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { Note } from "../components/Note";
import { FeedbackForm } from "../custom-components/FeedbackForm";
import { InlineWidget } from "../components/InlineWidget";

export const content = `
The feedback form allows multiple custom fields to be captured in the same UI element, all submitted at the same time. For example, it can be used to confirm information collected throughout the conversation.

~~~js
const FeedbackForm = () => {
  const handler = useConversationHandler();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const [submitted, setSubmitted] = useState<boolean>(false);

  return html\`
    <form
      className="chat-feedback-form"
      onSubmit=\${(event) => {
        event.preventDefault();
        setSubmitted(true);
        handler?.sendSlots({
          firstName,
          lastName,
          email,
          feedback,
        });
      }}
    >
      <input
        placeholder="First name"
        required
        disabled=\${submitted}
        value=\${firstName}
        onInput=\${(ev: any) => {
          setFirstName(ev.target.value);
        }}
      />
      <input
        placeholder="Last name"
        required
        disabled=\${submitted}
        value=\${lastName}
        onInput=\${(ev: any) => {
          setLastName(ev.target.value);
        }}
      />
      <input
        type="email"
        required
        placeholder="Email"
        disabled=\${submitted}
        value=\${email}
        onInput=\${(ev: any) => {
          setEmail(ev.target.value);
        }}
      />
      <textarea
        placeholder="Feedback"
        required
        disabled=\${submitted}
        value=\${feedback}
        onInput=\${(ev: any) => {
          setFeedback(ev.target.value);
        }}
      />
      \${!submitted &&
        html\`
          <button type="submit">Submit</button>
        \`}
    </form>
  \`;
};
~~~
`;

export const WebWidgetComponentsFeedbackForm = (): JSX.Element => {
  return (
    <>
      <PageTitle pretitle="Web widget components" title="Feedback form" />
      <InlineWidget
        className="mb-8"
        items={[
          [
            {
              type: "custom",
              element: <FeedbackForm />,
            },
          ],
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
