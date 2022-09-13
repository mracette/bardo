import { Canvas2DGraphicsOptions } from '../crco';
import { EntityType } from '../entities/entityType';
import { GameState, state } from '../globals/game';
import { graphics } from '../globals/graphics';
import { palette } from '../globals/palette';

const formatStat = (value: number) => Math.round(value).toLocaleString();

export const drawStats = () => {
  graphics.upgrade.clear();
  graphics.upgrade.rect(-1, -1, 1, 1, {
    fill: true,
    stroke: true,
    roughness: 0,
    styles: {
      fillStyle: palette.background
    }
  });
  let styles: Canvas2DGraphicsOptions['styles'] = {
    textAlign: 'left',
    textBaseline: 'middle',
    fontSize: (coords) => coords.width(0.025),
    lineWidth: (coords) => coords.width(0.001)
  };
  let y = -0.6;
  let interval = 0.1;
  graphics.upgrade.lineSegments(
    [
      [-1, y],
      [1, y]
    ],
    { styles, roughness: 0 }
  );
  graphics.upgrade.text(
    `Score: ${formatStat(state.experience.current)}`,
    -0.9,
    y + interval,
    {
      styles
    }
  );
  graphics.upgrade.text(`Level: ${state.experience.level}`, -0.9, y + 2 * interval, {
    styles
  });
  y = y + interval * 3;
  graphics.upgrade.lineSegments(
    [
      [-1, y],
      [1, y]
    ],
    { styles, roughness: 0 }
  );

  graphics.upgrade.text(
    `Damage Dealt: ${formatStat(state.stats.total)}`,
    -0.9,
    y + interval,
    {
      styles
    }
  );
  graphics.upgrade.text(
    `Arrow: ${formatStat(state.stats.weapons[EntityType.Arrow])}`,
    -0.9,
    y + 2 * interval,
    { styles }
  );
  graphics.upgrade.text(
    `Summoning Circle: ${formatStat(state.stats.weapons[EntityType.MagicCircle])}`,
    -0.9,
    y + 3 * interval,
    { styles }
  );
  graphics.upgrade.text(
    `Axe: ${formatStat(state.stats.weapons[EntityType.Axe])}`,
    -0.9,
    y + 4 * interval,
    { styles }
  );
  graphics.upgrade.text(
    `Orb: ${formatStat(state.stats.weapons[EntityType.Orb])}`,
    -0.9,
    y + 5 * interval,
    { styles }
  );

  y = y + interval * 6;
  graphics.upgrade.lineSegments(
    [
      [-1, y],
      [1, y]
    ],
    { styles, roughness: 0 }
  );
  graphics.upgrade.text(
    `Damage Taken: ${formatStat(state.stats.damageTaken)}`,
    -0.9,
    y + interval,
    {
      styles
    }
  );
  y = y + interval * 2;
  graphics.upgrade.lineSegments(
    [
      [-1, y],
      [1, y]
    ],
    { styles, roughness: 0 }
  );
  graphics.upgrade.text(
    `Hallucinations Banished: ${formatStat(state.stats.hallucinationsBanished)}`,
    -0.9,
    y + interval,
    { styles }
  );
  // y = y + interval * 2;
  // graphics.upgrade.lineSegments(
  //   [
  //     [-1, y],
  //     [1, y]
  //   ],
  //   { styles, roughness: 0 }
  // );
  // graphics.upgrade.text(
  //   `Mushrooms Eaten: ${formatStat(state.stats.mushroomsEaten)}`,
  //   -0.9,
  //   y + interval,
  //   {
  //     styles
  //   }
  // );
  // graphics.upgrade.text(
  //   `Chests Unlocked: ${formatStat(state.stats.chestsUnlocked)}`,
  //   -0.9,
  //   y + 2 * interval,
  //   {
  //     styles
  //   }
  // );
  if (state.gameState === GameState.Paused) {
    graphics.upgrade.text('Paused', 0, -0.8, {
      styles: { ...styles, textAlign: 'center', fontSize: (coords) => coords.width(0.05) }
    });
    graphics.upgrade.text('Press enter to resume', 0, -0.675, {
      styles: { ...styles, textAlign: 'center', fontSize: (coords) => coords.width(0.02) }
    });
  }
  if (state.gameState === GameState.Gameover) {
    graphics.upgrade.text('Game Over', 0, -0.8, {
      styles: { ...styles, textAlign: 'center', fontSize: (coords) => coords.width(0.05) }
    });
    graphics.upgrade.text('Refresh to try again', 0, -0.675, {
      styles: { ...styles, textAlign: 'center', fontSize: (coords) => coords.width(0.02) }
    });
  }
  if (state.gameState === GameState.Reincarnation) {
    graphics.upgrade.text('Reincarnation', 0, -0.8, {
      styles: { ...styles, textAlign: 'center', fontSize: (coords) => coords.width(0.05) }
    });
    graphics.upgrade.text('See you in the next life!', 0, -0.675, {
      styles: { ...styles, textAlign: 'center', fontSize: (coords) => coords.width(0.02) }
    });
  }
};
