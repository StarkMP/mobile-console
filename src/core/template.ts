import {
  Template,
  TemplateCallback,
  TemplateContext,
  TemplateElementReference,
  TemplateEvent,
  TemplateHTMLElement,
  TemplateNested,
  TemplateNestedOption,
  TemplateOnUnmount,
  TemplateOptions,
} from "@typings/core/template";
import { v4 as uuidv4 } from "uuid";

const REF_ATTRIBUTE = "$ref";

export const createTemplate =
  <T extends { [key: string]: unknown }>(callback: TemplateCallback<T>): Template<T> =>
  (initialProps) => {
    const id = uuidv4();
    const references: TemplateElementReference[] = [];

    const ref = (): TemplateElementReference => {
      const refId = uuidv4();
      const inject = (): string => `${REF_ATTRIBUTE}="${refId}"`;
      const refObj = { id: refId, inject, element: null };

      references.push(refObj);

      return refObj;
    };

    const { html, events, nested, onMount } = callback({ initialProps, ref });
    const element = createHTMLElementFromString({
      id,
      html: html(initialProps),
      events,
      references,
    });
    let onUnmount: TemplateOnUnmount<T> | undefined;

    const update = (updatedProps: Partial<T>): void => {
      const nextProps = { ...ctx.props, ...updatedProps };
      const updatedElement = createHTMLElementFromString({
        id,
        html: html(nextProps),
        events,
        references,
      });

      ctx.element.replaceWith(updatedElement);

      ctx.props = nextProps;
      ctx.element = updatedElement;

      appendNested(nested);
    };

    const ctx: TemplateContext<T> = {
      id,
      element,
      props: initialProps,
      nested: registerNested(nested),
      update,
    };

    appendNested(nested);

    if (onMount) {
      onUnmount = onMount(ctx);
    }

    const remove = (): void => {
      if (onUnmount) {
        onUnmount(ctx);
      }

      ctx.element.remove();
    };

    return {
      context: () => Object.assign(ctx, {}),
      remove,
      update,
    };
  };

const registerNested =
  (nested: TemplateNested[] = []): TemplateNestedOption =>
  (ref) => {
    const add = (template: TemplateOptions<{ [key: string]: any }>): void => {
      const nestedItem = nested.find(([nestReference]) => nestReference === ref);

      if (!nestedItem) {
        throw new Error("The reference hasn't nest");
      }

      nestedItem[1].push(template);
      ref.element?.append(template.context().element);
    };

    // const remove = (uuid: string): void => {};

    // const clear = (): void => {};

    // const sort = (): void => {};

    const list = (): TemplateContext<{ [key: string]: any }>[] => {
      const nestedItem = nested.find(([nestReference]) => nestReference === ref);

      if (!nestedItem) {
        throw new Error("The reference hasn't nest");
      }

      return nestedItem[1].map((item) => item.context());
    };

    return { add, list };
  };

const appendNested = (nested?: TemplateNested[]): void => {
  if (nested) {
    for (const nestedItem of nested) {
      const [reference, templates] = nestedItem;
      const refElement = reference.element;

      if (!refElement) continue;

      for (const template of templates) {
        refElement.append(template.context().element);
      }
    }
  }
};

const checkByReference = (
  element: HTMLElement,
  references: TemplateElementReference[]
): boolean => {
  if (element.hasAttribute(REF_ATTRIBUTE)) {
    const refId = element.getAttribute(REF_ATTRIBUTE);

    (references.find((ref) => ref.id === refId) as TemplateElementReference).element = element;

    element.removeAttribute(REF_ATTRIBUTE);

    return true;
  }

  return false;
};

const mapChildren = (element: HTMLElement, references: TemplateElementReference[]): void => {
  for (const child of element.children) {
    checkByReference(child as HTMLElement, references);

    const innerHTML = child.innerHTML;

    if (!innerHTML) continue;

    child.innerHTML = innerHTML.trim();

    if (child.children.length > 0) {
      mapChildren(child as HTMLElement, references);
    }
  }
};

const createHTMLElementFromString = ({
  id,
  html,
  events = [],
  references = [],
}: {
  id: string;
  html: string;
  events?: TemplateEvent[];
  references?: TemplateElementReference[];
}): TemplateHTMLElement => {
  const div = document.createElement("div");

  div.innerHTML = html.trim();

  const element = div.firstChild?.cloneNode(true) as TemplateHTMLElement;

  element.innerHTML = element.innerHTML.trim();

  div.remove();

  checkByReference(element, references);
  mapChildren(element, references);
  initEvents(events);

  element.templateId = id;
  element.isTemplate = true;

  return element;
};

const initEvents = (events?: TemplateEvent[]): void => {
  if (events) {
    for (const event of events) {
      const [reference, name, fn] = event;

      if (!reference.element) {
        return;
      }

      reference.element.addEventListener(name, fn);
    }
  }
};
