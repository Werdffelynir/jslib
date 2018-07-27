import {random} from './random';


/**
 * Return random item from array
 * @param arr
 * @returns {*}
 */
export function randomItem (arr: Array) {
  const i = random() (0, arr.length-1);
  return arr[i];
}