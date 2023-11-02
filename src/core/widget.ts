import { initConsoleObserver } from "@core/console";
import { Console, WidgetButton } from "@templates";
import { MobileConsoleWidget, MobileConsoleWidgetConfig } from "@typings/core/widget";

import widgetStyles from "../styles.css?inline";

let isMobileConsoleWidgetInitialized = false;

export const initMobileConsoleWidget = (
  config: MobileConsoleWidgetConfig = {}
): MobileConsoleWidget => {
  if (isMobileConsoleWidgetInitialized) {
    throw new Error("Mobile Console Widget is already initialized");
  }

  const { parentElement = document.body, align = "right-bottom" } = config;
  const consoleObserver = initConsoleObserver();

  const openConsole = (): void => {
    consoleTemplate.update({ show: true });
  };

  const closeConsole = (): void => {
    consoleTemplate.update({ show: false });
  };

  const consoleTemplate = Console({
    show: false,
    observer: consoleObserver,
    onClose: closeConsole,
  });
  const btnTemplate = WidgetButton({ align, onClick: openConsole });

  const wrapper = document.createElement("div");
  const styles = document.createElement("style");

  styles.setAttribute("type", "text/css");
  styles.innerHTML = widgetStyles;

  wrapper.id = "mobile-console-widget";
  parentElement.appendChild(wrapper);

  const shadowRoot = wrapper.attachShadow({ mode: "open" });

  shadowRoot.appendChild(styles);
  shadowRoot.appendChild(consoleTemplate.context().element);
  shadowRoot.appendChild(btnTemplate.context().element);

  isMobileConsoleWidgetInitialized = true;

  return {};
};
