import { Vector2 } from '../../crco';
import { player } from '../../globals/player';

export interface Guarding {
  attraction: number;
  distance: number;
  guardPosition: Vector2;
}

export const addGuarding = (position: Vector2, delta: number, behavior: Guarding) => {
  const vector = Vector2.from(player.position, position);
  if (vector.magnitude < behavior.distance) {
    const positionDelta = vector.normalize().multiply(delta * behavior.attraction);
    position.x += positionDelta.x;
    position.y += positionDelta.y;
  } else if (position.equals(behavior.guardPosition)) {
    return;
  } else if (position.distanceTo(behavior.guardPosition) < 0.1) {
    position.set(behavior.guardPosition);
  } else {
    const positionDelta = Vector2.from(behavior.guardPosition, position)
      .normalize()
      .multiply(delta * behavior.attraction);
    position.x += positionDelta.x;
    position.y += positionDelta.y;
  }
};
