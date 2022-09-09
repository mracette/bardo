import { Canvas2DGraphics, CanvasCoordinates, Vector2 } from '../crco';
import { state } from '../globals/game';
import { graphics, sharedOptions, sharedStyles } from '../globals/graphics';
import { origin } from '../globals/map';
import { palette } from '../globals/palette';
import { UpgradeOption } from '../util/getRandomUpgrade';
import { getSeededRandom } from '../util/getSeededRandom';

const drawUpgradeOption = (option: UpgradeOption, selected: boolean, index: number) => {
  const color = selected ? palette.seafoam : palette.white;
  const scale = selected ? 1.1 : 1;
  const offsetX = selected
    ? graphics.upgrade.coords.width(scale - 1) / state.upgradeOptionCount / 2
    : 0;
  const offsetY = selected ? graphics.upgrade.coords.height(scale - 1) / 2 : 0;
  const panelCoords = new CanvasCoordinates({
    offsetX:
      graphics.upgrade.coords.nx(-1) -
      offsetX +
      graphics.upgrade.coords.width(index / state.upgradeOptionCount),
    offsetY: graphics.upgrade.coords.ny(-1) - offsetY,
    baseWidth: graphics.upgrade.coords.width(scale) / state.upgradeOptionCount,
    baseHeight: graphics.upgrade.coords.height(scale),
    padding: 0
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
      strokeStyle: color
    }
  });
  panelGraphics.text(option.text, 0, -0.8, {
    styles: {
      textBaseline: 'top',
      fillStyle: color
    },
    roughness: 0,
    maxTextWidth: panelCoords.width(0.9)
  });

  option.subText.forEach((content, i) => {
    panelGraphics.text(content, 0, 0.3 + 0.2 * i, {
      roughness: 0
    });
  });

  const previewGraphics = new Canvas2DGraphics(graphics.upgrade.context, {
    ...sharedOptions,
    styles: {
      ...sharedStyles,
      lineWidth: (coords) => coords.width(0.03)
    },
    roughness: option.text.toLowerCase().includes('orb') ? 0.05 : 0.25,
    random: getSeededRandom(0),
    coords: new CanvasCoordinates({
      baseWidth: panelGraphics.coords.baseWidth,
      baseHeight: panelGraphics.coords.baseWidth,
      offsetX: panelGraphics.coords.offsetX,
      offsetY: panelGraphics.coords.offsetY! + panelGraphics.coords.height(0.1),
      padding: panelGraphics.coords.padding! + 0.25
    })
  });

  panelGraphics.options = graphics.gameplay.options;
  if (option.text.toLowerCase().includes('orb')) {
    previewGraphics.options.roughness = 0.05;
  } else {
    previewGraphics.options.roughness = 0.25;
  }
  option.draw(previewGraphics, 0.2);
  previewGraphics.rect(-1, -1, 1, 1, { roughness: 0.25 });
};

export const drawUpgradeUi = () => {
  graphics.upgrade.options.random = getSeededRandom(0);
  graphics.upgrade.clear();
  for (let i = 0; i < state.upgradeOptionCount; i++) {
    const option = state.upgradeOptions[i];
    drawUpgradeOption(option, state.upgradeSelected === i, i);
  }
  drawUpgradeOption(
    state.upgradeOptions[state.upgradeSelected],
    true,
    state.upgradeSelected
  );
};
