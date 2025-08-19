import {
  computeAccessibleName,
  computeAccessibleDescription,
} from "dom-accessibility-api";

/**
 * Accessibility information
 */
export type AccessibilityInformation = Record<string, any>;

/**
 * Accessibility information with ID
 */
export interface InteractiveElementInfo extends AccessibilityInformation {
  /**
   * Form element ID (assigned by the analysis logic, not necessarily equal to the DOM ID)
   */
  id: string;
}

/**
 * Page forms with elements
 */
export interface PageForms {
  /**
   * Page context
   */
  context: InteractiveElementInfo[];
  /**
   * Form element references
   */
  formElements: Record<string, Element>;
}

const inputAndTextareaSpecificAccessibilityInformation = (
  element: HTMLInputElement | HTMLTextAreaElement,
): { value: any; options?: any } => {
  if (element instanceof HTMLTextAreaElement) {
    return { value: element.value };
  }
  if (element.type === "checkbox") {
    return {
      value: element.checked,
      options: [
        { value: true, selected: element.checked, text: "checked" },
        { value: false, selected: !element.checked, text: "unchecked" },
      ],
    };
  }
  return { value: element.value };
};

const toAccessibilityInformation = (
  element: Element,
): AccessibilityInformation => {
  if (
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement
  ) {
    const accessibleName = computeAccessibleName(element) ?? "";
    return {
      name: accessibleName === "" ? element.name : accessibleName,
      description: computeAccessibleDescription(element),
      type: element.type,
      placeholder: element.placeholder,
      ...inputAndTextareaSpecificAccessibilityInformation(element),
    };
  } else if (element instanceof HTMLSelectElement) {
    const accessibleName = computeAccessibleName(element) ?? "";
    return {
      name: accessibleName === "" ? element.name : accessibleName,
      description: computeAccessibleDescription(element),
      type: element.type,
      value: element.value,
      options: Array.from(element.options).map((option) => ({
        value: option.value,
        text: option.text,
        selected: option.selected,
      })),
    };
  }
  throw new TypeError("Unsupported element type");
};

/**
 * Analyze page forms
 * @returns pageForms
 */
export const analyzePageForms = (): PageForms => {
  const interactiveNodes = Array.from(
    document.querySelectorAll("input, textarea, select"),
  );

  const elementInfo = interactiveNodes.map((element, index) => ({
    index,
    id: `${element.tagName.toLowerCase()}-${index}`,
    element,
  }));

  // TODO: consider using a `Map` here for more performant access
  const formElements: Record<string, Element> = {};

  elementInfo.forEach(({ id, element }) => {
    formElements[id] = element;
  });

  return {
    context: elementInfo.map(({ id, element }) => ({
      id,
      ...toAccessibilityInformation(element),
    })),
    formElements,
  };
};
