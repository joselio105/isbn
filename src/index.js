import { storage } from "./utils/storage.js";
import { handleSubmit } from "./utils/handlers.js";
import { renderAll } from "./render/interfaces.js";

window.addEventListener("load", async () => {
  const form = document.getElementById("search-form");
  const buttonClean = document.getElementById("button-clean");
  const input = document.getElementById("isbn");

  input.value = "9788565358668 9788598486130 978-8544001516";
  renderAll();

  form.addEventListener("submit", handleSubmit);
  buttonClean.addEventListener("click", async () => {
    await storage.clean();
    renderAll();
  });
});
