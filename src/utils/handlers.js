import {
  clearLoading,
  renderForm,
  renderLoading,
  renderMenu,
} from "../render/interfaces.js";
import { getBookInfo } from "./api.js";
import { parseBookFieldsToForm, parseBookFromApiToForm } from "./cutter.js";

const input = document.getElementById("isbn");

export const findBooksByIsbn = async (event) => {
  event.preventDefault();
  const isbnList = input.value.split(" ");
  renderLoading();
  await isbnList.forEach(async (isbn, key) => {
    getBookInfo(isbn)
      .then(async (book) => {
        console.log(book);
        const bookInfo = parseBookFromApiToForm(
          book,
          key,
          isbn.replaceAll("-", "")
        );
        renderMenu(bookInfo);
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
  renderForm(values);
};
