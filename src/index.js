import { getBookInfo } from "./utils/api.js";
import { storage } from "./utils/storage.js";
import { renderForm } from "./render/interfaces.js";

window.addEventListener("load", () => {
  const form = document.getElementById("search-form");
  const input = document.getElementById("isbn");

  input.value = "9788565358668 9788598486130 978-8544001516";
  // input.value = "9788544001516";

  const handleSubmit = async (event) => {
    storage.clean();
    event.preventDefault();
    const isbnList = input.value.split(" ");

    isbnList.forEach(async (isbn, key) => {
      getBookInfo(isbn).then((book) => {
        book.id = key + 1;
        book.isbn = isbn.replaceAll("-", "");

        storage.save(book);
        renderForm(book);
        form.style.display = "none";
      });
    });
  };

  form.addEventListener("submit", handleSubmit);
});
