import { createTemplate } from "@core/template";

type WidgetButtonProps = {
  onClick: () => void;
};

export const WidgetButton = createTemplate<WidgetButtonProps>(({ initialProps, ref }) => {
  const { onClick } = initialProps;
  const buttonRef = ref();

  return {
    html: (): string => `
      <button ${buttonRef.inject()} class="z-40 fixed right-6 bottom-6 bg-yellow-400 text-white rounded-[50%] w-14 h-14 flex justify-center items-center shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="none">
          <path d="M12 19H21M3 5L11 12L3 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    `,
    events: [[buttonRef, "click", onClick]],
  };
});
