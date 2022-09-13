import { audio } from '../audio/GameAudio';
import { Arrow } from '../entities/weapons/arrow';
import { canvasElements } from '../globals/dom';
import { palette } from '../globals/palette';
import { registerEvent, Trigger } from '../util/eventRegister';
import { handleLevelUp } from './levelUp';
import { spawn } from './spawn';

export const handleInitialize = () => {
  document.body.style.backgroundColor = palette.background;
  canvasElements.map.style.zIndex = '-1';
  audio.start();
  registerEvent(Trigger.Tick, spawn);
  handleLevelUp(false, false);
  new Arrow();
};
