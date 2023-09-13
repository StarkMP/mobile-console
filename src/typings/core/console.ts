export enum ConsoleType {
  Error = "error",
  Info = "info",
  Warn = "warn",
}

export type ConsoleItem = {
  type: ConsoleType;
  content: string;
};
