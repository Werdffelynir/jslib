
/**
 * Create special object to indicate a rectangle
 * @param x
 * @param y
 * @param width
 * @param height
 * @returns {[*,*,*,*]}
 */
export function Rectangle (x?: number = 0, y?: number = 0, width?: number = 100, height?: number = 100) {
  const rect: Array = [x, y, width, height];
  rect['x'] = x;
  rect['y'] = y;
  rect['width'] = width;
  rect['height'] = height;
  return rect;
}
