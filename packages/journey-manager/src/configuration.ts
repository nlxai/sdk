import type { Client } from "@nlxai/multimodal";

/**
 * Theme colors
 */
export interface ThemeColors {
  /**
   * Primary color
   */
  primary: string;
  /**
   * Primary color on hover
   */
  primaryHover: string;
  /**
   * Color for trigger highlights
   */
  highlight: string;
}

/**
 * Visual theme for the UI
 */
export interface Theme {
  /**
   * UI colors
   */
  colors: ThemeColors;
  /**
   * Font family
   */
  fontFamily: string;
}

/** Represents a load step that has already been triggered. */
export interface TriggeredStep {
  /** step id */
  stepId: string;
  /** the URL of the page it triggered on */
  url: string;
}

/** The argument for callbacks  */
export interface SimpleHandlerArg {
  /** A function to send steps to NLX. */
  sendStep: Client["sendStep"];
}

/** Used for some more advanced callbacks  */
export type HandlerArg = SimpleHandlerArg & {
  /** The steps that have been triggered. */
  triggeredSteps: TriggeredStep[];
};

/**
 * Button configuration
 */
export interface ButtonConfig {
  /**
   * Button label
   */
  label: string;
  /**
   * Button confirmation: if present, the button click handler only triggers after the confirmation button is hit
   */
  confirmation?: string;
  /**
   * Icon URL
   */
  iconUrl?: string;
  /**
   * Click handler
   */
  onClick: (config: HandlerArg) => void;
}

/** Makes every property optional recursively. */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer I>
    ? Array<DeepPartial<I>>
    : DeepPartial<T[P]>;
};

/**
 * Visual theme for the UI
 */
export type PartialTheme = DeepPartial<Theme>;

/**
 * Full UI configuration
 */
export interface UiConfig {
  /**
   * Drawer title
   */
  title: string;
  /**
   * Drawer subtitle
   */
  subtitle: string;
  /**
   * Render highlights
   */
  highlights?: boolean;
  /**
   * URL for the button icon
   */
  iconUrl?: string;
  /**
   * UI theme
   */
  theme?: PartialTheme;
  /**
   * Escalation handler
   */
  onEscalation?: (config: SimpleHandlerArg) => void;
  /**
   * Escalation button label
   */
  escalationButtonLabel?: string;
  /**
   * Escalation confirmation
   */
  escalationConfirmation?: string;
  /**
   * End handler
   */
  onEnd?: (config: SimpleHandlerArg) => void;
  /**
   * End button label
   */
  endButtonLabel?: string;
  /**
   * End confirmation
   */
  endConfirmation?: string;
  /**
   * On previous step
   */
  onPreviousStep?: (config: HandlerArg) => void;
  /**
   * Previous step button label
   */
  previousStepButtonLabel?: string;
  /**
   * Custom buttons
   */
  buttons?: ButtonConfig[];
  /**
   * If this is set, the journey manager will show a call-to-action tooltip to invite the user to interact with the overlay pin.
   * it will be shown only if the user never interacts with the overlay pin, after `tooltipShowAfterMs` milliseconds.
   */
  nudgeContent?: string;
  /**
   * Show nudge tooltip after this many milliseconds
   */
  nudgeShowAfterMs?: number;
  /**
   * Hide nudge tooltip after it's been shown for this many milliseconds
   */
  nudgeHideAfterMs?: number;
}
