/**
 * Calculate distance between two Points
 * @param p1
 * @param p2
 * @returns {number}
 */
export function distanceBetween (p1, p2) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
};