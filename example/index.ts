import { initMobileConsoleWidget } from "../src/index";

initMobileConsoleWidget();

const throwErrorButton = document.getElementById("throw-error-btn");

throwErrorButton?.addEventListener("click", () => {
  throw new Error("Random error");
});

setTimeout(() => {
  throw new Error("Delayed error");
}, 2000);
