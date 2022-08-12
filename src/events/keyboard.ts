import { state } from '../globals/game';

export const handleKeyDown = (key: string) => {
  if (key === 'ArrowLeft' || key === 'a') {
    state.move.left = true;
  }
  if (key === 'ArrowRight' || key === 'd') {
    state.move.right = true;
  }
  if (key === 'ArrowUp' || key === 'w') {
    state.move.up = true;
  }
  if (key === 'ArrowDown' || key === 's') {
    state.move.down = true;
  }
};

export const handleKeyUp = (key: string) => {
  if (key === 'ArrowLeft' || key === 'a') {
    state.move.left = false;
  }
  if (key === 'ArrowRight' || key === 'd') {
    state.move.right = false;
  }
  if (key === 'ArrowUp' || key === 'w') {
    state.move.up = false;
  }
  if (key === 'ArrowDown' || key === 's') {
    state.move.down = false;
  }
};
