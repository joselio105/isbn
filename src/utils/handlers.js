import {
  clearLoading,
  renderLoading,
  renderMenu,
  renderResponse,
} from "../render/interfaces.js";
import { getBookInfo } from "./api.js";
import { parseBookFieldsToForm, parseBookFromApiToForm } from "./cutter.js";

const inputSearch = document.getElementById("isbn");
const buttonsIsbn = document.getElementById("isbn-list").children;

export const findBooksByIsbn = async (event) => {
  event.preventDefault();
  const isbnList = inputSearch.value.split(" ");
  renderLoading();
  await isbnList.forEach(async (isbn, key) => {
    renderMenu(isbn.replaceAll("-", ""));
    getBookInfo(isbn)
      .then(async (book) => {
        const bookInfo = parseBookFromApiToForm(
          book,
          key,
          isbn.replaceAll("-", "")
        );

        localStorage.setItem(bookInfo.isbn, JSON.stringify(bookInfo));
        setButtonsClickEvent(bookInfo);
        fillFormWithLastBook(key, bookInfo);
      })
      .finally(() => {
        clearLoading();
      });
  });
};

const fillFormWithLastBook = (key, bookInfo) => {
  if (key === 0) {
    localStorage.setItem("currentId", bookInfo.isbn);
    renderResponse(bookInfo);
  }
};

export const setButtonsClickEvent = (bookInfo) => {
  Object.values(buttonsIsbn).forEach((button) => {
    button.addEventListener("click", (event) => {
      if (event.currentTarget.id === bookInfo.isbn) {
        localStorage.setItem("currentId", bookInfo.isbn);
        renderResponse(bookInfo);
      }
    });
  });
};

export const updateForm = async (event) => {
  event.preventDefault();
  const form = event.target;
  const fields = form.querySelectorAll("input");

  const values = parseBookFieldsToForm(fields);
  localStorage.setItem(values.isbn, JSON.stringify(values));
  renderForm(values);
};

export const copyContent = async (event) => {
  const button = event.currentTarget;
  const text = button.innerText;
  const fieldValue = button.parentElement.querySelector("input");
  const codeValue = button.parentElement.querySelector("pre code");

  button.innerText = "Copiando...";

  if (fieldValue) {
    await navigator.clipboard.writeText(fieldValue.value);
  }

  if (codeValue) {
    await navigator.clipboard.writeText(codeValue.innerText);
  }

  setTimeout(() => {
    button.innerText = text;
  }, 1000);
};
