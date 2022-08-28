export const canvasElements = {
  upgrades: document.querySelector('canvas#upgrades') as HTMLCanvasElement,
  ui: document.querySelector('canvas#ui') as HTMLCanvasElement,
  map: document.querySelector('canvas#map') as HTMLCanvasElement,
  gameplay: document.querySelector('canvas#gameplay') as HTMLCanvasElement
};

export const canvasContexts = {
  upgrades: canvasElements.upgrades.getContext('2d')!,
  ui: canvasElements.ui.getContext('2d')!,
  map: canvasElements.map.getContext('2d')!,
  gameplay: canvasElements.gameplay.getContext('2d')!
};
