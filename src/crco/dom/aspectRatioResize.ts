import { DPR } from '../js/constants';
import { Vector2 } from '../math/Vector2';

export type AspectRatio = Vector2;

export const aspectRatioResize = (
  element: HTMLElement,
  aspect: AspectRatio
): ResizeObserver | null => {
  const parent = element.parentElement!;
  const { x, y } = aspect;
  const resizeToAspectRatio = () => {
    const { width, height } = parent.getBoundingClientRect();
    const resizeRatio = Math.min(width / x, height / y);
    const currentWidth = element.clientWidth;
    const currentHeight = element.clientHeight;
    const newWidth = Math.round(resizeRatio * x);
    const newHeight = Math.round(resizeRatio * y);
    // do not resize if the new size is the same as the current size
    // as it has side effects for canvas elements
    if (newWidth !== currentWidth || newHeight !== currentHeight) {
      if (element instanceof HTMLCanvasElement) {
        element.width = newWidth * DPR;
        element.height = newHeight * DPR;
      }
      element.style.width = newWidth + 'px';
      element.style.height = newHeight + 'px';
    }
  };
  const observer = new ResizeObserver(resizeToAspectRatio);
  observer.observe(parent);
  return observer;
};
