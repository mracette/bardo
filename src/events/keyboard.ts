import { STATE } from '../globals/game';

export const handleKeyDown = (key: string) => {
  if (key === 'ArrowLeft' || key === 'a') {
    STATE.move.left = true;
  }
  if (key === 'ArrowRight' || key === 'd') {
    STATE.move.right = true;
  }
  if (key === 'ArrowUp' || key === 'w') {
    STATE.move.up = true;
  }
  if (key === 'ArrowDown' || key === 's') {
    STATE.move.down = true;
  }
};

export const handleKeyUp = (key: string) => {
  if (key === 'ArrowLeft' || key === 'a') {
    STATE.move.left = false;
  }
  if (key === 'ArrowRight' || key === 'd') {
    STATE.move.right = false;
  }
  if (key === 'ArrowUp' || key === 'w') {
    STATE.move.up = false;
  }
  if (key === 'ArrowDown' || key === 's') {
    STATE.move.down = false;
  }
};
