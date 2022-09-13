import { GameState, state } from '../globals/game';
import { playSound, Sounds } from '../globals/sounds';
import { Trigger, triggerEvent } from '../util/eventRegister';
import { getRandomUpgrade } from '../util/getRandomUpgrade';
import { zzfx } from '../zzfx';

export const handleLevelUp = (sound = true, upgrade = true) => {
  state.experience.last = state.experience.current;
  state.experience.level++;
  state.experience.next = Math.pow(state.experience.level, 2.5) * 75;
  state.upgradeOptions.length = 0;
  state.upgradeOptions = getRandomUpgrade();
  if (sound) {
    playSound(Sounds.LevelUp);
  }
  if (upgrade && state.upgradeOptions.length > 0) {
    triggerEvent(Trigger.StateChange, GameState.Upgrade);
  }
};
