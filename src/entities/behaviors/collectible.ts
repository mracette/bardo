import { clamp, Vector2 } from '../../crco';
import { player } from '../../globals/player';

const ACCELERATION = 0.0015;
const INITIAL_VELOCITY = -0.25;
const MAX_ACCELERATION = 1;

export interface Collectible {
  start?: number;
  distance: number;
  initialPosition: Vector2;
  onCollected: (index: number) => void;
}

export const addCollectible = (
  position: Vector2,
  elapsed: number,
  behavior: Collectible,
  index: number
) => {
  const vector = Vector2.from(player.position, position);
  // kick off the sequence
  if (!behavior.start && vector.magnitude < behavior.distance) {
    behavior.start = elapsed;
    return;
  }
  // end the sequence
  if (behavior.start && vector.magnitude < 1) {
    behavior.onCollected(index);
    return;
  }
  if (behavior.start) {
    // progress the sequence
    const delta = elapsed - behavior.start;
    vector.normalize();
    const velocity = vector
      .clone()
      .multiply(
        clamp(
          INITIAL_VELOCITY + delta * ACCELERATION,
          -MAX_ACCELERATION,
          MAX_ACCELERATION
        )
      );
    position.x += velocity.x;
    position.y += velocity.y;
  }
};
