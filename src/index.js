import { findBooksByIsbn } from "./utils/handlers.js";
import { resetRender } from "./render/interfaces.js";

window.addEventListener("load", async () => {
  const form = document.getElementById("search-form");
  const buttonClean = document.getElementById("button-clean");
  const input = document.getElementById("isbn");

  input.value = "9788565358668 9788598486130 978-8544001516";

  form.addEventListener("submit", findBooksByIsbn);

  buttonClean.addEventListener("click", async () => {
    resetRender();
  });
});
