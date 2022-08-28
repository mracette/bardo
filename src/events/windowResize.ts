import { canvasElements } from '../globals/dom';

export const handleWindowResize = () => {
  const rect = canvasElements.map.getBoundingClientRect();
  canvasElements.ui.style.height = String(rect.height * 0.05);
  canvasElements.ui.style.left = String(rect.left);
  canvasElements.ui.style.top = String(rect.top - canvasElements.ui.clientHeight);
  canvasElements.ui.style.width = String(rect.width);
};
