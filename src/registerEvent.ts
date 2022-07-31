import { CANVAS_ELEMENTS } from './globals/dom';

export enum Trigger {
  CanvasResize,
  Tick,
  KeyDown,
  KeyUp
}

type EventCallback = (...args: any[]) => void;

const EVENTS: Record<Trigger, EventCallback[]> = {
  [Trigger.CanvasResize]: [],
  [Trigger.Tick]: [],
  [Trigger.KeyDown]: [],
  [Trigger.KeyUp]: []
};

export const registerEvent = (
  trigger: Trigger,
  callback: EventCallback,
  initialize = false
) => {
  EVENTS[trigger].push(callback);
  initialize && callback();
};

export const triggerEvents = (trigger: Trigger, ...args: any[]) => {
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
