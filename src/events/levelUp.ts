import { GameState, state } from '../globals/game';
import { Trigger, triggerEvent } from '../util/eventRegister';

export const handleLevelUp = () => {
  state.experience.last = state.experience.current;
  state.experience.level++;
  state.experience.next = state.experience.level * 50;
  triggerEvent(Trigger.StateChange, GameState.Upgrade);
};
