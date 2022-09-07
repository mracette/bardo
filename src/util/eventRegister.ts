import { canvasElements } from '../globals/dom';

// TODO remove strings
export const enum Trigger {
  Initialize,
  CanvasResize,
  WindowResize,
  Tick,
  KeyDown,
  KeyUp,
  StateChange,
  LevelUp
}

type EventCallback = (...args: any[]) => void;

interface Event {
  id: number;
  callback: EventCallback;
}

const EVENTS: Record<Trigger, Event[]> = {
  [Trigger.Initialize]: [],
  [Trigger.CanvasResize]: [],
  [Trigger.WindowResize]: [],
  [Trigger.Tick]: [],
  [Trigger.KeyDown]: [],
  [Trigger.KeyUp]: [],
  [Trigger.StateChange]: [],
  [Trigger.LevelUp]: []
};

let id = 0;

export const registerEvent = <T extends Trigger>(trigger: T, callback: EventCallback) => {
  EVENTS[trigger].push({
    id,
    callback
  });
  id++;
  return id - 1;
};

export const unregisterEvent = (id: number) => {
  for (const [_, value] of Object.entries(EVENTS)) {
    for (let i = value.length - 1; i >= 0; i--) {
      if (value[i].id === id) {
        value.splice(i, 1);
      }
    }
  }
};

export const triggerEvent = <T extends Trigger>(trigger: T, ...args: any[]) => {
  const events = EVENTS[trigger];
  for (let i = 0; i < events.length; i++) {
    events[i].callback(...args);
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

window.addEventListener('resize', (event) => {
  triggerEvent(Trigger.WindowResize);
});
