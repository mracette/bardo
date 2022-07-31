import { CANVAS_ELEMENTS } from "./globals/dom";

export enum Trigger {
  CanvasResize
}

type EventCallback = (...args: any[]) => void;

const EVENTS: Record<Trigger, EventCallback[]> = {
  [Trigger.CanvasResize]: []
};

export const registerEvent = (
  callback: EventCallback,
  trigger: Trigger,
  initialize = true
) => {
  EVENTS[trigger].push(callback);
  initialize && callback();
};

const canvasResizeObserver = new ResizeObserver(() => {
  const events = EVENTS[Trigger.CanvasResize];
  for (let i = 0; i < events.length; i++) {
    events[i]();
  }
});

canvasResizeObserver.observe(CANVAS_ELEMENTS.map);
