import { AnyObject } from "@typings/util-types";

import { TemplateContext, TemplateInstance } from ".";

export type TemplateInjectableDefaultParams = {
  id: string;
  mounted: boolean;
};

export type TemplateInjectableReference = TemplateInjectableDefaultParams & {
  element: HTMLElement | null;
};

export type TemplateInjectableEvent = TemplateInjectableDefaultParams & {
  name: string;
  fn: (event: any) => void;
  element: HTMLElement | null;
};

export type TemplateInjectableNest = TemplateInjectableDefaultParams & {
  templates: TemplateInstance<AnyObject>[];
  list: () => TemplateContext<AnyObject>[];
  add: (template: TemplateInstance<AnyObject>) => void;
  destroy: () => void;
  // remove: (uuid: string) => void;
  // clear: () => void;
  // sort: () => void;
};

export type InjectableParams = {
  references: TemplateInjectableReference[];
  events: TemplateInjectableEvent[];
  nests: TemplateInjectableNest[];
};
