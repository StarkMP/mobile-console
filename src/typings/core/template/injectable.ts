import { TemplateContext, TemplateInstance } from ".";

export type TemplateInjectableDefaultParams = {
  id: string;
};

export type TemplateInjectableReference = TemplateInjectableDefaultParams & {
  element: HTMLElement | null;
};

export type TemplateInjectableEvent = TemplateInjectableDefaultParams & {
  name: string;
  fn: () => void;
  element: HTMLElement | null;
};

export type TemplateInjectableNest = TemplateInjectableDefaultParams & {
  templates: TemplateInstance<{ [key: string]: any }>[];
  list: () => TemplateContext<{ [key: string]: any }>[];
  add: (template: TemplateInstance<{ [key: string]: any }>) => void;
  // remove: (uuid: string) => void;
  // clear: () => void;
  // sort: () => void;
};

export type InjectableParams = {
  references: TemplateInjectableReference[];
  events: TemplateInjectableEvent[];
  nests: TemplateInjectableNest[];
};
