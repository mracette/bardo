import { CANVAS_ELEMENTS } from './globals/dom';

export enum Trigger {
  CanvasResize,
  Tick,
  KeyDown,
  KeyUp
}

interface EventCallbackArgs extends Record<Trigger, any> {
  [Trigger.CanvasResize]: [];
  [Trigger.Tick]: [number, number];
  [Trigger.KeyDown]: [string];
  [Trigger.KeyUp]: [string];
}

type EventCallback<T extends Trigger> = (...args: EventCallbackArgs[T]) => void;

const EVENTS: Record<Trigger, EventCallback<Trigger>[]> = {
  [Trigger.CanvasResize]: [],
  [Trigger.Tick]: [],
  [Trigger.KeyDown]: [],
  [Trigger.KeyUp]: []
};

export const registerEvent = <T extends Trigger>(
  trigger: T,
  callback: EventCallback<T>,
  initialize = false
) => {
  EVENTS[trigger].push(callback);
  // @ts-ignore
  initialize && callback();
};

export const triggerEvents = <T extends Trigger>(
  trigger: T,
  ...args: EventCallbackArgs[T]
) => {
  const events = EVENTS[trigger];
  for (let i = 0; i < events.length; i++) {
    events[i](...args);
  }
};

new ResizeObserver(() => {
  triggerEvents(Trigger.CanvasResize);
}).observe(CANVAS_ELEMENTS.map);

window.addEventListener('keydown', (event) => {
  triggerEvents(Trigger.KeyDown, event.key);
});

window.addEventListener('keyup', (event) => {
  triggerEvents(Trigger.KeyUp, event.key);
});
