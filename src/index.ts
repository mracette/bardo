import { drawTiles } from "./drawing/drawTiles";
import { CANVAS_ELEMENTS, GRAPHICS } from "./globals/dom";
import { SCREEN_DIMENSIONS } from "./globals/game";
import { registerEvent, Trigger } from "./registerEvent";
import { aspectRatioResize } from "crco-utils";
import "./styles.css";

const setup = () => {
  Object.values(CANVAS_ELEMENTS).forEach((element) => {
    aspectRatioResize(element, SCREEN_DIMENSIONS);
  });
  registerEvent(() => drawTiles(GRAPHICS.map), Trigger.CanvasResize);
};

setup();
