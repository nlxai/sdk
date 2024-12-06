import { PageTitle } from "../components/PageTitle";
import { PageContent } from "../components/PageContent";
import { packageUrls } from "../constants";

export const content = `
This is the official JavaScript SDK to communicate with conversational bots created using NLX Dialog Studio. It contains the following packages:
* [@nlxai/chat-widget](${packageUrls.chatWidget}): the official out-of-the-box, themeable NLX widget.
* [@nlxai/chat-react](${packageUrls.chatReact}): React custom hook for building chat widgets.
* [@nlxai/chat-preact](${packageUrls.chatPreact}): Preact custom hook for building chat widgets.
* [@nlxai/chat-core](${packageUrls.chatCore}): vanilla JavaScript SDK for creating fully custom chat widgets.
* [@nlxai/voice-plus](${packageUrls.voicePlus}): Voice+ capabilities.
`;

// initial eslint integration
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const GettingStarted = () => {
  return (
    <>
      <PageTitle pretitle="Introduction" title="Getting started" />
      <PageContent md={content} />
    </>
  );
};
