import { copyContent } from "../utils/handlers.js";
import { createErrorMessage, createLoading } from "./components.js";
import { createElement } from "./index.js";

const menu = document.getElementById("isbn-list");
const formResponse = document.getElementById("form-result");
const formSearch = document.getElementById("search-form");
const responseWrapper = formResponse.parentElement;
const titleResponse = document.getElementById("title-result");
const fieldsResponse = formResponse.querySelectorAll("input");
const nav = document.getElementById("nav-main");
const marcCode = document.querySelector("#marc-code code");
const responseMarcCode = document.querySelector("#marc-code");
const messageElement = document.getElementById("error-message");

export const resetRender = () => {
  localStorage.clear();
  nav.style.display = "none";
  formSearch.style.display = "block";
  responseWrapper.style.display = "none";
  menu.innerHTML = "";
};

export const renderLoading = () => {
  responseWrapper.style.display = "block";
  responseWrapper.appendChild(createLoading());
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

  const button = createElement("button", {
    textContent: isbn,
    id: isbn,
  });
  menu.appendChild(button);
};

export const renderResponse = () => {
  responseWrapper.parentElement.style.display = "block";
  responseWrapper.style.display = "flex";
  formSearch.style.display = "none";

  const isMarcCode = localStorage.getItem("isMarkView") ?? false;
  const currentId = localStorage.getItem("currentId");
  const bookInfo = JSON.parse(localStorage.getItem(currentId));

  titleResponse.innerText = `ISBN: ${bookInfo.isbn}`;

  bookInfo.message
    ? renderErrorMessage(bookInfo)
    : isMarcCode
    ? fillMarcResponse(bookInfo)
    : fillFormResponse(bookInfo);
};

const fillFormResponse = (book) => {
  formResponse.style.display = "block";
  responseMarcCode.style.display = "none";
  messageElement.innerHTML = "";

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
  responseMarcCode.style.display = "none";

  if (messageElement) {
    messageElement.innerText = book.message;
  } else {
    const message = createErrorMessage(book);
    message.style.display = "flex";
    responseWrapper.appendChild(message);
  }
};

const fillMarcResponse = (book) => {
  messageElement.innerHTML = "";
  formResponse.style.display = "none";
  responseMarcCode.style.display = "flex";

  marcCode.style.display = "flex";
  marcCode.innerHTML = "";
  marcCode.innerText = JSON.stringify(book);
};
