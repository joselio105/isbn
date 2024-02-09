import { getCutterCode } from "../utils/cutter.js";
import { copyContent } from "../utils/handlers.js";
import { createErrorMessage, createLoading } from "./components.js";
import { createElement } from "./index.js";

const container = document.querySelector("#response>div");
const menu = document.getElementById("isbn-list");
const formSearch = document.getElementById("search-form");
const formResponse = document.getElementById("form-result");
const titleResponse = document.getElementById("title-result");
const fieldsResponse = formResponse.querySelectorAll("input");
const nav = document.getElementById("nav-main");
const marcCode = document.querySelector("#marc-code code");

export const resetRender = () => {
  localStorage.clear();
  nav.style.display = "none";
  formSearch.style.display = "block";
  container.parentElement.style.display = "none";
  menu.innerHTML = "";
};

export const renderLoading = () => {
  container.parentElement.style.display = "block";
  container.parentElement.appendChild(createLoading());
};

export const clearLoading = () => {
  const loading = document.getElementById("loading");
  if (loading) {
    const container = loading.parentElement;
    container.removeChild(loading);
  }
};

export const renderMenu = (isbn) => {
  nav.style.display = "flex";
  formSearch.style.display = "none";
  container.parentElement.style.display = "block";

  const button = createElement("button", {
    textContent: isbn,
    id: isbn,
  });
  menu.appendChild(button);
};

export const renderForm = async (book) => {
  const bookInfo = localStorage.getItem(book.isbn)
    ? JSON.parse(localStorage.getItem(book.isbn))
    : book;
  bookInfo.message ? renderErrorMessage(bookInfo) : fillFormResponse(bookInfo);
};

const fillFormResponse = (book) => {
  formResponse.style.display = "flex";
  titleResponse.innerText = `ISBN: ${book.isbn}`;

  Object.values(fieldsResponse).forEach((field) => {
    const button = field.parentElement.querySelector("button");

    const [boxId, fieldId] = field.id.split("-");
    const content = book[boxId][fieldId];
    field.value = content;

    field.addEventListener("change", () => {
      if (button) {
        button.disabled = field.value === 0;
      }
    });

    field.addEventListener("keyup", () => {
      if (button) {
        button.disabled = field.value === 0;
      }
    });

    if (button) {
      button.addEventListener("click", copyContent);
      button.disabled = content.length === 0;
    }
  });
};

const renderErrorMessage = (book) => {
  formResponse.style.display = "none";
  const message = createErrorMessage(book);
  message.style.display = "flex";
  container.appendChild(message);
};

export const renderMarcCode = (book) => {
  const bookInfo = localStorage.getItem(book.isbn)
    ? JSON.parse(localStorage.getItem(book.isbn))
    : book;
  marcCode.innerHTML = "";
  marcCode.innerText = JSON.stringify(bookInfo);
};
