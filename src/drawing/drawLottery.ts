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
import { Star, StarSize } from '../entities/items/star';
import { spriteCoordinateSystem } from '../entities/sprites';
import { canvasContexts, canvasElements } from '../globals/dom';
import { LotteryOption, state } from '../globals/game';
import { coordinates, graphics } from '../globals/graphics';
import { mapDimensions } from '../globals/map';
import { palette } from '../globals/palette';
import { registerEvent, Trigger } from '../util/eventRegister';
import { zzfx } from '../zzfx';

// const OPTIONS: LotteryOption[] = [
const styles: Canvas2DGraphicsOptions['styles'] = {
  fontSize: (coords) => coords.width(0.05)
};

const OPTIONS = [
  {
    draw: (x: number, y: number) => {
      graphics.lottery.star(x, y - 0.08, 0.05, 5, 0.4, {
        styles: Star.styles[StarSize.Small]
      });
      graphics.lottery.text('x20', x, y + 0.08, {
        styles
      });
    },
    collect: () => null
  },
  {
    draw: (x: number, y: number) => {
      graphics.lottery.text('Level UP', x, y, {
        styles: { ...styles, fillStyle: palette.seafoam }
      });
    },
    collect: () => null
  },
  {
    draw: (x: number, y: number) =>
      mushroom.forEach((lines) => {
        graphics.lottery.lineSegments(lines);
      }),
    collect: () => null
  },
  {
    draw: (x: number, y: number) =>
      graphics.lottery.star(x, y, 0.1, 5, 0.4, { styles: Star.styles[StarSize.Small] }),
    collect: () => null
  }
];

const COLORS = [palette.blue, palette.pink, palette.yellow, palette.teal];
const RADIUS = 0.4;
const ANGLE = TAU / OPTIONS.length;

class LotteryBackground extends CachedEntity {
  coordinateSystem = spriteCoordinateSystem.internal;
  options = undefined;
  radius = 1;
  spriteSize = mapDimensions.y;
  spriteKey = 'lb';
  drawSprite = (graphics: Canvas2DGraphics) => {
    // outline
    const angle = TAU / OPTIONS.length;
    graphics.circle(0, 0, RADIUS, {
      roughness: 0.05,
      fill: true,
      styles: { fillStyle: palette.background }
    });
    OPTIONS.forEach((option, i) => {
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
    (lotteryHighlightRotationOptions.styles.rotation.rotation / ANGLE) % OPTIONS.length;

  if (itemIndex !== previousItemIndex) {
    previousItemIndex = itemIndex;
    zzfx(...[, , 320]);
  }

  for (let i = 0; i < OPTIONS.length; i++) {
    const x = Math.cos((i + 0.5) * ANGLE) * 0.5;
    const y = Math.sin((i + 0.5) * ANGLE) * 0.5;
    OPTIONS[i].draw(x, y);
    // OPTIONS.forEach((_, i) => {
    //   graphics.lottery.text(
    //     String(i),
    //     Math.cos((i + 0.5) * ANGLE) * 0.5,
    //     Math.sin((i + 0.5) * ANGLE) * 0.5,
    //     {
    //       roughness: 0,
    //       styles: {
    //         textAlign: 'center',
    //         textBaseline: 'middle'
    //       }
    //     }
    //   );
    // });
  }
};
