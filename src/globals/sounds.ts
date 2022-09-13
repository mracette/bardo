import { zzfx, zzfxX } from '../zzfx';

export const enum Sounds {
  LevelUp,
  Damage,
  Star,
  Spinner,
  Enemy,
  Heart,
  GameOver
}

const soundBank: Partial<Record<Sounds, AudioBufferSourceNode>> = {};

export const playSound = (type: Sounds) => {
  if (!(type in soundBank)) {
    let z;
    if (type === Sounds.LevelUp) {
      z = zzfx(
        ...[0.2, 0, 80, 0.3, 0.5, 1.25, 2, 0.1, -0.73, 3.42, -430, 0.09, 0.17, , , , 0.19]
      );
    }
    if (type === Sounds.Damage) {
      z = zzfx(...[, , 528, 0.01, , 0.48, , 0.6, -11.6, , , , 0.32, 4.2]);
    }
    if (type === Sounds.Spinner) {
      z = zzfx(...[, , 320]);
    }
    if (type === Sounds.Enemy) {
      z = zzfx(...[, , 129, 0.01, , , , , , , , , , 5, , , , 0.4]);
    }
    if (type === Sounds.Heart) {
      z = zzfx(...[, , 20, 0.04, , 0.6, , 1.31, , , -990, 0.06, 0.17, , , 0.04, 0.07]);
    }
    if (type === Sounds.Star) {
      z = zzfx(...[0.4, 0, 900, , 0.06, 0.24, 1, 1.82, , , 400, 0.06]);
    }
    if (type === Sounds.GameOver) {
      z = zzfx(...[, , 333, 0.01, 0, 0.9, 4, 1.9, , , , , , 0.5, , 0.6]);
    }
    // @ts-ignore
    soundBank[type] = z;
  } else {
    const buffer = new AudioBufferSourceNode(zzfxX, { buffer: soundBank[type]!.buffer! });
    buffer.connect(zzfxX.destination);
    buffer.start(0);
  }
};
