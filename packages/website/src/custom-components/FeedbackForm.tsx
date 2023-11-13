import "./FeedbackForm.css";
import { useState, createElement } from "react";
import htm from "htm";
import { useConversationHandler } from "@nlxai/chat-widget";

const html = htm.bind(createElement);

export const FeedbackForm = () => {
  const handler = useConversationHandler();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const [submitted, setSubmitted] = useState<boolean>(false);

  return html`
    <form
      className="chat-feedback-form"
      onSubmit=${(ev: any) => {
        ev.preventDefault();
        setSubmitted(true);
        handler?.sendSlots({
          firstName,
          lastName,
          email,
          feedback
        });
      }}
    >
      <input
        placeholder="First name"
        required
        disabled=${submitted}
        value=${firstName}
        onInput=${(ev: any) => {
          setFirstName(ev.target.value);
        }}
      />
      <input
        placeholder="Last name"
        required
        disabled=${submitted}
        value=${lastName}
        onInput=${(ev: any) => {
          setLastName(ev.target.value);
        }}
      />
      <input
        type="email"
        required
        placeholder="Email"
        disabled=${submitted}
        value=${email}
        onInput=${(ev: any) => {
          setEmail(ev.target.value);
        }}
      />
      <textarea
        placeholder="Feedback"
        required
        disabled=${submitted}
        value=${feedback}
        onInput=${(ev: any) => {
          setFeedback(ev.target.value);
        }}
      />
      ${!submitted &&
        html`
          <button type="submit">Submit</button>
        `}
    </form>
  `;
};
