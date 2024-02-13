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
const fieldCdd082 = document.getElementById("082-0");
const fieldCdd090 = document.getElementById("090-0");

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
        setSelectValue();
      }
    });
  });
};

export const updateForm = async (event) => {
  event.preventDefault();
  const form = event.target;
  const fields = form.querySelectorAll(".field-content");

  const values = parseBookFieldsToForm(fields);
  localStorage.setItem(values.isbn, JSON.stringify(values));
  renderResponse(values);
};

export const copyContent = async (event) => {
  const button = event.currentTarget;
  const text = button.innerText;
  const fieldValue = button.parentElement.querySelector(".field-content");
  const codeValue = button.parentElement.querySelector("pre code");

  button.innerText = "Copiando...";

  if (fieldValue) {
    console.log(fieldValue);
    await navigator.clipboard.writeText(fieldValue.value);
  } else {
    button.parentElement.children;
  }

  if (codeValue) {
    await navigator.clipboard.writeText(codeValue.innerText);
  }

  setTimeout(() => {
    button.innerText = text;
  }, 1000);
};

export const toggleView = (event) => {
  const input = event.currentTarget;
  const label = input.parentElement;

  if (input.checked) {
    formResponse.style.display = "none";
    marcCode.style.display = "flex";
    localStorage.setItem("isMarkView", true);
    label.querySelector("span").innerText = "Marc";
  } else {
    formResponse.style.display = "block";
    marcCode.style.display = "none";
    localStorage.removeItem("isMarkView");
    label.querySelector("span").innerText = "Formulário";
  }
  renderResponse();
};

export const getCurrentBookStored = () => {
  const currentId = localStorage.getItem("currentId");
  console.log(currentId);
  if (currentId) {
    return JSON.parse(localStorage.getItem(currentId));
  }

  return false;
};

export const setSelectValue = () => {
  [fieldCdd082, fieldCdd090].forEach((field) => {
    const [boxId, position] = field.id.split("-");
    const currentBookStored = getCurrentBookStored();

    if (currentBookStored) {
      const options = field.children;
      // console.log(currentBookStored[boxId][position]);
      Object.values(options).forEach((option) => {
        console.log(option.value, "->", currentBookStored[boxId][position]);
        if (option.value === currentBookStored[boxId][position]) {
          field.selected = true;
        }
      });
    }
  });
};
