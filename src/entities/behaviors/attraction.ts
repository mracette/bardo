import { Vector2 } from 'crco-utils';
import { player } from '../../globals/player';

export interface Attraction {
  amount: number;
}

export const addAttraction = (position: Vector2, delta: number, behavior: Attraction) => {
  const vector = Vector2.from(player.position, position)
    .normalize()
    .multiply(delta * behavior.amount);
  position.x += vector.x;
  position.y += vector.y;
};
