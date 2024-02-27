import {
  clearLoading,
  fillMarcResponse,
  renderErrorMessage,
  renderLoading,
  renderResponse,
} from "../render/interfaces.js";
import { getBookInfo } from "./api.js";
import { parseBookFieldsToForm, parseBookFromApiToForm } from "./cutter.js";

const formResponse = document.getElementById("form-result");
const mainMenu = document.getElementById("nav-main");
const marcCode = document.getElementById("marc-code");
const inputSearch = document.getElementById("isbn");
const fieldIsbn = document.getElementById("082-2");
const fieldCdd082 = document.getElementById("082-0");
const fieldCdd090 = document.getElementById("090-0");
const fieldauthor100 = document.getElementById("100-0");

export const findBooksByIsbn = async (event) => {
  event.preventDefault();
  const isbn = inputSearch.value;
  renderLoading();
  getBookInfo(isbn)
    .then(async (book) => {
      const bookInfo = parseBookFromApiToForm(book, isbn.replaceAll("-", ""));

      if (bookInfo.message) {
        renderErrorMessage(bookInfo);
      } else {
        fillFormWithLastBook(bookInfo);
      }
    })
    .finally(() => {
      mainMenu.style.display = "flex";
      clearLoading();
    });
};

const fillFormWithLastBook = (bookInfo) => {
  localStorage.setItem("currentId", bookInfo.isbn);
  renderResponse(bookInfo);
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

  if (fieldCdd082.value.length === 0) {
    alert("É necessário definir um tema para o livro");
  } else {
    const values = parseBookFieldsToForm(fields);
    renderResponse(values);
    alert("Dados atualizados");
  }
};

export const forceUpdateForm = () => {
  const fields = formResponse.querySelectorAll(".field-content");

  if (fieldCdd082.value.length === 0) {
    fieldCdd082.classList.add("fail");
    throw new Error("É necessário definir um tema para o livro");
  }
  if (fieldCdd090.value.length === 0) {
    fieldCdd090.classList.add("fail");
    throw new Error("É necessário definir um tema para o livro");
  }
  if (fieldauthor100.value.length === 0) {
    fieldauthor100.classList.add("fail");
    throw new Error("É necessário definir um tema para o livro");
  }

  const values = parseBookFieldsToForm(fields);
  return values;
};

export const copyContent = async (event) => {
  const button = event.currentTarget;

  const text = button.innerText;
  const fieldValue = button.parentElement.querySelector(".field-content");
  const codeValue = button.parentElement.querySelector("pre code");

  button.innerText = "Copiando...";

  if (fieldValue) {
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
  console.log(input.checked);

  localStorage.setItem("isMarkView", input.checked);
  label.querySelector("span").innerText = input.checked ? "Marc" : "Formulário";

  if (input.checked) {
    try {
      const values = forceUpdateForm();
      formResponse.style.display = "none";
      marcCode.style.display = "flex";
      fillMarcResponse(values);
    } catch (error) {
      input.checked = false;
      alert(error);
    }
  } else {
    formResponse.style.display = "block";
    marcCode.style.display = "none";
    localStorage.removeItem("isMarkView");
  }
};

export const getCurrentBookStored = () => {
  const currentId = fieldIsbn.value;

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
      field.value = currentBookStored[boxId][position];
    }
  });
};
