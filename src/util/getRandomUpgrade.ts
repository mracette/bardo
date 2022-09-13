import { Canvas2DGraphics } from '../crco';
import { EntityType } from '../entities/entityType';
import { Arrow, ArrowInstance } from '../entities/weapons/arrow';
import { Axe, AxeInstance } from '../entities/weapons/axe';
import { MagicCircle, MagicCircleInstance } from '../entities/weapons/circle';
import { Orb, OrbInstance } from '../entities/weapons/orb';
import { Weapon } from '../entities/weapons/weapon';
import { WeaponEntityType, weaponTypeToClass } from '../entities/weapons/weaponTypes';
import { state } from '../globals/game';
import { getSubtextForStats, stats } from '../globals/stats';

type StaticDraw =
  | ((graphics: Canvas2DGraphics) => void)
  | ((graphic: Canvas2DGraphics, radius: number) => void);
export interface UpgradeOption {
  level: number;
  type: WeaponEntityType;
  text: string;
  canUpgrade: boolean;
  subText: string[];
  onChooseUpgrade: () => void;
  draw: StaticDraw;
}

export const getRandomUpgrade = (count = 3): UpgradeOption[] => {
  const allChoices: UpgradeOption[] = (
    Object.keys(weaponTypeToClass) as unknown as WeaponEntityType[]
  ).map((type) => {
    const existing = state.weapons.find((weapon) => weapon.type === Number(type));
    const level = (existing?.level ?? 0) + 1;

    let onChooseUpgrade: () => void;
    let text: string;
    let subText: string[] = [];
    let canUpgrade: boolean;
    let draw: StaticDraw;

    const handleIsExisting = (existing: Weapon<any>) => {
      if (existing.canUpgrade()) {
        onChooseUpgrade = () => existing.upgrade();
        canUpgrade = true;
      } else {
        canUpgrade = false;
      }
    };

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
          canUpgrade = true;
        } else if (existing) {
          handleIsExisting(existing);
        }
        text = `Arrow`;
        subText = getSubtextForStats(type, level);
        break;
      }
      case EntityType.Axe: {
        draw = AxeInstance.staticDraw;
        if (level === 1) {
          onChooseUpgrade = () => new Axe();
          canUpgrade = true;
        } else if (existing) {
          handleIsExisting(existing);
        }
        text = `Axe`;
        subText = getSubtextForStats(type, level);
        break;
      }
      case EntityType.Orb: {
        draw = OrbInstance.staticDraw;
        if (level === 1) {
          onChooseUpgrade = () => new Orb();
          canUpgrade = true;
        } else if (existing) {
          handleIsExisting(existing);
        }
        text = `Orb`;
        subText = getSubtextForStats(type, level);
        break;
      }
      case EntityType.MagicCircle: {
        draw = MagicCircleInstance.staticDraw;
        if (level === 1) {
          onChooseUpgrade = () => new MagicCircle();
          canUpgrade = true;
        } else if (existing) {
          handleIsExisting(existing);
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
      canUpgrade,
      // @ts-ignore
      onChooseUpgrade
    };
  });

  const filteredChoices = allChoices.filter((choice) => choice.canUpgrade);
  const numChoices = Math.min(count, filteredChoices.length);
  const choices = [];

  for (let i = 0; i < numChoices; i++) {
    const randomIndex = Math.floor(Math.random() * filteredChoices.length);
    choices.push(filteredChoices[randomIndex]);
    filteredChoices.splice(randomIndex, 1);
  }

  return choices;
};
