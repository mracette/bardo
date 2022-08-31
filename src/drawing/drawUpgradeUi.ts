import { Canvas2DGraphics, CanvasCoordinates } from 'crco-utils';
import { state } from '../globals/game';
import { graphics } from '../globals/graphics';
import { mapDimensions } from '../globals/map';

export const drawUpgradeUi = () => {
  graphics.upgrade.clear();
  for (let i = 0; i < state.upgradeOptionCount; i++) {
    const panelCoords = new CanvasCoordinates({
      offsetX:
        graphics.upgrade.coords.nx(-1) +
        graphics.upgrade.coords.width(i / state.upgradeOptionCount),
      offsetY: graphics.upgrade.coords.ny(-1),
      baseWidth: graphics.upgrade.coords.width() / state.upgradeOptionCount,
      baseHeight: graphics.upgrade.coords.height(),
      padding: 0.05
    });
    const panelGraphics = new Canvas2DGraphics(graphics.upgrade.context, {
      ...graphics.upgrade.options,
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
