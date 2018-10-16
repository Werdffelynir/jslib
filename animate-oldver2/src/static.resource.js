
/**
 * Animate.Loader.javascript ( {name: src, name: src}, function (list) {} )
 * Animate.Loader.javascript ( [src, src], function (list) {} )
 * Animate.Loader.images ( {name: src, name: src}, function (list) {} )
 * Animate.Loader.audios ( {name: src, name: src}, function (list) {} )
 * Animate.Loader.videos ( {name: src, name: src}, function (list) {} )
 *
 * Module of Expansion
 * Assign static as instance methods
 */
Animate.Loader = {

  /**
   * Loads a script element with javascript source
   *
   * .javascript ( {
   *      myscript1: '/path/to/myscript1',
   *      myscript2: '/path/to/myscript2',
   *    },
   *    function (list) {})
   *
   * .javascript ( [
   *      '/path/to/myscript1',
   *      '/path/to/myscript2',
   *    ],
   *    function (list) {})
   *
   * @namespace Animate.Loader.javascript
   * @param src       Object, Array. items: key is ID, value is src
   * @param callback  Function called when all srcs is loaded
   * @param onerror   Function called when load is failed
   * @returns {*}
   */
  javascript: function (src, callback, onerror) {
    if (src && typeof src === 'object') {

      if (Array.isArray(src)) {
        var obj = {};
        src.map(function (item) {obj[Math.random().toString(32).slice(2)] = item});
        src = obj;
      }

      var length = Object.keys(src).length,
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
        document.head.appendChild(script);
      }
    }
  },

  /**
   * Load an images
   *
   * .images ( {
   *      img1: '/path/to/img1',
   *      img2: '/path/to/img2',
   *    },
   *    function (list) {})
   *
   * @namespace Animate.Loader.images
   * @param imgs
   * @param callback
   */
  images: function (imgs, callback) {
    if (imgs && typeof imgs === 'object') {
      var length = Object.keys(imgs).length;
      var images = {};
      var iterator = 0;
      for (var name in imgs) {
        var img = document.createElement('img');
        img.src = imgs[name];
        img.name = name;
        img.onload = function (e) {
          images[this.name] = this;
          iterator++;
          if (iterator === length) {
            callback.call({}, images);
          }
        };
      }
    }
  },

  /**
   * Load an audio files
   *
   * .audios ( {
   *      audio1: '/path/to/audio1',
   *      audio2: '/path/to/audio2',
   *    },
   *    function (list) {})
   *
   * @namespace Animate.Loader.audios
   * @param srcs
   * @param callback
   */
  audios: function (srcs, callback) {
    if (srcs && typeof srcs === 'object') {
      var length = Object.keys(srcs).length;
      var audios = {};
      var iterator = 0;
      for (var name in srcs) {
        var audio = document.createElement('audio');
        audio.src = srcs[name];
        audio.name = name;
        audio.preload = 'auto';
        audios[name] = audio;
        iterator++;
        if (iterator === length) {
          callback.call({}, audios);
        }
      }
    }
  },

  /**
   * Load an video files
   *
   * .videos ( {
   *      video1: '/path/to/video1',
   *      video2: '/path/to/video2',
   *    },
   *    function (list) {})
   *
   * @namespace Animate.Loader.videos
   * @param srcs
   * @param callback
   */
  videos: function (srcs, callback) {
    if (srcs && typeof srcs === 'object') {
      var length = Object.keys(srcs).length;
      var videos = {};
      var iterator = 0;
      for (var name in srcs) {
        var video = document.createElement('video');
        video.src = srcs[name];
        video.name = name;
        video.preload = 'auto';
        videos[name] = video;
        iterator++;
        if (iterator == length) {
          callback.call({}, videos);
        }
      }
    }
  }

};
