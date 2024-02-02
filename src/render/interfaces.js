import { createErrorMessage, createForm, createLoading } from "./components.js";
import { cutterTable } from "../../data/cutter.js";
import { createElement } from "./index.js";
import { showForm } from "../utils/handlers.js";
import { storage } from "../utils/storage.js";

const container = document.querySelector("#response>div");
const menu = document.getElementById("isbn-list");

export const renderAll = async () => {
  const form = document.getElementById("search-form");
  const nav = document.getElementById("nav-main");

  const books = await storage.read();

  if (books.length > 0) {
    nav.style.display = "flex";
    form.style.display = "none";
    container.parentElement.style.display = "block";
  } else {
    nav.style.display = "none";
    form.style.display = "block";
    container.parentElement.style.display = "none";
  }

  books.forEach(async (book) => {
    renderMenu(book);
  });
};

export const renderLoading = () => {
  console.log(container);
  container.appendChild(createLoading());
  container.parentElement.style = "block";
};

const renderMenu = (book) => {
  const button = createElement("button", {
    textContent: book.isbn,
    id: book.id,
  });
  button.addEventListener("click", showForm);
  menu.appendChild(button);
};

export const renderForm = async (id) => {
  container.innerHTML = "";
  const books = await storage.read();
  const book = books.find((book) => {
    return book.id === Number(id);
  });

  const content = book.message ? createErrorMessage(book) : createForm(book);
  container.appendChild(content);
};

const getCutterCode = (lastname, title) => {
  console.log(
    cutterTable.filter(([code, start]) => {
      //   console.log(start, lastname);
      //   return lastname.startsWith(start);
      return lastname[0] === start[0];
    })
  );
};
