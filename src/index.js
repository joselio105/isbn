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
  const buttonViewMarc = document.querySelector(".submenu #marc");
  const buttonViewForm = document.querySelector(".submenu #form");
  const marcCode = document.getElementById("marc-code");
  const buttonMarcCode = marcCode.querySelector(".button-copy");

  const inputSearch = document.getElementById("isbn");
  inputSearch.value = "9788565358668 123 9788598486130 978-8544001516";
  if (localStorage.length > 0) {
    resetRender();
    // localStorage.removeItem("isMarkView");
    // Object.keys(localStorage).forEach((isbn) => {
    //   if (isbn !== "currentId") {
    //     renderMenu(isbn);
    //   }

    //   setButtonsClickEvent(JSON.parse(localStorage.getItem(isbn)));
    // });
    // formSearch.style.display = "none";
    // nav.style.display = "flex";
    // formResponse.parentElement.parentElement.style.display = "block";

    // renderResponse(JSON.parse(Object.values(localStorage)[0]));
  }

  formSearch.addEventListener("submit", findBooksByIsbn);

  formResponse.addEventListener("submit", updateForm);

  buttonClean.addEventListener("click", async () => {
    resetRender();
  });

  buttonViewMarc.addEventListener("click", () => {
    formResponse.style.display = "none";
    marcCode.style.display = "flex";
    localStorage.setItem("isMarkView", true);
    renderResponse();
  });

  buttonViewForm.addEventListener("click", () => {
    formResponse.style.display = "block";
    marcCode.style.display = "none";
    localStorage.removeItem("isMarkView");
    renderResponse();
  });

  buttonMarcCode.addEventListener("click", copyContent);
});
