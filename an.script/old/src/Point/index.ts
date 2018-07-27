/**
 * Create special object to indicate a point
 * @param x
 * @param y
 * @returns {{x: *, y: *}}
 */
export function Point (x?: number = 0, y?: number = 0) {
  const point: Array = [x, y];
  point['x'] = x;
  point['y'] = y;
  return point;
}
