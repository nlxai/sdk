import { type FC } from "react";
import { useTouchpoint } from "../contexts/TouchpointContext"; // Adjust path as needed

import { PageContent } from "../components/PageContent";
import customCardContent_p1 from "./04-04-touchpoint-CustomCards_p1.md?raw";
import customCardContent_p2 from "./04-04-touchpoint-CustomCards_p2.md?raw";


export const content_p1 = customCardContent_p1;
export const content_p2 = customCardContent_p2;

export const navGroup: string = "Touchpoint components";

export const title: string = "Custom Cards";

export const Content: FC<unknown> = () => {
  const { instance, conversationHandler, isTouchpointReady } = useTouchpoint();

  const handleLaunchAndSendContext = () => {
    if (instance && conversationHandler) {
      // 1. Ensure the Touchpoint UI is visible/expanded
      instance.expanded = true;

      // 2. Send the welcome intent (or a specific intent) with your desired context
      // This context variable (e.g., 'pageSource', 'cardId') should be defined
      // as a Context Variable in your NLX Dialog Studio workspace to be usable in flows.
      const specificContext = {
        TouchpointComponentExampleContextVar: "Carousel",
        cardId: "exampleCard123", // Replace with dynamic data if needed
        // Add any other context variables relevant to your NLX application
      };
      
      console.log("Sending welcome intent with context:", specificContext);
      conversationHandler.sendWelcomeIntent(specificContext);
      
      // Alternatively, to send a specific intent:
      // conversationHandler.sendIntent("YourCustomIntentName", specificContext);

    } else {
      console.warn("Touchpoint instance or conversationHandler is not available.");
      // You might want to provide feedback to the user or try re-initializing.
    }
  };

  return (
    <>
      <PageContent md={content_p1} />
      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid var(--primary-20)', borderRadius: 'var(--outer-border-radius)' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-80)', marginBottom: '1rem' }}>
          Launch Touchpoint Carousel Example
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--primary-60)', marginBottom: '1rem' }}>
          Click the button below to open the Touchpoint and see an example of a custom card carousel.
        </p>
        <button
          onClick={handleLaunchAndSendContext}
          disabled={!isTouchpointReady}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            cursor: isTouchpointReady ? 'pointer' : 'not-allowed',
            backgroundColor: isTouchpointReady ? 'var(--accent)' : 'var(--primary-20)',
            color: isTouchpointReady ? 'var(--secondary-80)' : 'var(--primary-40)',
            border: 'none',
            borderRadius: 'var(--inner-border-radius)',
            fontWeight: 500
          }}
        >
          Launch Touchpoint
        </button>
        {!isTouchpointReady && (
          <p style={{ color: 'var(--error-primary)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
            Touchpoint is not ready. Please ensure it's configured correctly and check the console for errors.
          </p>
        )}
      </div>
      <PageContent md={content_p2} />
    </>
  );
};