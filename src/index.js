import {
  copyContent,
  findBooksByIsbn,
  setSelectValue,
  toggleView,
  updateForm,
} from "./utils/handlers.js";
import { resetRender } from "./render/interfaces.js";

window.addEventListener("load", async () => {
  const formSearch = document.getElementById("search-form");
  const formResponse = document.getElementById("form-result");
  const buttonClean = document.getElementById("button-clean");
  const marcCode = document.getElementById("marc-code");
  const buttonsCopy = document.querySelectorAll(".button-copy");
  const buttonMarcCode = marcCode.querySelector(".button-copy");
  const buttonToggle = document.getElementById("is-marc");
  const fieldCdd082 = document.getElementById("082-0");
  const fieldCdd090 = document.getElementById("090-0");

  if (localStorage.length > 0) {
    localStorage.clear();
  }

  fieldCdd082.addEventListener("change", (event) => {
    const field = event.currentTarget;
    fieldCdd090.value = field.value;
  });

  fieldCdd090.addEventListener("change", (event) => {
    const field = event.currentTarget;
    fieldCdd082.value = field.value;
  });

  formSearch.addEventListener("submit", findBooksByIsbn);

  formResponse.addEventListener("submit", updateForm);

  buttonClean.addEventListener("click", async () => {
    resetRender();
  });

  Object.values(buttonsCopy).forEach((button) => {
    button.addEventListener("click", copyContent);
  });

  buttonMarcCode.addEventListener("click", copyContent);

  buttonToggle.addEventListener("click", toggleView);
});
