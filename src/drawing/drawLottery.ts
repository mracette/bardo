import { mushroom } from '../../svg/mushroom';
import {
  Canvas2DGraphics,
  Canvas2DGraphicsOptions,
  CanvasCoordinates,
  PI,
  TAU,
  Vector2
} from '../crco';
import { CachedEntity } from '../entities/entity';
import { EntityType } from '../entities/entityType';
import { Heart } from '../entities/items/heart';
import { Mushroom } from '../entities/items/mushroom';
import { Star, StarSize } from '../entities/items/star';
import { cache, spriteCoordinateSystem } from '../entities/sprites';
import { canvasContexts, canvasElements } from '../globals/dom';
import { LotteryOption, state } from '../globals/game';
import { coordinates, graphics } from '../globals/graphics';
import { mapDimensions, tileWidth } from '../globals/map';
import { palette } from '../globals/palette';
import { player } from '../globals/player';
import { stats } from '../globals/stats';
import { registerEvent, Trigger, triggerEvent } from '../util/eventRegister';
import { makeSprites } from '../util/makeSprites';
import { zzfx } from '../zzfx';

const cacheKeys = {
  [EntityType.Mushroom]: EntityType.Mushroom + 'lotto',
  [EntityType.Heart]: EntityType.Heart + 'lotto',
  [EntityType.Star]: EntityType.Star + 'lotto'
};

export const cacheLotteryGraphics = () => {
  cache.sprites[cacheKeys[EntityType.Mushroom]] = makeSprites(
    graphics.lottery,
    Mushroom.staticDraw,
    graphics.lottery.coords.width(4 * tileWidth),
    1,
    spriteCoordinateSystem.external
  );
  cache.sprites[cacheKeys[EntityType.Heart]] = makeSprites(
    graphics.lottery,
    Heart.staticDraw,
    graphics.lottery.coords.width(3 * tileWidth),
    1,
    spriteCoordinateSystem.external
  );
  cache.sprites[cacheKeys[EntityType.Star]] = makeSprites(
    graphics.lottery,
    (graphics: Canvas2DGraphics) =>
      graphics.star(0, 0, 0.4, 5, 0.4, {
        fill: true,
        styles: Star.styles[StarSize.Small]
      }),
    graphics.lottery.coords.width(3 * tileWidth),
    1,
    spriteCoordinateSystem.internal
  );
};

const styles: Canvas2DGraphicsOptions['styles'] = {
  fontSize: (coords) => coords.width(0.05)
};

export const LOTTERY_OPTIONS = [
  {
    draw: (x: number, y: number) => {
      try {
        graphics.lottery.drawImage(
          cache.sprites[cacheKeys[EntityType.Star]][0]!,
          x - 0.1,
          y - 0.15
        );
        graphics.lottery.text(`x20`, x, y + 0.08, {
          styles
        });
      } catch {
        cacheLotteryGraphics();
      }
    },
    collect: () => {
      state.lottery.starsToCollect = 20;
    }
  },
  {
    draw: (x: number, y: number) => {
      graphics.lottery.text('+1 Level', x, y, {
        styles: { ...styles, fillStyle: palette.seafoam }
      });
    },
    collect: () => {
      triggerEvent(Trigger.LevelUp);
    }
  },
  {
    draw: (x: number, y: number) => {
      try {
        graphics.lottery.drawImage(
          cache.sprites[cacheKeys[EntityType.Heart]][0]!,
          x - 0.1,
          y - 0.1
        );
        graphics.lottery.text(`x3`, x, y + 0.13, {
          styles
        });
      } catch {
        cacheLotteryGraphics();
      }
    },
    collect: () => {
      state.lottery.heartsToCollect = 3;
    }
  },
  {
    draw: (x: number, y: number) => {
      try {
        graphics.lottery.drawImage(
          cache.sprites[cacheKeys[EntityType.Mushroom]][0]!,
          x - 0.1,
          y - 0.1
        );
      } catch {
        cacheLotteryGraphics();
      }
    },
    collect: () => {
      state.stats.mushroomsEaten++;
      state.shroomed.active = true;
      state.shroomed.start = state.time.elapsed;
    }
  }
];

const COLORS = [palette.blue, palette.pink, palette.yellow, palette.teal];
const RADIUS = 0.4;
const ANGLE = TAU / LOTTERY_OPTIONS.length;

