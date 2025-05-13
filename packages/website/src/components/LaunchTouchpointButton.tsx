// packages/website/src/components/LaunchTouchpointButton.tsx
import { type FC } from "react";
import { useTouchpoint } from "../contexts/TouchpointContext";
import { TouchpointIcon } from "./Icons"; 

interface LaunchTouchpointButtonProps {
  pageTitle: string;
  additionalContext?: Record<string, any>;
  buttonLabel?: string;
  intentName?: string; // If provided, sendIntent will be used instead of sendWelcomeIntent
  description?: string; // Optional description text above the button
}

export const LaunchTouchpointButton: FC<LaunchTouchpointButtonProps> = ({
  pageTitle,
  additionalContext = {},
  buttonLabel,
  intentName,
  description,
}) => {
  const { instance, conversationHandler, isTouchpointReady } = useTouchpoint();

  // Determine the text to display
  const titleForDisplay = `Launch Touchpoint for ${pageTitle}`;
  const effectiveDescription = description || `Click to see this feature in action with Touchpoint.`; // Default or provided description
  const effectiveButtonLabel = buttonLabel || `Launch ${pageTitle} Example`;


  const handleLaunch = () => {
    if (instance && conversationHandler) {
      instance.expanded = true;

      const context = {
        TouchpointComponentExampleContextVar: pageTitle,
        ...additionalContext,
      };

      if (intentName) {
        console.log(`Sending intent "${intentName}" with context for ${pageTitle}:`, context);
        conversationHandler.sendIntent(intentName, context);
      } else {
        console.log(`Sending welcome intent with context for ${pageTitle}:`, context);
        conversationHandler.sendWelcomeIntent(context);
      }
    } else {
      console.warn(
        "Touchpoint instance or conversationHandler is not available for page:",
        pageTitle,
      );
    }
  };

  return (
    <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
      {/* Heading for the button section - matches screenshot style */}
      <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-80)', marginBottom: '0.75rem' }}>
        {titleForDisplay}
      </h3>

      {/* Description text - matches screenshot style */}
      <p style={{ fontSize: '0.9rem', color: 'var(--primary-60)', marginBottom: '1rem' }}>
        {effectiveDescription}
      </p>

      {/* The actual button */}
      <button
        onClick={handleLaunch}
        disabled={!isTouchpointReady}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          cursor: isTouchpointReady ? 'pointer' : 'not-allowed',
          backgroundColor: isTouchpointReady ? 'var(--accent)' : 'var(--primary-10)',
          color: isTouchpointReady ? 'var(--secondary-80)' : 'var(--primary-40)',
          border: 'none',
          borderRadius: 'var(--inner-border-radius)', // Standard inner radius
          fontWeight: 500,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: isTouchpointReady ? 1 : 0.6,
        }}
        title={isTouchpointReady ? effectiveButtonLabel : "Touchpoint is not ready"}
      >
        <span style={{width: '1.2rem', height: '1.2rem'}}><TouchpointIcon /></span>
        {effectiveButtonLabel}
      </button>

      {/* Optional: Feedback if Touchpoint is not ready */}
      {!isTouchpointReady && (
        <p style={{ color: 'var(--warning-primary)', fontSize: '0.8rem', marginTop: '0.75rem' }}>
          Touchpoint is initializing or not available. Please wait or check console for errors.
        </p>
      )}
    </div>
  );
};