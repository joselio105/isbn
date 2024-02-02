export const createElement = (tag, attributes = {}) => {
  const element = document.createElement(tag);
  Object.keys(attributes).forEach((attribute) => {
    if (attribute !== "textContent") {
      element.setAttribute(attribute, attributes[attribute]);
    }
  });
  if (attributes.textContent) {
    const textNode = document.createTextNode(attributes.textContent);
    element.appendChild(textNode);
  }
  return element;
};
