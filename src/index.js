import {
  copyContent,
  findBooksByIsbn,
  setButtonsClickEvent,
  updateForm,
} from "./utils/handlers.js";
import {
  renderMenu,
  renderResponse,
  resetRender,
} from "./render/interfaces.js";

window.addEventListener("load", async () => {
  const formSearch = document.getElementById("search-form");
  const formResponse = document.getElementById("form-result");
  const buttonClean = document.getElementById("button-clean");
  const marcCode = document.getElementById("marc-code");
  const buttonMarcCode = marcCode.querySelector(".button-copy");
  const nav = document.getElementById("nav-main");
  const buttonToggle = document.getElementById("is-marc");

  const inputSearch = document.getElementById("isbn");
  inputSearch.value = "9788565358668 123 9788598486130 978-8544001516";

  if (localStorage.length > 0) {
    Object.keys(localStorage).forEach((isbn) => {
      if (isbn !== "isMarcView" && isbn != "currentId") {
        renderMenu(isbn);
      }

      setButtonsClickEvent(JSON.parse(localStorage.getItem(isbn)));
    });
    formSearch.style.display = "none";
    nav.style.display = "flex";
    formResponse.parentElement.parentElement.style.display = "block";

    renderResponse();
  }

  formSearch.addEventListener("submit", findBooksByIsbn);

  formResponse.addEventListener("submit", updateForm);

  buttonClean.addEventListener("click", async () => {
    resetRender();
  });

  buttonMarcCode.addEventListener("click", copyContent);

  buttonToggle.checked = Boolean(localStorage.getItem("isMarkView"));
  buttonToggle.addEventListener("click", (event) => {
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
  });
});
