import { EntityType } from '../entities/entityType';

export const stats = {
  [EntityType.Orb]: {
    damage: [10, 11, 12.5, 15, 18, 21.5, 26.5],
    range: [1.5, 1.55, 1.65, 1.8, 2, 2.25, 2.55],
    orbs: [1, 2, 3, 4, 5, 6, 7]
  },
  [EntityType.Hesitation]: {
    slowdown: [0.07, 0.09, 0.11, 0.15, 0.2, 0.25, 0.34],
    area: [1.5, 1.55, 1.65, 1.85, 2.15, 2.65, 3.15]
  },
  [EntityType.Arrow]: {
    damage: [6, 6.5, 7.5, 9, 11, 13.5, 17],
    frequency: [1, 1.5, 2, 3, 4, 6, 8]
  },
  [EntityType.Spikes]: {
    damage: [3, 4, 6, 9, 13, 18, 24],
    area: [1.5, 1.7, 2, 2.4, 2.9, 3.5, 4.2]
  }
};
