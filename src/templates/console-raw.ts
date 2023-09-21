import { createTemplate } from "@core/template";
import { ConsoleItem, ConsoleType } from "@typings/core/console";

type ConsoleRawProps = ConsoleItem;

const consoleTypeClassname: { [key in ConsoleType]: string } = {
  [ConsoleType.Error]: "bg-console-background-error text-console-error border-console-border-error",
  [ConsoleType.Warn]: "bg-console-background-warn text-console-warn border-console-border-warn",
  [ConsoleType.Info]: "bg-console-background-info text-console-info border-console-border-info",
};

const consoleTypeIcon: { [key in ConsoleType]: string } = {
  [ConsoleType.Error]: `
    <svg class="w-3 h-3 mr-[5px] translate-y-[2px] overflow-hidden flex-[0_0_auto]" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"  xml:space="preserve">
      <circle cx="16" cy="16" id="BG" r="16" fill="#FF3939"/>
      <polygon points="24,10.1 21.9,8 16,13.9 10.1,8 8,10.1 13.9,16 8,21.9 10.1,24 16,18.1 21.9,24 24,21.9 18.1,16" fill="#ffffff"/>
    </svg>
  `,
  [ConsoleType.Warn]: "",
  [ConsoleType.Info]: "",
};

export const ConsoleRaw = createTemplate<ConsoleRawProps>(() => {
  return ({ type, content }): string => `
    <div class="text-xs px-2 py-1 flex items-start ${consoleTypeClassname[type]} border-b">
      ${consoleTypeIcon[type]}
      <div>
        ${content.replace("\n", "<br>&nbsp;&nbsp;")}
      </div>
    </div>
  `;
});
