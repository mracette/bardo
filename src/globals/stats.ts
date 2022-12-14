import { EntityType } from '../entities/entityType';
import { WeaponEntityType } from '../entities/weapons/weaponTypes';

export const stats: Record<WeaponEntityType, Record<string, number[]>> = {
  [EntityType.Orb]: {
    Damage: [10, 11, 12.5, 15, 18, 21.5, 26.5],
    Range: [1.5, 1.55, 1.65, 1.8, 2, 2.25, 2.55],
    Orbs: [1, 2, 3, 4, 5, 6, 7]
  },
  [EntityType.Arrow]: {
    Damage: [6, 6.5, 7.5, 9, 11, 13.5, 17],
    'Firing Rate': [1, 1.5, 2, 3, 4, 6, 8]
  },
  [EntityType.MagicCircle]: {
    Damage: [0.5, 1, 2, 3.5, 5.5, 8, 11],
    Area: [1.5, 1.7, 2, 2.4, 2.9, 3.5, 4.2]
  },
  [EntityType.Axe]: {
    Damage: [14, 15, 17, 20, 24, 29, 35],
    'Firing Rate': [0.4, 0.5, 0.6, 0.8, 1, 1.3, 1.6]
  }
};

export const getSubtextForStats = (type: WeaponEntityType, level: number) => {
  const statsForType = stats[type];
  return Object.keys(statsForType).map((key) => {
    const attribute = statsForType[key];
    const attributeForLevel = attribute[level - 1];
    if (level === 1) {
      return `${key}: ${attributeForLevel}`;
    }
    const attributeForPrevious = attribute[level - 2];
    return `${key}: ${attributeForPrevious} -> ${attributeForLevel}`;
  });
};
