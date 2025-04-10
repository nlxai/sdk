const toAccessibilityInformation = (element: Element) => {
  // TODO: comprehensively access accessibility information
  if (
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement
  ) {
    return {
      name: element.name,
      type: element.type,
      placeholder: element.placeholder,
      content: element.value,
    };
  }
  return {};
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
