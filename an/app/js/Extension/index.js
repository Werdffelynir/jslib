/**
 * Getter|Setter
 * Storage for static modules
 *
 * @param name    String
 * @param func    Function | Object
 * @constructor
 */
export class ExtensionsState {

  static instance: ExtensionsState;
  private extensions: Array<Function> = [];

  constructor() {
    if (!ExtensionsState.instance) {
      ExtensionsState.instance = this;
    }
    return ExtensionsState.instance;
  }

  push(func: Function) {
    this.extensions.push(func);
  }

  pull() {
    return this.extensions;
  }

}

export function Extension (func: Function) {
  (new ExtensionsState()).push(func);
}