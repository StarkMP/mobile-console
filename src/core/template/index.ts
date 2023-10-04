import {
  Template,
  TemplateCallback,
  TemplateContext,
  TemplateHTMLElement,
  TemplateInstance,
  TemplateOnMount,
  TemplateOnUnmount,
  TemplateOnUpdate,
  TemplateUpdateOption,
} from "@typings/core/template";
import {
  InjectableParams,
  TemplateInjectableEvent,
  TemplateInjectableNest,
  TemplateInjectableReference,
} from "@typings/core/template/injectable";
import { AnyObject } from "@typings/util-types";
import { v4 as uuidv4 } from "uuid";

import { checkByInjectableParams } from "./injectable";

export const createTemplate =
  <T extends { [key: string]: unknown }>(callback: TemplateCallback<T>): Template<T> =>
  (initialProps) => {
    const id = uuidv4();
    const references: TemplateInjectableReference[] = [];
    const events: TemplateInjectableEvent[] = [];
    const nests: TemplateInjectableNest[] = [];

    let onMountCallback: (() => void) | (() => () => void) | undefined;
    let onUnmountCallback: (() => void) | undefined;
    let onUpdateCallback: (nextProps: T, prevProps: T) => void;

    const addRef = (): TemplateInjectableReference => {
      const refId = uuidv4();
      const refObj = { id: refId, element: null };

      references.push(refObj);

      return refObj;
    };

    const addEvent = (name: string, fn: () => void): TemplateInjectableEvent => {
      const eventId = uuidv4();
      const eventObj = { id: eventId, element, name, fn };

      events.push(eventObj);

      return eventObj;
    };

    const addNest = (templates: TemplateInstance<AnyObject>[] = []): TemplateInjectableNest => {
      const nestId = uuidv4();

      const nest: TemplateInjectableNest = {
        id: nestId,
        templates,

        list: (): TemplateContext<AnyObject>[] => nest.templates.map((item) => item.context()),

        add: (template: TemplateInstance<AnyObject>): void => {
          nest.templates.push(template);

          if (nest.templates.length === 0) {
            ctx.update({}, true);

            return;
          }

          const list = nest.list();
          const lastLoadedElement = list[list.length - 2].element;

          lastLoadedElement.insertAdjacentElement("afterend", template.context().element);
        },

        // remove: (uuid: string): void => {},
        // clear: (): void => {},
        // sort: (): void => {},
      };

      nests.push(nest);

      return nest;
    };

    const onMount: TemplateOnMount = (fn) => {
      onMountCallback = fn;
    };

    const onUpdate: TemplateOnUpdate<T> = (fn) => {
      onUpdateCallback = fn;
    };

    const renderStringHTML = callback({
      initialProps,
      addRef,
      addEvent,
      addNest,
      onMount,
      onUpdate,
    });

    const element = createHTMLElementFromString({
      id,
      html: renderStringHTML(initialProps),
      events,
      references,
      nests,
    });

    const update: TemplateUpdateOption<T> = (updatedProps = {}, isQuiet): void => {
      const prevProps = Object.assign({}, ctx.props);
      const nextProps = { ...prevProps, ...updatedProps };
      const updatedElement = createHTMLElementFromString({
        id,
        html: renderStringHTML(nextProps),
        events,
        references,
        nests,
      });

      ctx.element.replaceWith(updatedElement);

      ctx.props = nextProps;
      ctx.element = updatedElement;

      if (isQuiet) {
        return;
      }

      onUpdateCallback(nextProps, prevProps);
    };

    const ctx: TemplateContext<T> = {
      id,
      element,
      props: initialProps,
      update,
    };

    if (onMountCallback) {
      onUnmountCallback = onMountCallback() as TemplateOnUnmount | undefined;
    }

    const remove = (): void => {
      if (onUnmountCallback) {
        onUnmountCallback();
      }

      ctx.element.remove();
    };

    return {
      context: () => Object.assign(ctx, {}),
      remove,
      update,
    };
  };

const mapChildren = (element: HTMLElement, injectableParams: InjectableParams): void => {
  for (const child of element.children) {
    checkByInjectableParams(child as HTMLElement, injectableParams);

    const innerHTML = child.innerHTML;

    if (!innerHTML) continue;

    child.innerHTML = innerHTML.trim();

    if (child.children.length > 0) {
      mapChildren(child as HTMLElement, injectableParams);
    }
  }
};

const createHTMLElementFromString = ({
  id,
  html,
  events = [],
  references = [],
  nests,
}: {
  id: string;
  html: string;
} & InjectableParams): TemplateHTMLElement => {
  const div = document.createElement("div");

  div.innerHTML = html.trim();

  const element = div.firstChild?.cloneNode(true) as TemplateHTMLElement;

  element.innerHTML = element.innerHTML.trim();

  div.remove();

  checkByInjectableParams(element, { references, events, nests });
  mapChildren(element, { references, events, nests });

  element.templateId = id;
  element.isTemplate = true;

  return element;
};
