import { fillForm } from "../../data/boxesInfo.js";
import { createElement } from "./index.js";

export const createLoading = () => {
  return createElement("div", {
    id: "loading",
    textContent: "Carregando...",
    class: "loading",
  });
};

export const createForm = (book) => {
  const { id, isbn } = book;
  const form = createElement("form", { id: `form-${id}` });
  const wrapper = createWrapper(isbn);

  fillForm(book).forEach((boxInfo) => {
    const box = createBox(boxInfo);
    boxInfo.fields.forEach((fieldInfo) => {
      const field = createField(fieldInfo);
      box.appendChild(field);
    });

    wrapper.appendChild(box);
  });

  form.appendChild(wrapper);
  return form;
};

export const createErrorMessage = ({ isbn, message }) => {
  const wrapper = createWrapper(isbn);
  const span = createElement("span", {
    textContent: message,
    class: "error-message",
  });

  wrapper.appendChild(span);
  return wrapper;
};

export const createWrapper = (isbn) => {
  const wrapper = createElement("div", { class: "wrapper" });
  const title = createElement("strong", {
    textContent: isbn,
    class: "title",
  });

  wrapper.appendChild(title);
  return wrapper;
};

export const createBox = (boxInfo) => {
  const box = createElement("div", { class: "box" });
  const title = createElement("strong", {
    textContent: boxInfo.title,
    class: "title",
  });

  box.appendChild(title);
  return box;
};

export const createField = (fieldInfo) => {
  const field = createElement("div", { class: "box-field" });
  const label = createElement("span", {
    class: "field-label",
    textContent: fieldInfo.label,
  });

  const contentAttributes =
    fieldInfo.content.length > 0
      ? {
          class: "field-content",
          textContent: fieldInfo.content,
        }
      : {
          class: "field-placeholder",
          placeholder: fieldInfo.placeholder,
        };
  const content = createElement("input", {
    class: "field-content",
    id: fieldInfo.id,
    value: fieldInfo.content,
    placeholder: fieldInfo.placeholder,
  });

  field.appendChild(label);
  field.appendChild(content);
  return field;
};
