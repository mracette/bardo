import { GameState, state } from '../globals/game';

export const handleStateChange = (next: GameState) => {
  switch (next) {
    case GameState.Upgrade: {
      state.upgradeSelected = 0;
    }
  }
  state.gameState = next;
};
