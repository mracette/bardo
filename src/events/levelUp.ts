import { GameState, state } from '../globals/game';
import { Trigger, triggerEvent } from '../util/eventRegister';
import { getRandomUpgrade } from '../util/getRandomUpgrade';
import { zzfx } from '../zzfx';

export const handleLevelUp = () => {
  state.experience.last = state.experience.current;
  state.experience.level++;
  state.experience.next = Math.pow(state.experience.level, 2) * 50;
  state.upgradeOptions.length = 0;
  state.upgradeOptions = getRandomUpgrade(state.upgradeOptionCount);
  zzfx(...[, , 80, 0.3, 0.5, 1.25, 2, 0.1, -0.73, 3.42, -430, 0.09, 0.17, , , , 0.19]);
  triggerEvent(Trigger.StateChange, GameState.Upgrade);
};
