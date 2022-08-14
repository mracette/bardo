export const canvasElements = {
  ui: document.querySelector('canvas#ui') as HTMLCanvasElement,
  map: document.querySelector('canvas#map') as HTMLCanvasElement,
  gameplay: document.querySelector('canvas#gameplay') as HTMLCanvasElement
};

export const canvasContexts = {
  ui: canvasElements.ui.getContext('2d')!,
  map: canvasElements.map.getContext('2d')!,
  gameplay: canvasElements.gameplay.getContext('2d')!
};
