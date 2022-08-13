import { Vector2 } from 'crco-utils';
import { player } from '../../globals/player';
export interface Attraction {
  attraction: number;
}

export const addAttraction = (
  position: Vector2,
  movement: number,
  attraction: Attraction['attraction']
) => {
  const vector = Vector2.from(player.position, position)
    .normalize()
    .multiply(movement * attraction);
  position.x += vector.x;
  position.y += vector.y;
};
