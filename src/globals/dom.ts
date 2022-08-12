export const canvasElements = {
  map: document.querySelector('canvas#map') as HTMLCanvasElement,
  player: document.querySelector('canvas#player') as HTMLCanvasElement,
  debug: document.querySelector('canvas#debug') as HTMLCanvasElement
};

export const canvasContexts = {
  map: canvasElements.map.getContext('2d')!,
  player: canvasElements.player.getContext('2d')!,
  debug: canvasElements.debug.getContext('2d')!
};
