import { ConsoleObserver, ConsoleType } from "@typings/core/console";
import { AnyObject } from "@typings/util-types";

const formatConsoleItem = (item: any): string => {
  if (item === undefined) {
    return "undefined";
  }

  if (typeof item === "number" && isNaN(item)) {
    return "NaN";
  }

  if (typeof item === "function") {
    return "[Function]";
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return item;
};

const formatConsoleData = (type: ConsoleType, data: any[]): string => {
  const formattedData = [];

  for (const item of data) {
    if (typeof item === "object") {
      const formattedItem = JSON.stringify(
        item as AnyObject,
        (_, value) => formatConsoleItem(value),
        2
      );

      formattedData.push(formattedItem);

      continue;
    }

    formattedData.push(formatConsoleItem(item));
  }

  return formattedData.join(" ");
};

export const initConsoleObserver = (): ConsoleObserver => {
  const observer: ConsoleObserver = {
    subscribers: [],

    subscribe: (callback) => {
      observer.subscribers.push(callback);
    },

    trigger: (data) => {
      for (const subscriber of observer.subscribers) {
        subscriber(data);
      }
    },
  };

  const consoleLogRef = console.log;

  console.log = (...data: any[]): void => {
    const type = ConsoleType.Info;

    observer.trigger({ type, content: formatConsoleData(type, data) });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    consoleLogRef(...data);
  };

  const consoleErrorRef = console.error;

  console.error = (...data: any[]): void => {
    const type = ConsoleType.Error;

    observer.trigger({ type, content: formatConsoleData(type, data) });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    consoleErrorRef(...data);
  };

  const consoleWarnRef = console.warn;

  console.warn = (...data: any[]): void => {
    const type = ConsoleType.Warn;

    observer.trigger({ type, content: formatConsoleData(type, data) });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    consoleWarnRef(...data);
  };

  return observer;
};
