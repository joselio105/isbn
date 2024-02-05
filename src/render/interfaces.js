import { createErrorMessage, createForm, createLoading } from "./components.js";
import { createElement } from "./index.js";

const container = document.querySelector("#response>div");
const menu = document.getElementById("isbn-list");
const form = document.getElementById("search-form");
const nav = document.getElementById("nav-main");

export const resetRender = () => {
  nav.style.display = "none";
  form.style.display = "block";
  container.parentElement.style.display = "none";
  menu.innerHTML = "";
};

export const renderLoading = () => {
  container.parentElement.style.display = "block";
  container.parentElement.appendChild(createLoading());
};

export const clearLoading = () => {
  const loading = document.getElementById("loading");
  const container = loading.parentElement;
  container.removeChild(loading);
};

export const renderMenu = (book) => {
  nav.style.display = "flex";
  form.style.display = "none";
  container.parentElement.style.display = "block";

  const button = createElement("button", {
    textContent: book.isbn,
    id: book.id,
  });
  button.addEventListener("click", () => {
    renderForm(book);
  });
  menu.appendChild(button);
  renderForm(book);
};

export const renderForm = async (book) => {
  container.innerHTML = "";

  const content = book.message
    ? createErrorMessage(book)
    : await createForm(book);
  container.appendChild(content);
};
