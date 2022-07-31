import { aspectRatioResize } from 'crco-utils';
import { drawTiles } from './drawing/drawTiles';
import { PLAYER } from './entities/player';
import { CANVAS_ELEMENTS, GRAPHICS } from './globals/dom';
import { MAP_DIMENSIONS } from './globals/game';
import { registerEvent, Trigger } from './registerEvent';
import { setAllCanvasDimensions } from './util/setCanvasDimensions';
import './styles.css';

const setup = () => {
  Object.values(CANVAS_ELEMENTS).forEach((element) =>
    aspectRatioResize(element, MAP_DIMENSIONS)
  );

  registerEvent(Trigger.CanvasResize, () => drawTiles(GRAPHICS.map));
  registerEvent(Trigger.CanvasResize, () => PLAYER.draw(GRAPHICS.player));
};

setup();
