import { initConsoleObserver } from "@core/console";
import { Console, WidgetButton } from "@templates";
import { WidgetConfig } from "@typings/core/widget";

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

  parentElement.appendChild(consoleTemplate.context().element);

  const btnTemplate = WidgetButton({ onClick: openConsole });

  parentElement.appendChild(btnTemplate.context().element);
};
