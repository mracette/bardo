import { isSomeUndefined } from '../js/isSomeUndefined';
import { isUndefined } from '../js/isUndefined';
import { lerp } from '../math/lerp';
import { normalize } from '../math/normalize';

enum YAxisOrientation {
  Up = 'up',
  Down = 'down'
}

export interface CanvasCoordinates {
  canvas: HTMLCanvasElement;
  nxRange: [number, number];
  nyRange: [number, number];
  clamp: boolean;
  yAxisOrientation: YAxisOrientation;
  baseWidth?: number;
  baseHeight?: number;
  padding?: number;
  paddingX?: number;
  paddingY?: number;
  offsetX?: number;
  offsetY?: number;
  equalPadding?: boolean;
}

type CanvasCoordinatesOptions = Partial<CanvasCoordinates>;

export class CanvasCoordinates {
  constructor(opts: CanvasCoordinatesOptions = {}) {
    if (isUndefined(opts.canvas) && isSomeUndefined(opts.baseWidth, opts.baseHeight)) {
      throw new Error(
        'Invalid options. A canvas element must be supplied if baseHeight or baseWidth are not defined.'
      );
    }

    const defaults = {
      nxRange: [-1, 1],
      nyRange: [-1, 1],
      clamp: false,
      orientationY: 'down',
      equalPadding: false
    };

    Object.assign(this, { ...defaults, ...opts });
  }

  private getBaseWidth(): number {
    return this.baseWidth ?? this.canvas.width;
  }

  private getBaseWidthMinusPadding(): number {
    return this.getBaseWidth() - this.getPaddingXCanvasUnits() * 2;
  }

  private getBaseHeight(): number {
    return this.baseHeight ?? this.canvas.height;
  }

  private getBaseHeightMinusPadding(): number {
    return this.getBaseHeight() - this.getPaddingYCanvasUnits() * 2;
  }

  private getPaddingX(): number {
    return this.paddingX ?? this.padding ?? 0;
  }

  private getPaddingXCanvasUnits(): number {
    return this.getPaddingX() * this.getBaseWidth();
  }

  private getPaddingY(): number {
    if (!isUndefined(this.paddingY)) {
      return this.paddingY;
    }
    if (!isUndefined(this.padding)) {
      if (this.equalPadding) {
        return this.padding * (this.getBaseWidth() / this.getBaseHeight());
      }
      return this.padding;
    }
    return 0;
  }

  private getPaddingYCanvasUnits(): number {
    return this.getPaddingY() * this.getBaseHeight();
  }

  private getOffsetX(): number {
    return this.offsetX ?? 0;
  }

  private getOffsetY(): number {
    return this.offsetY ?? 0;
  }

  /**
   * Maps a normalized value n to a x-coordinate on the canvas.
   */
  public nx(n: number): number {
    const nAdjusted = normalize(n, this.nxRange[0], this.nxRange[1], this.clamp);
    return (
      this.getPaddingXCanvasUnits() +
      this.getOffsetX() +
      nAdjusted * this.getBaseWidthMinusPadding()
    );
  }

  /**
   * Maps a normalized value n to a y-coordinate on the canvas.
   */
  public ny(n: number): number {
    const nAdjusted = normalize(n, this.nyRange[0], this.nyRange[1], this.clamp);
    const inverse = this.yAxisOrientation === YAxisOrientation.Up ? true : false;
    return (
      this.getPaddingYCanvasUnits() +
      this.getOffsetY() +
      (inverse ? 1 - nAdjusted : nAdjusted) * this.getBaseHeightMinusPadding()
    );
  }

  /**
   * Maps a canvas x-value to a normalized value n
   */
  public xn(x: number): number {
    const xAdjusted = normalize(
      x,
      this.getPaddingXCanvasUnits(),
      this.getPaddingXCanvasUnits() + this.width(),
      this.clamp
    );
    return lerp(xAdjusted, this.nxRange[0], this.nxRange[1]);
  }

  /**
   * Maps a canvas y-value to a normalized y-value.
   */
  public yn(y: number): number {
    const yAdjusted = normalize(
      y,
      this.getPaddingYCanvasUnits(),
      this.getPaddingYCanvasUnits() + this.height(),
      this.clamp
    );
    return lerp(yAdjusted, this.nxRange[0], this.nxRange[1]);
  }

  /**
   * Returns the width of the coordinate system, in canvas units, with an optional multiplier.
   * @param n - An optional multiplier
   * @returns The width of the coordinate system, in canvas units, multiplied by n
   */
  width(n?: number): number {
    return this.getBaseWidthMinusPadding() * (n ?? 1);
  }

  /**
   * Returns the height of the coordinate system, in canvas units, with an optional multiplier.
   * @param n - An optional multiplier
   * @returns The height of the coordinate system, in canvas units, multiplied by n
   */
  height(n?: number): number {
    return this.getBaseHeightMinusPadding() * (n ?? 1);
  }

  /**
   * Converts a width in canvas coordinates to a normal value
   * @param width - A width value in canvas units
   * @returns The equivalent width in normal units
   */
  nWidth(width?: number): number {
    return this.xn(width ?? this.width()) - this.xn(0);
  }

  /**
   * Converts a height in canvas coordinates to a normal value
   * @param height - A height value in canvas units
   * @returns The equivalent height in normal units
   */
  nHeight(height?: number): number {
    return this.yn(height ?? this.height()) - this.yn(0);
  }
}
