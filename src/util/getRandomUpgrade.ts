import { random } from 'crco-utils';
import { EntityType } from '../entities/entityType';
import { Arrow } from '../entities/weapons/arrow';
import { Axe } from '../entities/weapons/axe';
import { MagicCircle } from '../entities/weapons/circle';
import { Orb } from '../entities/weapons/orb';
import { WeaponType } from '../entities/weapons/weapon';
import { state } from '../globals/game';

const WEAPONS = [
  EntityType.Arrow,
  EntityType.Axe,
  EntityType.Orb,
  EntityType.MagicCircle
];

export interface UpgradeOption {
  Constructor?: WeaponType;
  text: string;
  upgrade?: () => void;
}

export const getRandomUpgrade = () => {
  const choice = random(WEAPONS);
  const existing = state.weapons.find((weapon) => weapon.type === choice);
  const level = (existing?.level ?? 0) + 1;
  let Constructor: WeaponType | undefined;
  let upgrade: () => void | undefined;
  let text;
  switch (choice) {
    case EntityType.Arrow:
      if (level === 1) {
        Constructor = Arrow;
      } else if (existing) {
        upgrade = existing.upgrade;
      }
      text = `Arrow - L${level}`;
      break;
    case EntityType.Axe:
      if (level === 1) {
        Constructor = Axe;
      } else if (existing) {
        upgrade = existing.upgrade;
      }
      text = `Axe - L${level}`;
      break;
    case EntityType.Orb:
      if (level === 1) {
        Constructor = Orb;
      } else if (existing) {
        upgrade = existing.upgrade;
      }
      text = `Orb - L${level}`;
      break;
    case EntityType.MagicCircle:
      if (level === 1) {
        Constructor = MagicCircle;
      } else if (existing) {
        upgrade = existing.upgrade;
      }
      text = `Summoning Circle - L${level}`;
      break;
    default:
      throw new Error();
  }
  return {
    Constructor,
    //@ts-ignore
    upgrade,
    text
  };
};
