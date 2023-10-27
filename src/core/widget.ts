import { initConsoleObserver } from "@core/console";
import { Console, WidgetButton } from "@templates";
import { WidgetConfig } from "@typings/core/widget";

import widgetStyles from "../styles.css?inline";

export const initMobileConsoleWidget = (config: WidgetConfig = {}): void => {
  const { parentElement = document.body } = config;
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
  const btnTemplate = WidgetButton({ onClick: openConsole });

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
};
