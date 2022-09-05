import { Canvas2DGraphics, CanvasCoordinates } from 'crco-utils';
import { state } from '../globals/game';
import { graphics } from '../globals/graphics';
import { palette } from '../globals/palette';
import { getSeededRandom } from '../util/getSeededRandom';

export const drawUpgradeUi = () => {
  graphics.upgrade.options.random = getSeededRandom(0);
  graphics.upgrade.clear();
  for (let i = 0; i < state.upgradeOptionCount; i++) {
    const option = state.upgradeOptions[i];
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
    panelGraphics.rect(-1, -1, 1, 1, {
      stroke: true,
      fill: true,
      styles: {
        fillStyle: palette.background,
        strokeStyle: state.upgradeSelected === i ? palette.seafoam : palette.white
      }
    });
    panelGraphics.text(option.text, 0, -0.8, {
      styles: {
        textBaseline: 'top',
        fillStyle: state.upgradeSelected === i ? palette.seafoam : palette.white
      },
      roughness: 0,
      maxTextWidth: panelCoords.width(0.9)
    });
  }
};
