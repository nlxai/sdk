/* eslint-disable jsdoc/require-jsdoc */
import tinycolor from "tinycolor2";
import type { UiConfig } from "../configuration";
import global from "./global.css";

export const createGlobalStyles = (
  config: UiConfig,
): HTMLStyleElement | null => {
  if (config.highlightStrategy !== "overlay") {
    const highlight = tinycolor(
      config.theme?.colors?.highlight ?? "rgba(38, 99, 218, 1)",
    ).toRgb();
    const style = document.createElement("style");
    style.textContent = `
      * {--nlx-highlightR: ${highlight.r};--nlx-highlightG: ${highlight.g};--nlx-highlightB: ${highlight.b};}${global}`;
    document.head.appendChild(style);
    return style;
  }
  return null;
};

const possibleClasses = [
  "nlx-highlight-no-shadow-no-animation",
  "nlx-highlight-no-shadow-existing-animation",
  "nlx-highlight-existing-shadow-no-animation",
  "nlx-highlight-existing-shadow-existing-animation",
];

const applyHighlight = (element: HTMLElement): HTMLElement => {
  if (
    !possibleClasses.some((className) => element.classList.contains(className))
  ) {
    const computedStyles = window.getComputedStyle(element);
    const boxShadow = computedStyles.getPropertyValue("box-shadow");
    const animation = computedStyles.getPropertyValue("animation-name");

    if (boxShadow === "none" && animation === "none") {
      element.classList.add("nlx-highlight-no-shadow-no-animation");
    } else if (animation === "none") {
      element.style.setProperty("--nlx-existing-box-shadow", boxShadow);
      element.classList.add("nlx-highlight-existing-shadow-no-animation");
    } else if (boxShadow === "none") {
      element.style.setProperty(
        "--nlx-existing-animation",
        computedStyles.getPropertyValue("animation"),
      );
      element.classList.add("nlx-highlight-no-shadow-existing-animation");
    } else {
      element.style.setProperty("--nlx-existing-box-shadow", boxShadow);
      element.style.setProperty(
        "--nlx-existing-animation",
        computedStyles.getPropertyValue("animation"),
      );
      element.classList.add("nlx-highlight-existing-shadow-existing-animation");
    }
  }

  return element;
};

const cleanup = (element: HTMLElement): void => {
  element.style.removeProperty("--nlx-existing-box-shadow");
  element.style.removeProperty("--nlx-existing-animation");
  element.classList.remove(...possibleClasses);
};

let prevElements: HTMLElement[] = [];
let timeout: number | null = null;
let styleTag: HTMLElement | null = null;

export default (config: UiConfig, highlightElements: HTMLElement[]): void => {
  if (timeout != null) {
    window.clearTimeout(timeout);
  }
  timeout = window.setTimeout(() => {
    if (styleTag == null) {
      styleTag = createGlobalStyles(config);
    }
    prevElements
      .filter((element) => !highlightElements.includes(element))
      .forEach(cleanup);
    prevElements = highlightElements.map(applyHighlight);

    timeout = null;
  }, 100);
};

export const teardown = (): void => {
  if (timeout != null) {
    window.clearTimeout(timeout);
  }
  if (styleTag != null) {
    styleTag.remove();
  }
  prevElements.forEach(cleanup);
};
