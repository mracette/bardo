import { Canvas2DGraphics, CanvasCoordinates } from 'crco-utils';
import { debug } from '../globals/debug';
import { getSeededRandom } from './getSeededRandom';

export const makeSprites = (
  graphics: Canvas2DGraphics,
  drawSprite: (graphics: Canvas2DGraphics) => void,
  spriteSize: number,
  spriteCount: number,
  spriteCoordinateBounds: [number, number] // assumes square
): HTMLCanvasElement[] => {
  const sprites = [];
  // apply styles so we can get the line width in raster units
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
        // pull the line width directly from the context and not from the options
        lineWidth: graphics.context.lineWidth
      },
      coords: new CanvasCoordinates({
        canvas,
        nxRange: spriteCoordinateBounds,
        nyRange: spriteCoordinateBounds
      }),
      random: getSeededRandom(i)
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
