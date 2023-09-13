import { createTemplate } from "@core/template";
import { ConsoleItem, ConsoleType } from "@typings/core/console";

type ConsoleRawProps = ConsoleItem;

const consoleTypeClassname: { [key in ConsoleType]: string } = {
  [ConsoleType.Error]: "bg-console-background-error text-console-error border-console-border-error",
  [ConsoleType.Warn]: "bg-console-background-warn text-console-warn border-console-border-warn",
  [ConsoleType.Info]: "bg-console-background-info text-console-info border-console-border-info",
};

export const ConsoleRaw = createTemplate<ConsoleRawProps>(() => {
  return {
    html: ({ type, content }): string => `
      <div class="text-xs px-2 py-1 ${consoleTypeClassname[type]} border-b">
        ${content.replace("\n", "<br>&nbsp;&nbsp;")}
      </div>
    `,
  };
});
