import { Vector2 } from 'crco-utils';
import { PLAYER } from '../..';
export interface Attraction {
  attraction: number;
}

export const addAttraction = (
  position: Vector2,
  movement: number,
  attraction: Attraction['attraction']
) => {
  const vector = Vector2.from(PLAYER.position, position);
  const unit = vector.toUnitVector();
  position.x += unit.x * movement * attraction;
  position.y += unit.y * movement * attraction;
};
