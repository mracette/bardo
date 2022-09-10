import { state } from '../globals/game';
import { graphics } from '../globals/graphics';
import { palette } from '../globals/palette';
import { player } from '../globals/player';

const barHeight = 0.15;

export const drawUi = () => {
  graphics.ui.clear();

  // health
  const health = state.health / state.maxHealth;
  graphics.ui.rect(-1, 1 - 2 * barHeight, health, barHeight, {
    fill: true,
    roughness: 0,
    styles: { fillStyle: palette.red }
  });

  // experience
  const experience =
    (state.experience.current - state.experience.last) /
    (state.experience.next - state.experience.last);
  graphics.ui.rect(-1, 1 - 4 * barHeight, experience, barHeight, {
    fill: true,
    roughness: 0,
    styles: { fillStyle: palette.seafoam }
  });

  // text
  const millis = state.time.runTime - state.time.elapsed;
  const seconds = millis / 1000;
  const minutes = Math.floor(seconds / 60);
  const secondsRemainder = Math.round(seconds - minutes * 60);
  graphics.ui.text(
    `${String(minutes).padStart(2, '0')}:${String(secondsRemainder).padStart(
      2,
      '0'
    )} until reincarnation...`,
    0,
    -0.5
  );

  graphics.ui.text(`Level: ${state.experience.level}`, -1, -0.5, {
    styles: { textAlign: 'left' }
  });
};
