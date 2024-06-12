/* eslint-disable accessor-pairs */
import { type Client } from "@nlxai/voice-compass";

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

/**
 * Deep partial variant of the UI theme, input by the library user
 */
export interface PartialTheme {
  /**
   * UI colors
   */
  colors?: Partial<ThemeColors>;
  /**
   * Font family
   */
  fontFamily?: string;
}

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
   * UI theme
   */
  theme?: PartialTheme;
  /**
   * Escalation step ID
   */
  escalationStep?: string;
  /**
   * End step ID
   */
  endStep?: string;
}

const defaultTheme: Theme = {
  colors: {
    primary: "",
    primaryHover: "",
  },
  fontFamily: "sans-serif",
};

const mergeWithDefault = (partial?: PartialTheme): Theme => ({
  ...defaultTheme,
  ...(partial ?? {}),
  colors: {
    ...defaultTheme.colors,
    ...(partial?.colors ?? {}),
  },
});

const styles = (theme: Theme): string => `
* {
  font-family: ${theme.fontFamily};
  font-size: 14px;
}

h1,
p {
  margin: 0;
}

.pin,
.drawer {
  --primary: ${theme.colors.primary};
  --primary-hover: ${theme.colors.primaryHover};
}

button {
  cursor: pointer;
}

@keyframes fadein {
  0% {
    opacity: 0%;
  } 
  100% {
    opacity: 100%;
  }
}

@keyframes slideup {
  0% {
    transform: translateY(8px);
  } 
  100% {
    transform: translateY(0px);
  }
}

.pin {
  width: 48px;
  height: 48px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  padding: 8px;
  border-radius: 100%;
  background-color: var(--primary);
  color: white;
  position: fixed;
  border: none;
  bottom: 12px;
  right: 12px;
}

.pin:hover {
  background-color: var(--primary-hover);
}

.drawer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  transform: translateY(100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.drawer-open {
  transform: translateY(0%);
  animation: fadein 0.3s normal forwards ease-in-out;
}

.drawer-content {
  background-color: white;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 20px;
}

.drawer-open .drawer-content {
  animation: slideup 0.3s normal forwards ease-in-out;
}

.drawer-content > * {
  max-width: 320px;
  margin-left: auto;
  margin-right: auto;
}

.drawer-content > * + * {
  margin-top: 20px;
}

/* Header */

.drawer-header {
  text-align: center;
}

.drawer-header > * + * {
  margin-top: 6px;
}

.drawer-header h1 {
  font-size: 14px;
}
 
.drawer-header p {
  font-size: 14px;
  color: #777;
}

/* Buttons */

.drawer-buttons {
}

.drawer-buttons > * + * {
  margin-top: 10px;
}

.drawer-buttons button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background: transparent;
  color: #333;
  padding: 4px;
  border: 1px solid #bcbcbc;
}

.drawer-buttons button svg {
  flex: 0 0 12px;
  height: 12px;
  display: inline-block;
  margin-right: 4px;
}

.drawer-buttons button:hover {
  color: #000;
  border: 1px solid #ababab;
}

/* Footer */

.drawer-footer {
  text-align: center;
}

.drawer-footer button {
  border: none;
  background: none;
}

.drawer-footer button:hover {
}
`;

const voiceCompassIcon = `
<svg viewBox="0 0 24 24" stroke="none" fill="currentColor">
  <path d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C11.4477 20 11 20.4477 11 21C11 21.5523 11.4477 22 12 22C16.456 22 20.2313 19.0855 21.5236 15.0587C22.3766 14.8106 23 14.0231 23 13.09V11.09C23 10.1795 22.4064 9.40764 21.5851 9.14028C20.3549 5.01091 16.5291 2 12 2C7.47091 2 3.64506 5.01091 2.41488 9.14028C1.59358 9.40764 1 10.1795 1 11.09V13.09C1 14.1666 1.82988 15.0493 2.88483 15.1334C2.92262 15.1378 2.96105 15.14 3 15.14C3.55228 15.14 4 14.6923 4 14.14V12Z"></path>
  <path d="M10.09 10.8L15.2453 6.27083L13.9005 13L8.74526 17.5292L10.09 10.8ZM12.8613 12.4C12.5851 12.8783 11.9735 13.0422 11.4953 12.766C11.017 12.4899 10.8531 11.8783 11.1292 11.4C11.4054 10.9217 12.017 10.7578 12.4953 11.034C12.9735 11.3101 13.1374 11.9217 12.8613 12.4Z"></path>
</svg>
`;

