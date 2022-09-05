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
  text: string;
  onChooseUpgrade: () => void;
}

export const getRandomUpgrade = (count: number) => {
  const allChoices = WEAPONS.map((type) => {
    const existing = state.weapons.find((weapon) => weapon.type === type);
    const level = (existing?.level ?? 0) + 1;
    let onChooseUpgrade: () => void;
    let text: string;
    switch (type) {
      case EntityType.Arrow:
        if (level === 1) {
          onChooseUpgrade = () => new Arrow();
        } else if (existing) {
          onChooseUpgrade = () => existing.upgrade();
        }
        text = `Arrow - L${level}`;
        break;
      case EntityType.Axe:
        if (level === 1) {
          onChooseUpgrade = () => new Axe();
        } else if (existing) {
          onChooseUpgrade = () => existing.upgrade();
        }
        text = `Axe - L${level}`;
        break;
      case EntityType.Orb:
        if (level === 1) {
          onChooseUpgrade = () => new Orb();
        } else if (existing) {
          onChooseUpgrade = () => existing.upgrade();
        }
        text = `Orb - L${level}`;
        break;
      case EntityType.MagicCircle:
        if (level === 1) {
          onChooseUpgrade = () => new MagicCircle();
        } else if (existing) {
          onChooseUpgrade = () => existing.upgrade();
        }
        text = `Summoning Circle - L${level}`;
        break;
      default:
        throw new Error();
    }
    return {
      text,
      // @ts-ignore
      onChooseUpgrade
    };
  });

  const choices = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * allChoices.length);
    choices.push(allChoices[randomIndex]);
    allChoices.splice(randomIndex, 1);
  }

  return choices;
};
