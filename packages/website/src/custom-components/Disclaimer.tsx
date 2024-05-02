import "./Disclaimer.css";
import { useState, createElement } from "react";
import htm from "htm";

const html = htm.bind(createElement);

// initial eslint integration
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const Disclaimer = () => {
  const [status, setStatus] = useState<"pending" | "accepted" | "denied">(
    "pending",
  );
  return html`
    <div className="chat-disclaimer">
      ${status === "pending" &&
      html`
        <p>
          In order to enhance your experience in this chat, we would like to
          temporarily store personal data according to our${" "}
          <a>privacy policy</a>.
        </p>
        <button
          onClick=${() => {
            setStatus("accepted");
          }}
        >
          Accept
        </button>
        <button
          onClick=${() => {
            setStatus("denied");
          }}
        >
          Deny
        </button>
      `}
      ${status === "accepted" &&
      html`
        <p>
          As requested, we might store certain personal or device identifiers to
          enhance your experience on this chat.
        </p>
      `}
      ${status === "denied" &&
      html`
        <p>
          As requested, we will not store personal information in this chat.
        </p>
      `}
    </div>
  `;
};
