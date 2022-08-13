export const canvasElements = {
  ui: document.querySelector('canvas#ui') as HTMLCanvasElement,
  map: document.querySelector('canvas#map') as HTMLCanvasElement,
  player: document.querySelector('canvas#gameplay') as HTMLCanvasElement,
  debug: document.querySelector('canvas#debug') as HTMLCanvasElement
};

export const canvasContexts = {
  ui: canvasElements.ui.getContext('2d')!,
  map: canvasElements.map.getContext('2d')!,
  gameplay: canvasElements.player.getContext('2d')!,
  debug: canvasElements.debug.getContext('2d')!
};
