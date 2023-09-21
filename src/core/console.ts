/* eslint-disable no-console */
import { ConsoleObserver, ConsoleType } from "@typings/core/console";

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
    observer.trigger({ type: ConsoleType.Info, content: data.toString() });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    consoleLogRef(...data);
  };

  const consoleErrorRef = console.error;

  console.error = (...data: any[]): void => {
    observer.trigger({ type: ConsoleType.Error, content: data.toString() });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    consoleErrorRef(...data);
  };

  const consoleWarnRef = console.warn;

  console.warn = (...data: any[]): void => {
    observer.trigger({ type: ConsoleType.Warn, content: data.toString() });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    consoleWarnRef(...data);
  };

  return observer;
};
