import { CANVAS_ELEMENTS } from './globals/dom';

export enum Trigger {
  CanvasResize
}

type EventCallback = (...args: any[]) => void;

const EVENTS: Record<Trigger, EventCallback[]> = {
  [Trigger.CanvasResize]: []
};

export const registerEvent = (
  trigger: Trigger,
  callback: EventCallback,
  initialize = true
) => {
  EVENTS[trigger].push(callback);
  initialize && callback();
};

export const triggerEvents = (trigger: Trigger) => {
  const events = EVENTS[trigger];
  for (let i = 0; i < events.length; i++) {
    events[i]();
  }
};

new ResizeObserver(() => {
  triggerEvents(Trigger.CanvasResize);
}).observe(CANVAS_ELEMENTS.map);
