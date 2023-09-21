export type ConsoleObserver = {
  subscribers: ConsoleObserverSubscriberCallback[];
  subscribe: (callback: ConsoleObserverSubscriberCallback) => void;
  trigger: (data: ConsoleItem) => void;
};

export type ConsoleObserverSubscriberCallback = (data: ConsoleItem) => void;

export enum ConsoleType {
  Error = "error",
  Info = "info",
  Warn = "warn",
}

export type ConsoleItem = {
  type: ConsoleType;
  content: string;
};
