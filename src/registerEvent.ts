import { CANVAS_ELEMENTS } from './globals/dom';

export enum Trigger {
  CanvasResize,
  Tick,
  KeyDown,
  KeyUp,
  Init
}

type EventCallback = (...args: any[]) => void;

const EVENTS: Record<Trigger, EventCallback[]> = {
  [Trigger.CanvasResize]: [],
  [Trigger.Tick]: [],
  [Trigger.KeyDown]: [],
  [Trigger.KeyUp]: [],
  [Trigger.Init]: []
};

export const registerEvent = <T extends Trigger>(trigger: T, callback: EventCallback) => {
  EVENTS[trigger].push(callback);
};

export const triggerEvent = <T extends Trigger>(trigger: T, ...args: any[]) => {
  const events = EVENTS[trigger];
  for (let i = 0; i < events.length; i++) {
    events[i](...args);
  }
};

new ResizeObserver(() => {
  triggerEvent(Trigger.CanvasResize);
}).observe(CANVAS_ELEMENTS.map);

window.addEventListener('keydown', (event) => {
  triggerEvent(Trigger.KeyDown, event.key);
});

window.addEventListener('keyup', (event) => {
  triggerEvent(Trigger.KeyUp, event.key);
});
