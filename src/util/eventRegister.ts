import { canvasElements } from '../globals/dom';

export enum Trigger {
  Initialize,
  CanvasResize,
  Tick,
  KeyDown,
  KeyUp,
  StateChange
}

type EventCallback = (...args: any[]) => void;

const EVENTS: Record<Trigger, EventCallback[]> = {
  [Trigger.Initialize]: [],
  [Trigger.CanvasResize]: [],
  [Trigger.Tick]: [],
  [Trigger.KeyDown]: [],
  [Trigger.KeyUp]: [],
  [Trigger.StateChange]: []
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
}).observe(canvasElements.map);

window.addEventListener('keydown', (event) => {
  triggerEvent(Trigger.KeyDown, event.key);
});

window.addEventListener('keyup', (event) => {
  triggerEvent(Trigger.KeyUp, event.key);
});