class LotteryBackground extends CachedEntity {
  coordinateSystem = spriteCoordinateSystem.internal;
  options = undefined;
  radius = 1;
  spriteSize = mapDimensions.y;
  spriteKey = 'lb';
  drawSprite = (graphics: Canvas2DGraphics) => {
    // outline
    const angle = TAU / LOTTERY_OPTIONS.length;
    graphics.circle(0, 0, RADIUS, {
      roughness: 0.05,
      fill: true,
      styles: { fillStyle: palette.background }
    });
    LOTTERY_OPTIONS.forEach((option, i) => {
      const angle1 = i * angle;
      const angle2 = (i + 1) * angle;
      const color = COLORS[i];
      graphics.lineSegments(
        [
          [0, 0],
          [Math.cos(angle1) * RADIUS * 2, Math.sin(angle1) * RADIUS * 2]
        ],
        {
          roughness: 0.1
        }
      );
    });
  };
}

class LotteryArrow extends CachedEntity {
  coordinateSystem = spriteCoordinateSystem.internal;
  options = undefined;
  radius = 1;
  spriteSize = mapDimensions.y;
  spriteKey = 'la';
  drawSprite = (graphics: Canvas2DGraphics) => {
    const radius = 0.6;
    graphics.lineSegments(
      [
        [0, 0],
        [radius, 0],
        [radius * 0.9, -radius * 0.1],
        [radius, 0],
        [radius * 0.9, radius * 0.1]
      ],
      { roughness: 0.05 }
    );
  };
}

class LotteryHighlight extends CachedEntity {
  coordinateSystem = spriteCoordinateSystem.internal;
  options = undefined;
  radius = 1;
  spriteSize = mapDimensions.y;
  spriteKey = 'lh';
  drawSprite = (graphics: Canvas2DGraphics) => {
    graphics.lineSegments(
      [
        [0, 0],
        [Math.cos(0) * RADIUS * 2, Math.sin(0) * RADIUS * 2]
      ],
      {
        roughness: 0,
        fill: false,
        stroke: false,
        beginPath: true
      }
    );
    graphics.arc(0, 0, RADIUS, 0, ANGLE, {
      roughness: 0,
      fill: false,
      stroke: false,
      beginPath: false
    });
    graphics.lineSegments(
      [
        [0, 0],
        [Math.cos(ANGLE) * RADIUS * 2, Math.sin(ANGLE) * RADIUS * 2]
      ],
      {
        roughness: 0,
        fill: true,
        stroke: false,
        beginPath: false,
        styles: { fillStyle: 'rgba(255,255,255,.1)' }
      }
    );
  };
}

const lotteryArrow = new LotteryArrow(
  new Vector2((mapDimensions.x - mapDimensions.y) / 2, 0)
);

const lotteryArrowRotationOptions: Canvas2DGraphicsOptions = {
  styles: {
    rotation: {
      origin: lotteryArrow.center.clone(),
      rotation: 0
    }
  }
};

const lotteryHighlightRotationOptions = {
  styles: {
    rotation: {
      origin: lotteryArrow.center.clone(),
      rotation: 0
    }
  }
};

const lotteryBackground = new LotteryBackground(
  new Vector2((mapDimensions.x - mapDimensions.y) / 2, 0)
);

const lotteryHighlight = new LotteryHighlight(
  new Vector2((mapDimensions.x - mapDimensions.y) / 2, 0)
);

export const LOTTERY_DURATION = 15000;

let previousItemIndex: number;

export const drawLottery = (alpha: number) => {
  graphics.lottery.clear();
  const elapsed = state.time.elapsed - state.timestamp.lotteryStart;
  // @ts-ignore
  lotteryArrowRotationOptions.styles.rotation.rotation +=
    0.00001 * Math.max(0, 0.8 * LOTTERY_DURATION - elapsed);
  // @ts-ignore
  lotteryHighlightRotationOptions.styles.rotation.rotation =
    // @ts-ignore
    Math.floor(lotteryArrowRotationOptions.styles.rotation.rotation / ANGLE) * ANGLE;
  lotteryBackground.draw(alpha);
  lotteryHighlight.draw(alpha, lotteryHighlightRotationOptions);
  lotteryArrow.draw(alpha, lotteryArrowRotationOptions);

  const itemIndex =
    Math.round(lotteryHighlightRotationOptions.styles.rotation.rotation / ANGLE) %
    LOTTERY_OPTIONS.length;

  if (itemIndex !== previousItemIndex) {
    previousItemIndex = itemIndex;
    state.lottery.collect = LOTTERY_OPTIONS[itemIndex].collect;
    zzfx(...[, , 320]);
  }

  for (let i = 0; i < LOTTERY_OPTIONS.length; i++) {
    const x = Math.cos((i + 0.5) * ANGLE) * 0.5;
    const y = Math.sin((i + 0.5) * ANGLE) * 0.5;
    LOTTERY_OPTIONS[i].draw(x, y);
  }
};
