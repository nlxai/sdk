import {
  computeAccessibleName,
  computeAccessibleDescription,
} from "dom-accessibility-api";

type AccessibilityInformation = Record<string, any>;

interface InteractiveElementInfo extends AccessibilityInformation {
  id: string;
}

interface PageForms {
  context: InteractiveElementInfo[];
  formElements: Record<string, Element>;
}

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
      value: element.value,
    };
  } else if (element instanceof HTMLSelectElement) {
    const accessibleName = computeAccessibleName(element) ?? "";
    return {
      name: accessibleName === "" ? element.name : accessibleName,
      description: computeAccessibleDescription(element),
      type: element.type,
      value: element.value,
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
    document.querySelectorAll("form input, form textarea, form select"),
  );

  const elementInfo = interactiveNodes.map((element, index) => ({
    index,
    id: `${element.tagName.toLowerCase()}-${index}`,
    element,
  }));

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
