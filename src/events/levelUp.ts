import { GameState, state } from '../globals/game';
import { Trigger, triggerEvent } from '../util/eventRegister';
import { getRandomUpgrade } from '../util/getRandomUpgrade';

export const handleLevelUp = () => {
  state.experience.last = state.experience.current;
  state.experience.level++;
  state.experience.next = Math.pow(state.experience.level, 2) * 50;
  state.upgradeOptions.length = 0;
  state.upgradeOptions = getRandomUpgrade(state.upgradeOptionCount);
  triggerEvent(Trigger.StateChange, GameState.Upgrade);
};
