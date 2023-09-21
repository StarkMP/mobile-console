import { createTemplate } from "@core/template";
import { injectEvent, injectNest } from "@core/template/injectable";
import { ConsoleRaw } from "@templates";
import { ConsoleType } from "@typings/core/console";

type ConsoleProps = {
  show: boolean;
  onClose: () => void;
};

export const Console = createTemplate<ConsoleProps>(
  ({ initialProps, addNest, addEvent, onMount }) => {
    const { onClose } = initialProps;

    const handleClick = addEvent("click", onClose);

    const list = addNest([
      ConsoleRaw({ type: ConsoleType.Error, content: "First error" }),
      ConsoleRaw({ type: ConsoleType.Info, content: "Second info" }),
    ]);

    onMount(() => {
      const handleError = (e: ErrorEvent): boolean => {
        list.add(ConsoleRaw({ type: ConsoleType.Error, content: e.error.stack }));

        return false;
      };

      window.addEventListener("error", handleError);

      return (): void => {
        window.removeEventListener("error", handleError);
      };
    });

    return ({ show }): string => `
      <div class="${!show ? "hidden " : ""}fixed z-50 left-0 top-0 w-screen h-screen bg-white">
        <div class="w-full h-12 flex items-center justify-between bg-gray-100 px-4 text-gray-800 border-b border-gray-300">
          <span class="font-medium">Mobile Console</span>
          <button ${injectEvent(handleClick)} class="w-6 h-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" viewBox="0 0 50 50">
              <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
            </svg>
          </button>
        </div>
        <div class="w-full h-full flex flex-col">${injectNest(list)}</div>
      </div>
    `;
  }
);
