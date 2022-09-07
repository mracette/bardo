import { distance } from './distance';
import { magnitude } from './magnitude';

export class Vector2 {
  constructor(public x: number, public y: number) {}

  get ratio(): number {
    return this.x / this.y;
  }

  get magnitude(): number {
    return magnitude(this.x, this.y);
  }

  add(x: number, y: number): Vector2;
  add(vector: Vector2): Vector2;
  add(xOrVector: number | Vector2, y?: number): Vector2 {
    if (typeof xOrVector === 'number') {
      this.x += xOrVector;
      if (typeof y === 'number') {
        this.y += y;
      }
    } else {
      this.x += xOrVector.x;
      this.y += xOrVector.y;
    }
    return this;
  }

  /**
   * Computes the angle in radians with respect to the positive x-axis
   */
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }

  clone() {
    return new Vector2(this.x, this.y);
  }

  distanceTo(vector: Vector2) {
    return distance(this.x, this.y, vector.x, vector.y);
  }

  equals(vector: Vector2) {
    return this.x === vector.x && this.y === vector.y;
  }

  multiply(scalar: number) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  normalize() {
    const magnitude = this.magnitude;
    if (magnitude !== 0) {
      this.x /= magnitude;
      this.y /= magnitude;
    }
    return this;
  }

  set(vector: Vector2) {
    this.x = vector.x;
    this.y = vector.y;
    return this;
  }

  static from(a: Vector2, b: Vector2) {
    return new Vector2(a.x - b.x, a.y - b.y);
  }
}
