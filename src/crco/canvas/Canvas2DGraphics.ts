import { polygon } from '../geometry/polygon';
import { star } from '../geometry/star';
import { DPR } from '../js/constants';
import { isUndefined } from '../js/isUndefined';
import { clamp } from '../math/clamp';
import { TAU } from '../math/constants';
import { lerp } from '../math/lerp';
import { magnitude } from '../math/magnitude';
import { random } from '../math/random';
import { Vector2 } from '../math/Vector2';
import { CanvasCoordinates } from './CanvasCoordinates';

export enum CanvasDimensions {
  Width = 'width',
  Height = 'height'
}

type ReactiveStyleFunction<T> = (coords: CanvasCoordinates) => T;

type ValueOrReactiveStyleFunction<T> = T | ReactiveStyleFunction<T>;

type RotationWithOrigin = { rotation: number; origin: Vector2 };

type ScaleWithOrigin = {
  scale: Vector2;
  origin: Vector2;
  constantLineWidth?: boolean;
};

export type Canvas2DStyleValues = {
  /**
   * Directly from the CanvasRenderingCntext2D API
   */
  fillStyle: CanvasRenderingContext2D['fillStyle'];
  lineWidth: CanvasRenderingContext2D['lineWidth'];
  lineCap: CanvasRenderingContext2D['lineCap'];
  lineJoin: CanvasRenderingContext2D['lineJoin'];
  lineDashOffset: CanvasRenderingContext2D['lineDashOffset'];
  miterLimit: CanvasRenderingContext2D['miterLimit'];
  strokeStyle: CanvasRenderingContext2D['strokeStyle'];
  textAlign: CanvasRenderingContext2D['textAlign'];
  textBaseline: CanvasRenderingContext2D['textBaseline'];
  /**
   * Custom to this library
   */
  transform: DOMMatrixInit;
  scale: Vector2 | ScaleWithOrigin;
  rotation: number | RotationWithOrigin;
  translation: Vector2;
  /**
   * Font size in pixels
   */
  fontSize: number;
  lineDash: number[];
  alpha: number;
  lineWidthIsProportionalTo: CanvasDimensions;
  /**
   * Directly from the CSSStyleDeclaration
   */
  fontFamily: CSSStyleDeclaration['fontFamily'];
  fontStyle: CSSStyleDeclaration['fontStyle'];
  fontWeight: CSSStyleDeclaration['fontWeight'];
  fontStretch: CSSStyleDeclaration['fontStretch'];
  fontVariant: CSSStyleDeclaration['fontVariant'];
  lineHeight: CSSStyleDeclaration['lineHeight'];
};

export type Canvas2DStyles = Partial<{
  [Property in keyof Canvas2DStyleValues]: ValueOrReactiveStyleFunction<
    Canvas2DStyleValues[Property]
  >;
}>;

export interface DrawingOptions {
  /** @defaultValue true */
  beginPath?: boolean;
  /** @defaultValue false */
  closePath?: boolean;
  /** @defaultValue false */
  closeLoop?: boolean;
  /** @defaultValue false */
  fill?: boolean;
  /** @defaultValue -1 */
  maxTextWidth?: number;
  /** @defaultValue true */
  saveAndRestore?: boolean;
  /** @defaultValue false */
  stroke?: boolean;
  /** @defaultValue \{\} */
  styles?: Canvas2DStyles;
  /** @defaultValue false */
  useNormalCoordinates?: boolean;
  /** @defaultValue 0 */
  roughness?: number;
  /** @defaultValue false */
  scalarNormalization?: 'width' | 'height' | false;
  /** @defaultValue false */
  skipApplyStyles?: boolean;
  /** @defaultValue Math.random */
  random?: () => number;
}

export interface InitializationOptions {
  coords?: CanvasCoordinates;
}

export interface Canvas2DGraphicsOptions extends DrawingOptions, InitializationOptions {}

export interface Canvas2DGraphics {
  context: CanvasRenderingContext2D;
  coords: CanvasCoordinates;
  options: Omit<DrawingOptions, 'coords'>;
}

