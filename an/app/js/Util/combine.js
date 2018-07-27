/**
 * Marge objects
 * @param defaultObject
 * @param object
 * @returns {*}
 */
export function combine (defaultObject: Object, object: Object) {
  for (let key: string in object) {
    defaultObject[key] = object[key]
  }
  return defaultObject
}