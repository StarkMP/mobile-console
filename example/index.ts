import { initMobileConsoleWidget } from "../src/index";

initMobileConsoleWidget();

const throwErrorButton = document.getElementById("throw-error-btn");
const warnButton = document.getElementById("warn-btn");

throwErrorButton?.addEventListener("click", () => {
  throw new Error("Click error");
});

warnButton?.addEventListener("click", () => {
  console.warn("Warning message!");
});

setTimeout(() => {
  console.log("Inside timer");

  throw new Error("Delayed error");
}, 2000);
