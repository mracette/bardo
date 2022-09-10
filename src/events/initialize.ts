import { Arrow } from '../entities/weapons/arrow';
import { Axe } from '../entities/weapons/axe';
import { MagicCircle } from '../entities/weapons/circle';
import { Orb, OrbInstance } from '../entities/weapons/orb';
import { canvasElements } from '../globals/dom';
import { GameState, state } from '../globals/game';
import { origin } from '../globals/map';
import { palette } from '../globals/palette';
import { registerEvent, Trigger, triggerEvent } from '../util/eventRegister';
import { handleKeyDown, handleKeyUp } from './keyboard';
import { handleLevelUp } from './levelUp';
import { handleResize } from './resize';
import { spawn } from './spawn';
import { handleStateChange } from './stateChange';
import { handleWindowResize } from './windowResize';

export const handleInitialize = () => {
  document.body.style.backgroundColor = palette.background;
  canvasElements.map.style.zIndex = '-1';
  registerEvent(Trigger.Tick, spawn);
  handleLevelUp(false);
  // new Orb();
  new Arrow();
  // new MagicCircle();
  // new Axe();
};
