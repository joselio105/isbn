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
  formSearch.style.display = "flex";
  responseWrapper.parentElement.style.display = "none";
  responseWrapper.style.display = "none";
  menu.innerHTML = "";
};

export const renderLoading = () => {
  responseWrapper.parentElement.style.display = "block";
  responseWrapper.style.display = "block";
  Object.values(responseWrapper.children).forEach(
    (child) => (child.style.display = "none")
  );
  responseWrapper.appendChild(createLoading());
};

export const clearLoading = () => {
  const loading = document.getElementById("loading");
  if (loading) {
    const container = loading.parentElement;
    container.removeChild(loading);
  }
};

export const renderResponse = (bookInfo) => {
  responseWrapper.parentElement.style.display = "block";
  responseWrapper.style.display = "flex";
  formSearch.style.display = "none";

  const isMarcCode = localStorage.getItem("isMarkView") ?? false;
  titleResponse.innerText = `ISBN: ${bookInfo["082"][1]}`;

  bookInfo.message
    ? renderErrorMessage(bookInfo)
    : isMarcCode
    ? fillMarcResponse(bookInfo)
    : fillFormResponse(bookInfo);
};

export const fillFormResponse = (book) => {
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

export const renderErrorMessage = (book) => {
  formResponse.style.display = "block";
  responseMarcCode.parentElement.style.display = "block";
  responseMarcCode.style.display = "none";

  if (messageElement) {
    messageElement.style.display = "flex";
    messageElement.innerText = book.message;
  } else {
    const message = createErrorMessage(book);
    message.style.display = "flex";
    responseWrapper.parentElement.appendChild(message);
  }
};

export const fillMarcResponse = (book) => {
  messageElement.innerHTML = "";
  formResponse.style.display = "none";
  responseMarcCode.style.display = "flex";

  marcCode.style.display = "flex";

  book["082"] = [book["082"][0]];
  marcCode.innerText = `005 ${getTime()}\n020 ${book.isbn}${
    getCode(book, "082").length > 0 ? `\n082 __${getCode(book, "082")}` : ""
  }${getCode(book, "090").length > 0 ? `\n090 __${getCode(book, "090")}` : ""}${
    getCode(book, "100").length > 0 ? `\n100 __${getCode(book, "100")}` : ""
  }${getCode(book, "245").length > 0 ? `\n245 __${getCode(book, "245")}` : ""}${
    getCode(book, "260").length > 0 ? `\n260 __${getCode(book, "260")}` : ""
  }${getCode(book, "300").length > 0 ? `\n300 __${getCode(book, "300")}` : ""}${
    getCode(book, "650").length > 0 ? `\n650 __${getCode(book, "650")}` : ""
  }
  `;
};

const getCode = (book, code) => {
  const response = [];
  const postions = ["a", "b", "c"];

  book[code].forEach((codePart, key) => {
    if (codePart.length > 0) {
      response.push(`|${postions[key]}${codePart}`);
    }
  });

  return response.join("");
};

const getTime = () => {
  const dataObject = new Date();
  const year = String(dataObject.getFullYear()).padStart(2, "0");
  const month = String(dataObject.getMonth()).padStart(2, "0");
  const day = String(dataObject.getDate()).padStart(2, "0");
  const hour = String(dataObject.getHours()).padStart(2, "0");
  const minute = String(dataObject.getMinutes()).padStart(2, "0");
  const second = String(dataObject.getSeconds()).padStart(2, "0");
  const milisecond = dataObject.getMilliseconds();

  return `${year}${month}${day}${hour}${minute}${second}.${milisecond}`;
};
