import { GameState, state } from '../globals/game';
import { Trigger, triggerEvent } from '../util/eventRegister';
import { getRandomUpgrade } from '../util/getRandomUpgrade';

export const handleLevelUp = () => {
  state.experience.last = state.experience.current;
  state.experience.level++;
  state.experience.next = state.experience.level * 50;
  state.upgradeOptions.length = 0;
  for (let i = 0; i < state.upgradeOptionCount; i++) {
    state.upgradeOptions.push(getRandomUpgrade());
  }
  triggerEvent(Trigger.StateChange, GameState.Upgrade);
};
