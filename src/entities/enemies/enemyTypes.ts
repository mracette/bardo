import { EntityType } from '../entityType';
import { Goat } from './goat';
import { Prisoner } from './prisoner';
import { Reaper } from './reaper';
import { Tragedy } from './tragedy';
import { Wrestler } from './wrestler';

export type EnemyClassType =
  | typeof Goat
  | typeof Wrestler
  | typeof Tragedy
  | typeof Reaper
  | typeof Prisoner;

export type EnemyEntityType =
  | EntityType.Goat
  | EntityType.Tragedy
  | EntityType.Wrestler
  | EntityType.Prisoner
  | EntityType.Reaper;

export const enemyTypeToClass: Record<EnemyEntityType, EnemyClassType> = {
  [EntityType.Goat]: Goat,
  [EntityType.Tragedy]: Tragedy,
  [EntityType.Wrestler]: Wrestler,
  [EntityType.Prisoner]: Prisoner,
  [EntityType.Reaper]: Reaper
};
