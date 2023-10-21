import {
  InjectableParams,
  TemplateInjectableEvent,
  TemplateInjectableNest,
  TemplateInjectableReference,
} from "@typings/core/template/injectable";

const REF_ATTRIBUTE = "$ref";
const EVENT_ATTRIBUTE = "$event";

export const injectRef = (reference: TemplateInjectableReference): string =>
  `${REF_ATTRIBUTE}="${reference.id}"`;

const checkByInjectableReference = (
  element: HTMLElement,
  references: TemplateInjectableReference[]
): void => {
  if (!element.hasAttribute(REF_ATTRIBUTE)) {
    return;
  }

  const reference = references.find(
    (ref) => ref.id === element.getAttribute(REF_ATTRIBUTE)
  ) as TemplateInjectableReference;

  reference.element = element;

  element.removeAttribute(REF_ATTRIBUTE);

  reference.mounted = true;
};

export const injectEvent = (event: TemplateInjectableEvent | TemplateInjectableEvent[]): string => {
  if (Array.isArray(event)) {
    return `${EVENT_ATTRIBUTE}="${event.map((item) => item.id).join(";")}"`;
  }

  return `${EVENT_ATTRIBUTE}="${event.id}"`;
};

const checkByInjectableEvents = (element: HTMLElement, events: TemplateInjectableEvent[]): void => {
  if (!element.hasAttribute(EVENT_ATTRIBUTE)) {
    return;
  }

  const eventIds = (element.getAttribute(EVENT_ATTRIBUTE) as string).split(";");

  for (const eventId of eventIds) {
    const event = events.find((event) => event.id === eventId) as TemplateInjectableEvent;

    element.addEventListener(event.name, event.fn);

    event.element = element;
    event.mounted = true;
  }

  element.removeAttribute(EVENT_ATTRIBUTE);
};

export const injectNest = (nest: TemplateInjectableNest): string =>
  `<nest $id="${nest.id}"></nest>`;

const checkByInjectableNests = (element: HTMLElement, nests: TemplateInjectableNest[]): void => {
  if (element.localName !== "nest") {
    return;
  }

  const id = element.getAttribute("$id");

  const nest = nests.find((nest) => nest.id === id) as TemplateInjectableNest;

  const fragment = document.createDocumentFragment();

  for (const template of nest.templates) {
    fragment.append(template.context().element);
  }

  element.replaceWith(fragment);

  nest.mounted = true;
};

export const checkByInjectableParams = (
  element: HTMLElement,
  { references, events, nests }: InjectableParams
): void => {
  checkByInjectableReference(element, references);
  checkByInjectableEvents(element, events);
  checkByInjectableNests(element, nests);
};
