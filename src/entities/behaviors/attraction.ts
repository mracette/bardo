import { Vector2 } from '../../crco';
import { player } from '../../globals/player';

export interface Attraction {
  amount: number;
}

export const addAttraction = (position: Vector2, amount: number) => {
  const vector = Vector2.from(player.position, position).normalize().multiply(amount);
  position.x += vector.x;
  position.y += vector.y;
};
