import { renderAll, renderForm, renderLoading } from "../render/interfaces.js";
import { getBookInfo } from "./api.js";
import { storage } from "./storage.js";

const input = document.getElementById("isbn");

export const handleSubmit = async (event) => {
  event.preventDefault();
  await storage.clean();
  const isbnList = input.value.split(" ");
  renderLoading();

  await isbnList.forEach(async (isbn, key) => {
    const book = await getBookInfo(isbn);
    book.id = key + 1;
    book.isbn = isbn.replaceAll("-", "");

    await storage.save(book);
  });

  renderAll();
};

export const showForm = (event, form) => {
  const button = event.currentTarget;
  const id = button.id;

  renderForm(id);
};
