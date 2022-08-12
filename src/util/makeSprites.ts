import { Canvas2DGraphicsRough, CanvasCoordinates } from 'crco-utils';

export const makeSprites = (
  graphics: Canvas2DGraphicsRough,
  spriteSize: number,
  draw: (graphics: Canvas2DGraphicsRough) => void,
  spriteCount = 4
): HTMLCanvasElement[] => {
  const sprites = [];
  graphics.applyStyles(graphics.options.styles);
  for (let i = 0; i < spriteCount; i++) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    const spritegraphics = new Canvas2DGraphicsRough(context, {
      ...graphics.options,
      styles: {
        ...graphics.options.styles,
        lineWidth: graphics.context.lineWidth
      },
      coords: new CanvasCoordinates({ baseWidth: spriteSize, baseHeight: spriteSize })
    });
    canvas.width = spriteSize;
    canvas.height = spriteSize;
    draw(spritegraphics);
    sprites.push(canvas);
  }
  return sprites;
};
