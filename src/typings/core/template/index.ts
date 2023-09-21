import {
  TemplateInjectableEvent,
  TemplateInjectableNest,
  TemplateInjectableReference,
} from "./injectable";

export type Template<T extends { [key: string]: unknown } = {}> = (
  initialProps: T
) => TemplateInstance<T>;

export type TemplateInstance<T> = {
  context: () => TemplateContext<T>;
  remove: () => void;
  update: TemplateUpdateOption<T>;
};

export type TemplateContext<T> = {
  id: string;
  element: TemplateHTMLElement;
  props: T;
  update: TemplateUpdateOption<T>;
};

export type TemplateUpdateOption<T> = (props: Partial<T>) => void;

export type TemplateCallback<T extends { [key: string]: unknown } = {}> = (params: {
  initialProps: T;
  // context: () => TemplateContext<T>;
  addRef: () => TemplateInjectableReference;
  addEvent: (name: string, fn: () => void) => TemplateInjectableEvent;
  addNest: (templates: TemplateInstance<{ [key: string]: any }>[]) => TemplateInjectableNest;
  onMount: TemplateOnMount;
}) => (props: T) => TemplateHTML;

export type TemplateHTML = string;

export type TemplateOnMount = (fn: () => TemplateOnUnmount | void) => void;

export type TemplateOnUnmount = () => void;

export type TemplateHTMLElement = HTMLElement & { templateId: string; isTemplate: true };
