import { Canvas2DGraphics, random, Vector2 } from '../crco';
import { EntityType } from '../entities/entityType';
import { Arrow, ArrowInstance } from '../entities/weapons/arrow';
import { Axe, AxeInstance } from '../entities/weapons/axe';
import { MagicCircle, MagicCircleInstance } from '../entities/weapons/circle';
import { Orb, OrbInstance } from '../entities/weapons/orb';
import { Weapon, WeaponInstance } from '../entities/weapons/weapon';
import {
  WeaponClassType,
  WeaponEntityType,
  weaponTypeToClass
} from '../entities/weapons/weaponTypes';
import { state } from '../globals/game';
import { origin } from '../globals/map';
import { getSubtextForStats, stats } from '../globals/stats';

type StaticDraw =
  | ((graphics: Canvas2DGraphics) => void)
  | ((graphic: Canvas2DGraphics, radius: number) => void);
export interface UpgradeOption {
  level: number;
  type: WeaponEntityType;
  text: string;
  subText: string[];
  onChooseUpgrade: () => void;
  draw: StaticDraw;
}

export const getRandomUpgrade = (count: number): UpgradeOption[] => {
  const allChoices = (
    Object.keys(weaponTypeToClass) as unknown as WeaponEntityType[]
  ).map((type) => {
    const existing = state.weapons.find((weapon) => weapon.type === Number(type));
    const level = (existing?.level ?? 0) + 1;

    let onChooseUpgrade: () => void;
    let text: string;
    let subText: string[] = [];
    let draw: StaticDraw;

    switch (Number(type)) {
      case EntityType.Arrow: {
        draw = ArrowInstance.staticDraw;
        const weaponStats = stats[EntityType.Arrow];
        if (level === 1) {
          subText = [
            `Damage: ${weaponStats.Damage[level - 1]}`,
            `Firing Rate: ${weaponStats['Firing Rate'][level - 1]}`
          ];
          onChooseUpgrade = () => new Arrow();
        } else if (existing) {
          onChooseUpgrade = () => existing.upgrade();
        }
        text = `Arrow`;
        subText = getSubtextForStats(type, level);
        break;
      }
      case EntityType.Axe: {
        draw = AxeInstance.staticDraw;
        if (level === 1) {
          onChooseUpgrade = () => new Axe();
        } else if (existing) {
          onChooseUpgrade = () => existing.upgrade();
        }
        text = `Axe`;
        subText = getSubtextForStats(type, level);
        break;
      }
      case EntityType.Orb: {
        draw = OrbInstance.staticDraw;
        if (level === 1) {
          onChooseUpgrade = () => new Orb();
        } else if (existing) {
          onChooseUpgrade = () => existing.upgrade();
        }
        text = `Orb`;
        subText = getSubtextForStats(type, level);
        break;
      }
      case EntityType.MagicCircle: {
        draw = MagicCircleInstance.staticDraw;
        if (level === 1) {
          onChooseUpgrade = () => new MagicCircle();
        } else if (existing) {
          onChooseUpgrade = () => existing.upgrade();
        }
        text = `Summoning Circle`;
        subText = getSubtextForStats(type, level);
        break;
      }
      default:
        throw new Error();
    }
    return {
      type,
      level,
      text,
      subText,
      draw,
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
