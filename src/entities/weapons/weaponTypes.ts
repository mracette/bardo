import { EntityType } from '../entityType';
import { Arrow } from './arrow';
import { Axe } from './axe';
import { MagicCircle } from './circle';
import { Orb } from './orb';

export type WeaponClassType = typeof Orb | typeof Arrow | typeof Axe | typeof MagicCircle;

export type WeaponEntityType =
  | EntityType.Orb
  | EntityType.Arrow
  | EntityType.Axe
  | EntityType.MagicCircle;

export const weaponTypeToClass: Record<WeaponEntityType, WeaponClassType> = {
  [EntityType.Orb]: Orb,
  [EntityType.Arrow]: Arrow,
  [EntityType.Axe]: Axe,
  [EntityType.MagicCircle]: MagicCircle
};
