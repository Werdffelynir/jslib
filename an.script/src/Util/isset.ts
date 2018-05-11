/**
 * Проверяет наличие значения
 * @param value         проверяемое значение
 * @param defaultValue  значение поумолчанию
 * @returns {boolean}
 */
export function isset (value: any, defaultValue?: any) {
  const is = value !== undefined;
  return (defaultValue === undefined) ? is : ( is ? is : defaultValue);
}