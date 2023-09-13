export type Template<T extends { [key: string]: unknown } = {}> = (
  initialProps: T
) => TemplateOptions<T>;

export type TemplateOptions<T> = {
  context: () => TemplateContext<T>;
  remove: () => void;
  update: TemplateUpdateOption<T>;
};

export type TemplateContext<T> = {
  id: string;
  element: TemplateHTMLElement;
  props: T;
  update: TemplateUpdateOption<T>;
  nested: TemplateNestedOption;
};

export type TemplateUpdateOption<T> = (props: Partial<T>) => void;

export type TemplateNestedOption = (ref: TemplateElementReference) => {
  add: (template: TemplateOptions<{ [key: string]: any }>) => void;
  // remove: (uuid: string) => void;
  // clear: () => void;
  // sort: () => void;
  list: () => TemplateContext<{ [key: string]: any }>[];
};

export type TemplateCallback<T extends { [key: string]: unknown } = {}> = (params: {
  initialProps: T;
  ref: () => TemplateElementReference;
}) => {
  html: (props: T) => TemplateHTML;
  events?: TemplateEvent[];
  nested?: TemplateNested[];
  onMount?: TemplateOnMount<T>;
};

export type TemplateHTML = string;

export type TemplateNested = [TemplateElementReference, TemplateOptions<{ [key: string]: any }>[]];

export type TemplateEvent = [TemplateElementReference, string, () => void];

export type TemplateOnMount<T> = (ctx: TemplateContext<T>) => TemplateOnUnmount<T>;

export type TemplateOnUnmount<T> = (ctx: TemplateContext<T>) => void;

export type TemplateHTMLElement = HTMLElement & { templateId: string; isTemplate: true };

export type TemplateElementReference = {
  id: string;
  element: HTMLElement | null;
  inject: () => string;
};
