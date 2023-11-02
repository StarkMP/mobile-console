import { createTemplate } from "@core/template";
import { injectEvent } from "@core/template/injectable";

type WidgetButtonProps = {
  align: "right-bottom" | "right-top" | "left-top" | "left-bottom";
  onClick: () => void;
};

export const WidgetButton = createTemplate<WidgetButtonProps>(({ initialProps, addEvent }) => {
  const { onClick } = initialProps;
  const handleClick = addEvent("click", onClick);

  return ({ align }): string => {
    let alignClass = "right-6 bottom-6";

    switch (align) {
      case "left-bottom":
        alignClass = "left-6 bottom-6";
        break;

      case "left-top":
        alignClass = "left-6 top-6";
        break;

      case "right-bottom":
        alignClass = "right-6 bottom-6";
        break;

      case "right-top":
        alignClass = "right-6 top-6";
        break;

      default:
        break;
    }

    return `
      <button ${injectEvent(
        handleClick
      )} class="z-40 fixed ${alignClass} bg-yellow-400 text-white rounded-[50%] w-14 h-14 flex justify-center items-center shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="none">
          <path d="M12 19H21M3 5L11 12L3 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </button>
    `;
  };
});
