import { Canvas2DGraphics, CanvasCoordinates } from 'crco-utils';
import { debug } from '../globals/debug';

export const makeSprites = (
  graphics: Canvas2DGraphics,
  drawSprite: (graphics: Canvas2DGraphics) => void,
  spriteSize: number,
  spriteCount: number,
  spriteCoordinateBounds: [number, number] // assumes square
): HTMLCanvasElement[] => {
  const sprites = [];
  graphics.applyStyles(graphics.options.styles);
  for (let i = 0; i < spriteCount; i++) {
    const canvas = document.createElement('canvas');
    canvas.width = spriteSize;
    canvas.height = spriteSize;
    const context = canvas.getContext('2d')!;
    const spriteGraphics = new Canvas2DGraphics(context, {
      ...graphics.options,
      styles: {
        ...graphics.options.styles,
        lineWidth: graphics.context.lineWidth
      },
      coords: new CanvasCoordinates({
        canvas,
        nxRange: spriteCoordinateBounds,
        nyRange: spriteCoordinateBounds
      })
    });
    drawSprite(spriteGraphics);
    if (debug) {
      spriteGraphics.context.save();
      spriteGraphics.context.fillStyle = 'rgba(255,0,0,0.2)';
      spriteGraphics.context.fillRect(0, 0, canvas.width, canvas.height);
      spriteGraphics.context.restore();
    }
    sprites.push(canvas);
  }
  return sprites;
};