export class Canvas2DGraphics {
  constructor(
    context: CanvasRenderingContext2D,
    /**
     * @defaultValue options.beginPath = true
     */
    options: Canvas2DGraphicsOptions = {}
  ) {
    this.context = context;
    this.coords = options.coords ?? new CanvasCoordinates({ canvas: context.canvas });

    const defaultStyles: Canvas2DStyles = {
      fontFamily: 'sans-serif',
      fontSize: 16,
      textAlign: 'center',
      textBaseline: 'middle'
    };

    const defaults: DrawingOptions = {
      beginPath: true,
      closePath: false,
      fill: false,
      maxTextWidth: -1,
      saveAndRestore: true,
      stroke: false,
      useNormalCoordinates: false,
      scalarNormalization: false,
      skipApplyStyles: false,
      roughness: 0,
      closeLoop: false,
      random: Math.random
    };

    this.options = { ...defaults, ...options };
    this.options.styles = {
      ...defaultStyles,
      ...options.styles
    };
  }

  public rect(x = 0, y = 0, width = 1, height = 1, options: DrawingOptions = {}) {
    const roughness = this.resolveOptions('roughness', options);
    if (roughness) {
      this.rectRough(x, y, width, height, options);
    } else {
      this.rectSmooth(x, y, width, height, options);
    }
  }

  private rectRough(
    x: number,
    y: number,
    width: number,
    height: number,
    options: DrawingOptions
  ) {
    const xAdj = this.resolveX(x);
    const yAdj = this.resolveY(y);
    const widthAdj = this.resolveWidth(width);
    const heightAdj = this.resolveHeight(height);
    const points = [
      [xAdj, yAdj],
      [xAdj + widthAdj, yAdj],
      [xAdj + widthAdj, yAdj + heightAdj],
      [xAdj, yAdj + heightAdj],
      [xAdj, yAdj]
    ];
    this.lineSegments(points, {
      ...options,
      useNormalCoordinates: false, // signal that normalization is complete
      saveAndRestore: true,
      closeLoop: true
    });
  }

  private rectSmooth(
    x: number,
    y: number,
    width: number,
    height: number,
    options: DrawingOptions
  ): void {
    this.preDrawOps(options);
    this.context.rect(
      this.resolveX(x, options),
      this.resolveY(y, options),
      this.resolveWidth(width),
      this.resolveHeight(height)
    );
    this.postDrawOps(options);
  }

  public lineSegments(points: number[][], options: DrawingOptions = {}) {
    const roughness = this.resolveOptions('roughness', options);
    if (roughness) {
      this.lineSegmentsRough(points, options);
    } else {
      this.lineSegmentsSmooth(points, options);
    }
  }

  private lineSegmentsSmooth(points: number[][], options: DrawingOptions): void {
    this.preDrawOps(options);
    for (let i = 0; i < points.length; i++) {
      const x = this.resolveX(points[i][0], options);
      const y = this.resolveY(points[i][1], options);
      if (i === 0) {
        this.context.moveTo(x, y);
      } else {
        this.context.lineTo(x, y);
      }
    }
    this.postDrawOps(options);
  }

  private lineSegmentsRough(points: number[][], options: DrawingOptions) {
    const roughness = this.resolveOptions('roughness', options);
    const random = this.resolveOptions('random', options);
    const numSegments = points.length - 1;
    // two outlines for each set of points
    for (let j = 0; j < 2; j++) {
      const roughPoints = [];
      for (let i = 0; i < numSegments; i++) {
        const [x0, y0] = points[i];
        const [x1, y1] = points[i + 1];

        const rasterSize = magnitude(
          this.coords.nx(x0) - this.coords.nx(x1),
          this.coords.ny(y0) - this.coords.ny(y1)
        );
        const normalSize = magnitude(x0 - x1, y0 - y1);

        // The adjusted value needs to be normalized, but also decrease as a function of the rasterSize
        const roughnessAdj = clamp(
          normalSize * roughness - rasterSize * normalSize * 0.00004,
          roughness * normalSize * 0.1,
          roughness * normalSize * 0.25
        );

        // four rough points for each rough line
        for (let k = 0; k < 4; k++) {
          const randomRadius = random() * roughnessAdj;
          const randomRotation = random() * TAU;
          const randomX = randomRadius * Math.cos(randomRotation);
          const randomY = randomRadius * Math.sin(randomRotation);
          let x = NaN;
          let y = NaN;
          if (k === 0) {
            x = x0 + randomX;
            y = y0 + randomY;
          }
          if (k === 1) {
            const distance = 0.5;
            x = lerp(distance, x0, x1) + randomX;
            y = lerp(distance, y0, y1) + randomY;
          }
          if (k === 2) {
            const distance = 0.75;
            x = lerp(distance, x0, x1) + randomX;
            y = lerp(distance, y0, y1) + randomY;
          }
          if (k === 3) {
            if (options.closeLoop && i === numSegments - 1) {
              x = roughPoints[0][0];
              y = roughPoints[0][1];
            } else {
              x = x1 + randomX;
              y = y1 + randomY;
            }
          }
          roughPoints.push([x, y]);
        }
      }
      // only allow fills on the first outline
      const optionsAdjusted: DrawingOptions =
        j === 0 ? options : { ...options, fill: false };
      this.curveThroughPoints(roughPoints, optionsAdjusted);
    }
  }

