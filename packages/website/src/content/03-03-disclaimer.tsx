import React from "react";
import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { Note } from "../components/Note";
import { Disclaimer } from "../custom-components/Disclaimer";
import { InlineWidget } from "../components/InlineWidget";

export const content = `
This disclaimer component can be used as a discrete notice at the beginning of the conversation. For example, they can allow users to opt in for tracking.

~~~js
const Disclaimer = () => {
  const [status, setStatus] = useState("pending");
  return html\`
    <div className="chat-disclaimer">
      \${status === "pending" &&
        html\`
          <p>
            In order to enhance your experience in this chat, we would like to
            temporarily store personal data according to our${" "}
            <a>privacy policy</a>.
          </p>
          <button
            onClick=\${() => {
              setStatus("accepted");
            }}
          >
            Accept
          </button>
          <button
            onClick=\${() => {
              setStatus("denied");
            }}
          >
            Deny
          </button>
        \`}
      \${status === "accepted" &&
        html\`
          <p>
            As requested, we might store certain personal or device identifiers
            to enhance your experience on this chat.
          </p>
        \`}
      \${status === "denied" &&
        html\`
          <p>
            As requested, we will not store personal information in this chat.
          </p>
        \`}
    </div>
  \`;
};
~~~
`;

export const WebWidgetComponentsDisclaimer = (): JSX.Element => {
  return (
    <>
      <PageTitle pretitle="Web widget components" title="Disclaimer" />
      <InlineWidget
        className="mb-8"
        items={[[{ type: "custom", element: <Disclaimer /> }]]}
      />
      <PageContent md={content} />
      <Note
        title="Note"
        body="This component example is purely presentational. What happens when the user clicks the 'Accept' or 'Deny' buttons should be wired up according to individual tracking setups and privacy policy."
      />
    </>
  );
};
