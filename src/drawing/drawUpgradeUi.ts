import { Canvas2DGraphics, CanvasCoordinates, Vector2 } from 'crco-utils';
import { state } from '../globals/game';
import { graphics, sharedOptions, sharedStyles } from '../globals/graphics';
import { origin } from '../globals/map';
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

    option.subText.forEach((content, i) => {
      panelGraphics.text(content, 0, 0.3 + 0.2 * i, { roughness: 0 });
    });

    const previewGraphics = new Canvas2DGraphics(graphics.upgrade.context, {
      ...sharedOptions,
      styles: {
        ...sharedStyles,
        lineWidth: (coords) => coords.width(0.01)
      },
      roughness: 0.05,
      random: getSeededRandom(0),
      coords: new CanvasCoordinates({
        baseWidth: panelGraphics.coords.baseWidth,
        baseHeight: panelGraphics.coords.baseWidth,
        offsetX: panelGraphics.coords.offsetX,
        offsetY: panelGraphics.coords.offsetY! + panelGraphics.coords.height(0.1),
        padding: panelGraphics.coords.padding! + 0.2
      })
    });

    previewGraphics.rect(-1, -1, 1, 1);

    panelGraphics.options = graphics.gameplay.options;
    option.draw(previewGraphics, 0.2);
  }
};
