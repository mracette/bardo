import { Canvas2DGraphicsRough, CanvasCoordinates } from 'crco-utils';
import { state } from '../globals/game';
import { graphics } from '../globals/graphics';
import { mapDimensions } from '../globals/map';

export const drawUi = () => {
  graphics.ui.clear();
  for (let i = 0; i < state.upgradeOptionCount; i++) {
    const panelCoords = new CanvasCoordinates({
      offsetX:
        graphics.ui.coords.nx(-1) +
        graphics.ui.coords.width(i / state.upgradeOptionCount),
      offsetY: graphics.ui.coords.ny(-1),
      baseWidth: graphics.ui.coords.width() / state.upgradeOptionCount,
      baseHeight: graphics.ui.coords.height(),
      padding: 0.05
    });
    const panelGraphics = new Canvas2DGraphicsRough(graphics.ui.context, {
      ...graphics.ui.options,
      coords: panelCoords,
      stroke: false
    });
    panelGraphics.rect(
      -1,
      -1,
      1,
      panelGraphics.coords.height() / panelGraphics.coords.width(),
      {
        stroke: state.upgradeSelected === i,
        fill: true,
        styles: {
          fillStyle: 'rgba(255,255,255,.5)'
        }
      }
    );
    panelGraphics.text('TEST', 0, -0.8, { styles: { textBaseline: 'top' } });
  }
};
