import {clone} from './Util/clone';


export class Animate {

  constructor() {
    const o: Object = {a: 0, b: 1, c: 2, e: 3};
    console.log('Animate Start', clone(o, {z: 9}));
  }

}

new Animate();