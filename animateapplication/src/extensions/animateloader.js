
class AnimateLoader {

  constructor(Animate) {
    if (!(Animate instanceof AnimateApplication)) {
      throw new Error(':constructor argument in not of instance AnimateApplication');
    }

    /**@type {CanvasRenderingContext2D}*/
    this.context = Animate._context;
    this.global = Animate.getGlobal();
  }

  /**
   *  ( { myscript1: '/path/to/myscript1', }, function (list) {})
   *  ( [ '/path/to/myscript1', ], function (list) {})
   * @param src       Object, Array. items: key is ID, value is src
   * @param callback  Function called when all srcs is loaded
   * @param onerror   Function called when load is failed
   * @returns {*}
   */
  javascript(src, callback, onerror) {
    if (src && typeof src === 'object') {

      if (Array.isArray(src)) {
        let obj = {};
        src.map(function (item) {
          obj[Math.random().toString(32).slice(2)] = item
        });
        src = obj;
      }

      let length = Object.keys(src).length,
        key,
        script,
        scripts = {},
        iterator = 0;
      for (key in src) {
        script = document.createElement('script');
        script.src = (src[key].substr(-3) === '.js') ? src[key] : src[key] + '.js';
        script.type = 'application/javascript';
        script.id = key;
        script.onerror = onerror;
        script.onload = function (e) {
          scripts[this.id] = this;
          iterator++;
          if (iterator === length) {
            callback.call({}, scripts);
          }
        };
        this.global.head.appendChild(script);
      }
    }
  }

  /**
   * ({ img1: '/path/to/img1' }, function (list) {})
   * @param list {object}
   * @param callback {function}
   */
  image (list, callback) {
    if (list && typeof list === 'object') {
      const length = Object.keys(list).length;
      const loadedData = {};
      let name, iterator = 0;
      for (name in list) {
        const img = this.global.createElement('img');
        img.src = list[name];
        img.name = name;
        img.onload = function (e) {
          loadedData[this.name] = this;
          iterator++;
          if (iterator === length)
            callback.call({}, loadedData);
        };
      }
    }
  }

  img (src, callback) {
    const img = this.global.createElement("img");
    img.src = src;
    img.addEventListener("load", () => {
      callback.call(this, img)
    });
  }



  /**
   * ( {audio1: '/path/to/audio1', }, function (list) {})
   * @param list
   * @param callback
   */
  audio (list, callback) {
    if (list && typeof list === 'object') {
      const length = Object.keys(list).length;
      const loadedData = {};
      let name, iterator = 0;
      for (name in srcs) {
        const audio = document.createElement('audio');
        audio.src = list[name];
        audio.name = name;
        audio.preload = 'auto';
        loadedData[name] = audio;
        iterator++;
        if (iterator === length) {
          callback.call({}, loadedData);
        }
      }
    }
  }

  /**
   * ( { video1: '/path/to/video1', }, function (list) {})
   * @param list
   * @param callback
   */
  video (list, callback) {
    if (list && typeof list === 'object') {
      const length = Object.keys(list).length;
      const loadedData = {};
      let name, iterator = 0;
      for (name in list) {
        const video = this.global.createElement('video');
        video.src = list[name];
        video.name = name;
        video.preload = 'auto';
        loadedData[name] = video;
        iterator++;
        if (iterator === length)
          callback.call({}, loadedData);
      }
    }
  }


}