  /**
   * @see {@link https://stackoverflow.com/a/7058606/3064334}
   */
  public curveThroughPoints(points: number[][], options: DrawingOptions = {}): void {
    this.preDrawOps(options);
    for (let i = 0; i < points.length - 1; i++) {
      const x = this.resolveX(points[i][0], options);
      const y = this.resolveY(points[i][1], options);
      if (i === 0) {
        this.context.moveTo(x, y);
      } else {
        const x1 = this.resolveX(points[i + 1][0], options);
        const y1 = this.resolveY(points[i + 1][1], options);
        if (x1 === x && y1 === y) {
          this.context.lineTo(x1, y1);
        } else {
          const cx = (x + x1) / 2;
          const cy = (y + y1) / 2;
          this.context.quadraticCurveTo(x, y, cx, cy);
        }
      }
    }
    points.slice(-1).forEach((point) => {
      this.context.lineTo(
        this.resolveX(point[0], options),
        this.resolveY(point[1], options)
      );
    });
    this.postDrawOps(options);
  }

  public arc(
    cx: number,
    cy: number,
    r: number,
    startAngle: number,
    endAngle: number,
    options: DrawingOptions = {}
  ) {
    this.preDrawOps(options);
    this.context.arc(
      this.resolveX(cx),
      this.resolveY(cy),
      this.resolveScalar(r),
      startAngle,
      endAngle
    );
    this.postDrawOps(options);
  }

  public circle(cx: number, cy: number, r: number, options: DrawingOptions = {}) {
    const roughness = this.resolveOptions('roughness', options);
    if (roughness) {
      this.circleRough(cx, cy, r, options);
    } else {
      this.circleSmooth(cx, cy, r, options);
    }
  }

  /**
   * @defaultValue options.beginPath = true
   * @defaultValue options.saveAndRestore = true
   * @defaultValue options.fill = true
   */
  private circleSmooth(cx: number, cy: number, r: number, options: DrawingOptions): void {
    this.preDrawOps(options);
    this.context.arc(
      this.resolveX(cx, options),
      this.resolveY(cy, options),
      this.resolveScalar(r, options),
      0,
      TAU
    );
    this.postDrawOps(options);
  }

  private circleRough(cx: number, cy: number, r: number, options: DrawingOptions) {
    const roughness = this.resolveOptions('roughness', options);
    const random = this.resolveOptions('random', options);
    const segmentCount = 16;

    const rasterRadius = this.resolveScalar(r, options);
    const roughnessAdj = clamp(
      500 * r * roughness - rasterRadius * r * 0.05,
      roughness * rasterRadius * 0.5,
      roughness * rasterRadius * 0.75
    );

    for (let n = 0; n < 2; n++) {
      const points = [];
      for (let i = 0; i < segmentCount; i++) {
        const randomRadius = random() * roughnessAdj;
        const randomRotation = random() * TAU;
        const randomX = randomRadius * Math.cos(randomRotation);
        const randomY = randomRadius * Math.sin(randomRotation);
        const angle = (TAU * i) / segmentCount;
        const x0 = randomX + this.resolveX(cx, options) + Math.cos(angle) * rasterRadius;
        const y0 = randomY + this.resolveY(cy, options) + Math.sin(angle) * rasterRadius;
        points.push([x0, y0]);
      }
      points[segmentCount] = points[0];
      points[segmentCount + 1] = points[1];
      this.curveThroughPoints(points, {
        ...options,
        useNormalCoordinates: false, // signal that normalization is complete
        saveAndRestore: true,
        closeLoop: true // ensures shape can be filled
      });
    }
  }

