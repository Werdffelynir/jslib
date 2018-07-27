import {typeOf} from './typeOf';


/**
 * Clone an Array, Object, Function
 * @param src
 * @param args
 */
export function clone (src: any, args?: Object) {
  if (typeOf(src, 'function')) {
    return src.bind({}, args);

  } else if (typeOf(args, 'object') || typeOf(args, 'array')) {
    const c: Object = JSON.parse(JSON.stringify(src));

    for (let i in args) {
      c[i] = args[i];
    }

    return c;
  }
}