const supportAgentIcon = `
<svg viewBox="0 0 24 24" stroke="none" fill="currentColor">
  <path d="M21 12.22C21 6.73 16.74 3 12 3c-4.69 0-9 3.65-9 9.28-.6.34-1 .98-1 1.72v2c0 1.1.9 2 2 2h1v-6.1c0-3.87 3.13-7 7-7s7 3.13 7 7V19h-8v2h8c1.1 0 2-.9 2-2v-1.22c.59-.31 1-.92 1-1.64v-2.3c0-.7-.41-1.31-1-1.62"></path>
  <circle cx="9" cy="13" r="1"></circle>n
  <circle cx="15" cy="13" r="1"></circle>
  <path d="M18 11.03C17.52 8.18 15.04 6 12.05 6c-3.03 0-6.29 2.51-6.03 6.45 2.47-1.01 4.33-3.21 4.86-5.89 1.31 2.63 4 4.44 7.12 4.47"></path>
</svg>
`;

const arrowBackIcon = `
<svg viewBox="0 0 24 24" stroke="none" fill="currentColor">
  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"></path>
</svg>
`;

/**
 * @hidden @internal
 */
export class JourneyManagerElement extends HTMLElement {
  _teardown: (() => void) | null = null;
  _client: Client | null = null;

  /**
   * Set Voice Compass client
   */
  set client(client: Client) {
    this._client = client;
  }

  /**
   * Set UI configuration
   */
  set config(config: UiConfig) {
    this._teardown?.();

    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
<style>${styles(mergeWithDefault(config.theme))}</style>
<button class="pin">${voiceCompassIcon}</button>
<div class="drawer">
  <div class="drawer-content">
    <div class="drawer-header">
      <h1>${config.title}</h1>
      <p>${config.subtitle}</p>
    </div>
    <div class="drawer-buttons">
      <button data-action="previous">
        ${arrowBackIcon}
        <span>Previous Screen</span>
      </button>
      <button data-action="escalate">
        ${supportAgentIcon}
        Escalate to Agent
      </button>
    </div>
    <div class="drawer-footer">
      <button data-action="close">Close</button>
    </div>
  </div>
</div>
`;

    let isOpen = false;

    const pinButton = shadow.querySelector(".pin");
    const drawer = shadow.querySelector(".drawer");
    const drawerContent = shadow.querySelector(".drawer-content");

    const toggleDrawer = (): void => {
      isOpen = !isOpen;
      if (isOpen) {
        drawer?.classList.add("drawer-open");
      } else {
        drawer?.classList.remove("drawer-open");
      }
    };

    const handlePinButtonClick = (): void => {
      toggleDrawer();
    };

    const handleDrawerClick = (event: Event): void => {
      const eventTarget = event.target;
      if (!(eventTarget instanceof HTMLElement)) {
        return;
      }

      const action = eventTarget.getAttribute("data-action");
      if (action != null) {
        if (action === "close") {
          toggleDrawer();
          return;
        }
        this.dispatchEvent(
          new CustomEvent("action", {
            detail: {
              action,
            },
          }),
        );
        return;
      }
      if (drawerContent != null && !drawerContent?.contains(eventTarget)) {
        toggleDrawer();
      }
    };

    pinButton?.addEventListener("click", handlePinButtonClick);
    drawer?.addEventListener("click", handleDrawerClick);

    this._teardown = () => {
      pinButton?.removeEventListener("click", handlePinButtonClick);
      drawer?.removeEventListener("click", handleDrawerClick);
    };
  }

  /**
   * Teardown logic for custom element
   */
  disconnectedCallback(): void {
    this._teardown?.();
  }
}