  public drawImage(
    image: CanvasImageSource,
    x: number,
    y: number,
    options: DrawingOptions = {}
  ): void {
    this.preDrawOps(options);
    this.context.drawImage(image, this.resolveX(x, options), this.resolveY(y, options));
    this.postDrawOps(options);
  }

  public star(
    cx: number,
    cy: number,
    size: number,
    numPoints?: number,
    inset?: number,
    options: DrawingOptions = {}
  ) {
    this.lineSegments(
      star(
        this.resolveX(cx, options),
        this.resolveY(cy, options),
        this.resolveScalar(size, options),
        numPoints,
        inset
      ),
      {
        ...options,
        useNormalCoordinates: false,
        saveAndRestore: true
      }
    );
  }

  public polygon(
    cx: number,
    cy: number,
    size: number,
    numPoints?: number,
    options: DrawingOptions = {}
  ) {
    const roughness = this.resolveOptions('roughness', options);
    this.lineSegments(
      polygon(
        this.resolveX(cx, options),
        this.resolveY(cy, options),
        this.resolveScalar(size, options),
        numPoints
      ),
      {
        ...options,
        useNormalCoordinates: false, // signal that normalization is complete
        saveAndRestore: true,
        closeLoop: Boolean(roughness)
      }
    );
  }

  public applyStyles(styles?: Canvas2DStyles): void {
    // not sure about this...
    // this.assignStylesToContext(this.options.styles!);
    // if (styles) {
    //   this.assignStylesToContext(styles);
    // }
    this.assignStylesToContext({ ...this.options.styles, ...styles });
  }

  public text(text: string, cx: number, cy: number, options: DrawingOptions = {}) {
    const roughness = this.resolveOptions('roughness', options);
    if (roughness) {
      this.textRough(text, cx, cy, options);
    } else {
      this.textSmooth(text, cx, cy, options);
    }
  }

  private textSmooth(
    text: string,
    cx: number,
    cy: number,
    options: DrawingOptions = {}
  ): void {
    this.preDrawOps(options);
    const maxWidth = this.resolveOptions('maxTextWidth', options);
    this.context.fillText(
      text,
      this.resolveX(cx, options),
      this.resolveY(cy, options),
      maxWidth > 0 ? maxWidth : undefined
    );
    this.postDrawOps(options);
  }

  private textRough(text: string, cx: number, cy: number, options: DrawingOptions = {}) {
    const roughness = this.resolveOptions('roughness', options);
    const resolvedRandom = this.resolveOptions('random', options);

    const {
      actualBoundingBoxAscent: top,
      actualBoundingBoxDescent: bottom,
      width
    } = this.measureTextInContext(text, options.styles);

    const wordWidthNormal = this.coords.nWidth(width);
    const wordHeight = top - bottom;
    const wordHeightNormal = this.coords.nHeight(wordHeight);
    const letters = text.split('');

    const resolvedTextAlign = this.resolveStyles('textAlign');
    const resolvedTextBaseline = this.resolveStyles('textBaseline');

    let accumulatedWidth = 0;

    letters.forEach((letter, i) => {
      let letterX;
      let letterCx;
      const metrics = this.measureTextInContext(letter, {
        ...options.styles
      });
      const letterWidthNormal = this.coords.nWidth(metrics.width);
      if (resolvedTextAlign === 'left') {
        letterX = cx + accumulatedWidth;
        letterCx = letterX + letterWidthNormal / 2;
      } else if (resolvedTextAlign === 'right') {
        letterX = -wordWidthNormal + cx + accumulatedWidth;
        letterCx = letterX - letterWidthNormal / 2;
      } else if (resolvedTextAlign === 'center') {
        letterX = -wordWidthNormal / 2 + cx + accumulatedWidth;
        letterCx = letterX;
      } else {
        throw new Error(
          "textAlign must be 'left', 'right', or 'center' to use rough text"
        );
      }

      accumulatedWidth += letterWidthNormal * 1.1;

      const letterY = cy;
      let letterCy;
      if (resolvedTextBaseline === 'top') {
        letterCy = letterY - wordHeightNormal / 2;
      } else if (resolvedTextBaseline === 'bottom') {
        letterCy = letterY - wordHeightNormal / 2;
      } else if (resolvedTextBaseline === 'middle') {
        letterCy = letterY;
      } else {
        throw new Error(
          "textBaseline must be 'top', 'bottom', or 'middle' to use rough text"
        );
      }

      const rx = [
        random(Math.min(0.4, roughness / 20), 0, resolvedRandom),
        random(Math.min(0.4, roughness / 20), 0, resolvedRandom)
      ];
      const ry = [
        random(Math.min(0.4, roughness / 20), 0, resolvedRandom),
        random(Math.min(0.4, roughness / 20), 0, resolvedRandom)
      ];

      this.textSmooth(letter, letterX + rx[0], letterY + ry[0], {
        ...options,
        styles: {
          ...options.styles,
          rotation: {
            origin: new Vector2(letterCx, letterCy),
            rotation: (roughness! * Math.PI) / 16
          }
        },
        saveAndRestore: true
      });
      this.textSmooth(letter, letterX + rx[1], letterY + ry[1], {
        ...options,
        styles: {
          ...options.styles,
          rotation: {
            origin: new Vector2(letterCx, letterCy),
            rotation: (-roughness! * Math.PI) / 16
          }
        },
        saveAndRestore: true
      });
    });
  }

