import { boxes } from "../../data/boxesInfo.js";
import { themes } from "../../data/themes.js";
import { updateForm } from "../utils/handlers.js";
import { createElement } from "./index.js";

export const createLoading = () => {
  return createElement("div", {
    id: "loading",
    textContent: "Carregando...",
    class: "loading",
  });
};

export const createForm = async (book) => {
  const { id, isbn } = book;
  const form = createElement("form", { id });
  const wrapper = createWrapper(isbn);

  boxes.forEach((boxInfo) => {
    const box = createBox(boxInfo);
    boxInfo.fields.forEach((fieldInfo, key) => {
      const field = createField({ fieldInfo, boxCode: boxInfo.id, key, book });
      box.appendChild(field);
    });

    wrapper.appendChild(box);
  });

  form.appendChild(wrapper);
  form.appendChild(createFormFooter());

  form.addEventListener("submit", updateForm);
  return form;
};

export const createFormFooter = () => {
  const footer = createElement("footer");
  footer.appendChild(
    createElement("button", { type: "submit", textContent: "Atualizar" })
  );

  return footer;
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

export const createField = ({
  fieldInfo: { label, value, ...fieldInfo },
  boxCode,
  key,
  book,
}) => {
  const field = createElement("div", { class: "box-field" });
  const labelTag = createElement("span", {
    class: "field-label",
    textContent: label,
  });

  const content = createElement("input", {
    class: "field-content",
    id: `${boxCode}-${key}`,
    value: book[boxCode][key] ?? value,
    ...fieldInfo,
  });

  field.appendChild(labelTag);
  field.appendChild(content);
  if (fieldInfo.list) {
    field.appendChild(createDatalist(themes, fieldInfo.list));
  }
  return field;
};

export const createDatalist = (list, id) => {
  const datalist = createElement("datalist", { id });
  list.forEach((item) => {
    const option = createElement("option", { textContent: item[1] });
    datalist.appendChild(option);
  });

  return datalist;
};
