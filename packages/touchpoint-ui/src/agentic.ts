import {
  computeAccessibleName,
  computeAccessibleDescription,
} from "dom-accessibility-api";
const toAccessibilityInformation = (element: Element) => {
  if (
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement
  ) {
    return {
      name: computeAccessibleName(element),
      description: computeAccessibleDescription(element),
      type: element.type,
      placeholder: element.placeholder,
      value: element.value,
    };
  } else if (element instanceof HTMLSelectElement) {
    return {
      name: computeAccessibleName(element),
      description: computeAccessibleDescription(element),
      type: element.type,
      value: element.value,
    };
  } else if (element instanceof HTMLButtonElement) {
    return {
      name: computeAccessibleName(element),
      description: computeAccessibleDescription(element),
      type: element.type,
    };
  }
  throw new TypeError("Unsupported element type");
};

const getContext = () => {
  const interactiveNodes = Array.from(
    document.querySelectorAll(
      "form input, form textarea, form select, form checkbox, form radio, form button",
    ),
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
