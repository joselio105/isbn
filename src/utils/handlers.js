import {
  clearLoading,
  renderForm,
  renderLoading,
  renderMarcCode,
  renderMenu,
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
    renderMenu(isbn);
    getBookInfo(isbn)
      .then(async (book) => {
        const bookInfo = parseBookFromApiToForm(
          book,
          key,
          isbn.replaceAll("-", "")
        );

        Object.values(buttonsIsbn).forEach((button) => {
          button.addEventListener("click", (event) => {
            if (event.currentTarget.id === isbn) {
              renderForm(bookInfo);
              renderMarcCode(bookInfo);
            }
          });
        });

        localStorage.setItem(isbn, JSON.stringify(bookInfo));
        if (key === isbnList.length - 1) {
          renderForm(bookInfo);
          renderMarcCode(bookInfo);
        }
      })
      .finally(() => {
        clearLoading();
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
  const fieldValue = button.parentElement.querySelector("input").value;

  button.innerText = "Copiando...";
  await navigator.clipboard.writeText(fieldValue);
  setTimeout(() => {
    button.innerText = text;
  }, 1000);
};
