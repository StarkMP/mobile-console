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
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"  xml:space="preserve">
      <circle cx="16" cy="16" id="BG" r="16" fill="#FF3939"/>
      <polygon points="24,10.1 21.9,8 16,13.9 10.1,8 8,10.1 13.9,16 8,21.9 10.1,24 16,18.1 21.9,24 24,21.9 18.1,16" fill="#ffffff"/>
    </svg>
  `,
  [ConsoleType.Warn]: `
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" viewBox="0 0 512 512" xml:space="preserve">
      <polygon style="fill:#e88f21;" points="13.728,473.992 256,46.24 498.272,473.992 "/>
      <path style="fill:#e88f21;" d="M256,62.472l228.552,403.52H27.448L256,62.472 M256,30.008L0,481.992h512L256,30.008L256,30.008z"/>
      <path style="fill:#ffffff;" d="M226.112,396.344c0-17.216,12.024-29.56,29.232-29.56c17.216,0,28.584,12.344,28.912,29.56  c0,16.888-11.368,29.552-28.912,29.552C237.808,425.896,226.112,413.232,226.112,396.344z M236.84,350.536l-7.48-147.144h51.648  l-7.152,147.152L236.84,350.536L236.84,350.536z"/>
    </svg>
  `,
  [ConsoleType.Info]: "",
};

export const ConsoleRaw = createTemplate<ConsoleRawProps>(() => {
  return ({ type, content }): string => {
    const icon = consoleTypeIcon[type];

    return `
      <div class="text-xs px-2 py-1 flex items-start ${consoleTypeClassname[type]} border-b">
        ${
          icon
            ? `<span class="w-3 h-3 mr-[5px] translate-y-[2px] overflow-hidden flex-[0_0_auto]">${icon}</span>`
            : ""
        }
        <div>
          ${content}
        </div>
      </div>
    `;
  };
});
