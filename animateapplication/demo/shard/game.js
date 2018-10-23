
class Game {

  constructor (exts) {
    this.extension = {};

    exts.map((ext) => {
      ext.init(this);
      this.extension[ext.name] = ext;
    });
  }

  getExtension (name) {
    return this.extension[name]
  }

}