  public clear(): void {
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
  }

  /**
   * An alternative to context.clearRect() that can be run at the beginning of a draw loop.
   * This form has two advantages over clearRect:
   *
   * 1. For clearRect you need to either have an untransformed context, or keep track of your actual boundaries.
   *    Otherwise you may not be able to clear the entire canvas on each frame.
   *
   * 2. clearRect does not clear the state stack that is used by the canvas context when methods like save() and restore() are called.
   *    If these functions are being called anywhere in a render loop, some browsers (Firefox) will continue to add to the state stack
   *    leading to deteriorating performance over time. In this case, it is much better to use this function to clear the canvas for
   *    each frame.
   *
   * TODO: more investigation is needed. Why is this necessary on Firefox? Is it the save/restore stack or is this issue only present
   * when beginPath() is not called properly before each path? Or is there another reason?
   *
   */
  public clearCanvasAndState(
    canvas: HTMLCanvasElement,
    options: { dpr?: boolean } = {}
  ): void {
    canvas.width = canvas.clientWidth * (options.dpr ? DPR : 1);
    canvas.height = canvas.clientHeight * (options.dpr ? DPR : 1);
  }

  protected resolveX(value: number, options: DrawingOptions = {}) {
    const useNormalCoordinates = this.resolveOptions('useNormalCoordinates', options);
    return useNormalCoordinates ? this.coords.nx(value) : value;
  }

  protected resolveY(value: number, options: DrawingOptions = {}) {
    const useNormalCoordinates = this.resolveOptions('useNormalCoordinates', options);
    return useNormalCoordinates ? this.coords.ny(value) : value;
  }

  protected resolveWidth(value: number) {
    return this.coords.width(value);
  }

  protected resolveHeight(value: number) {
    return this.coords.height(value);
  }

  protected resolveScalar(value: number, options: DrawingOptions = {}) {
    const scalarNormalization = this.resolveOptions('scalarNormalization', options);
    if (scalarNormalization === 'width') {
      return this.coords.width(value);
    }
    if (scalarNormalization === 'height') {
      return this.coords.height(value);
    }
    return value;
  }

  protected resolveOptions<T extends keyof DrawingOptions>(
    param: T,
    options: DrawingOptions
  ): NonNullable<DrawingOptions[T]> {
    const resolved = options && param in options ? options[param] : this.options[param];
    // eslint-disable-next-line no-console
    console.assert(
      resolved != undefined,
      `A value for ${resolved} could not be resolved.`
    );
    if (param === 'roughness') {
      return clamp(resolved as number, 0, 1) as NonNullable<DrawingOptions[T]>;
    }
    return resolved as NonNullable<DrawingOptions[T]>;
  }

  protected resolveStyles<T extends keyof Canvas2DStyles>(
    param: T,
    styles?: Canvas2DStyles
  ): Canvas2DStyleValues[T] {
    const resolved =
      styles && param in styles ? styles[param] : this.options.styles![param];
    if (typeof resolved === 'function') {
      return resolved(this.coords) as Canvas2DStyleValues[T];
    } else {
      return resolved as Canvas2DStyleValues[T];
    }
  }

