import { copyContent, findBooksByIsbn, updateForm } from "./utils/handlers.js";
import { resetRender } from "./render/interfaces.js";

window.addEventListener("load", async () => {
  const formSearch = document.getElementById("search-form");
  const formResponse = document.getElementById("form-result");
  const buttonClean = document.getElementById("button-clean");
  const buttonViewMarc = document.querySelector(".submenu #marc");
  const buttonViewForm = document.querySelector(".submenu #form");
  const marcCode = document.getElementById("marc-code");

  const inputSearch = document.getElementById("isbn");
  inputSearch.value = "123 9788565358668 9788598486130 978-8544001516";

  formSearch.addEventListener("submit", findBooksByIsbn);

  formResponse.addEventListener("submit", updateForm);

  buttonClean.addEventListener("click", async () => {
    resetRender();
  });

  buttonViewMarc.addEventListener("click", () => {
    formResponse.style.display = "none";
    marcCode.style.display = "flex";
  });

  buttonViewForm.addEventListener("click", () => {
    formResponse.style.display = "flex";
    marcCode.style.display = "none";
  });
});