  /**
   * Creates a CSS style string for 'font' using a combination of related fields.
   *
   * Constructing the font string this way allows individual components of the
   * font style to be changed without needing to keep track of the entire font
   * string
   */
  protected constructFontString(styles: Canvas2DStyles): CSSStyleDeclaration['font'] {
    const fontSize = this.resolveStyles('fontSize', styles);
    const lineHeight = this.resolveStyles('lineHeight', styles);
    const fontStyle = this.resolveStyles('fontStyle', styles);
    const fontFamily = this.resolveStyles('fontFamily', styles);
    const fontWeight = this.resolveStyles('fontWeight', styles);
    const fontStretch = this.resolveStyles('fontStretch', styles);
    let fontSizePx = typeof fontSize === 'number' ? `${fontSize}px` : undefined;

    if (lineHeight && fontSizePx) {
      fontSizePx = `${fontSize} / ${lineHeight}}`;
    }

    const fontString = [fontSizePx, fontFamily, fontStyle, fontWeight, fontStretch]
      .join(' ')
      .trim();

    return fontString;
  }

  protected assignStylesToContext(styles: Canvas2DStyles) {
    for (const key in styles) {
      const resolvedStyle = this.resolveStyles(key as keyof Canvas2DStyles, styles);
      if (isUndefined(resolvedStyle)) {
        continue;
      }
      if (key === 'transform') {
        this.context.setTransform(resolvedStyle as Canvas2DStyleValues['transform']);
      }
      if (key === 'translation') {
        const { x, y } = resolvedStyle as Canvas2DStyleValues['translation'];
        this.context.translate(this.resolveX(x), this.resolveY(y));
      }
      if (key === 'rotation') {
        if (typeof resolvedStyle === 'number') {
          this.context.rotate(resolvedStyle);
        } else {
          const { rotation, origin } = resolvedStyle as RotationWithOrigin;
          const translateX = this.resolveX(origin.x);
          const translateY = this.resolveY(origin.y);
          this.context.translate(translateX, translateY);
          this.context.rotate(rotation);
          this.context.translate(-translateX, -translateY);
        }
      }
      if (key === 'scale') {
        if ('origin' in (resolvedStyle as Canvas2DStyleValues['scale'])) {
          const {
            origin,
            scale,
            constantLineWidth = false
          } = resolvedStyle as ScaleWithOrigin;
          const translateX = this.resolveX(origin.x);
          const translateY = this.resolveY(origin.y);
          this.context.translate(translateX, translateY);
          this.context.scale(scale.x, scale.y);
          this.context.translate(-translateX, -translateY);
          if (constantLineWidth) {
            this.context.lineWidth =
              this.context.lineWidth * (1 / ((scale.x + scale.y) / 2));
          }
        } else {
          const { x, y } = resolvedStyle as Vector2;
          this.context.scale(x, y);
        }
      }
      if (key === 'lineDash') {
        this.context.setLineDash(resolvedStyle as Canvas2DStyleValues['lineDash']);
      }
      if (key === 'alpha') {
        this.context.globalAlpha = resolvedStyle as Canvas2DStyleValues['alpha'];
      }
      // @ts-ignore
      if (key in this.context && typeof this.context[key] !== 'function') {
        // @ts-ignore
        this.context[key] = this.resolveStyles(key, styles);
      }
    }
    this.context.font = this.constructFontString(styles);
  }

  protected preDrawOps(options: DrawingOptions = {}) {
    if (this.resolveOptions('saveAndRestore', options)) {
      this.context.save();
    }
    if (!this.resolveOptions('skipApplyStyles', options)) {
      this.applyStyles(options.styles);
    }
    if (this.resolveOptions('beginPath', options)) {
      this.context.beginPath();
    }
  }

  protected postDrawOps(options: DrawingOptions) {
    if (this.resolveOptions('closePath', options)) {
      this.context.closePath();
    }
    if (this.resolveOptions('fill', options)) {
      this.context.fill();
    }
    if (this.resolveOptions('stroke', options)) {
      this.context.stroke();
    }
    if (this.resolveOptions('saveAndRestore', options)) {
      this.context.restore();
    }
  }

  private measureTextInContext(text: string, styles?: Canvas2DStyles) {
    this.context.save();
    // apply the current styles to ensure that text measurement is accurate
    this.applyStyles(styles);
    const measurement = this.context.measureText(text);
    this.context.restore();
    return measurement;
  }
}
