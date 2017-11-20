
/**
 * Animate.Loader.images ( {name: src}, function (list) {} )
 * Animate.Loader.audios ( {name: src}, function (list) {} )
 * Animate.Loader.videos ( {name: src}, function (list) {} )
 *
 * Module of Expansion
 * Assign static as instance methods
 */
Animate.Loader = {

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
          iterator ++;
          if (iterator === length) {
            callback.call({}, images);
          }
        };
      }
    }
  },


  audios: function (srcs, callback) {
    if (srcs && typeof srcs === 'object') {
      var length = Object.keys(srcs).length;
      var audios = {};
      var iterator = 0;
      for (var name in srcs) {
        var audio =  document.createElement('audio');
        audio.src = srcs[name];
        audio.name = name;
        audio.preload = 'auto';
        audios[name] = audio;
        iterator ++;
        if (iterator === length) {
          callback.call({}, audios);
        }
      }
    }
  },


  videos: function (srcs, callback) {
    if (srcs && typeof srcs === 'object') {
      var length = Object.keys(srcs).length;
      var videos = {};
      var iterator = 0;
      for (var name in srcs) {
        var video =  document.createElement('video');
        video.src = srcs[name];
        video.name = name;
        video.preload = 'auto';
        videos[name] = video;
        iterator ++;
        if (iterator == length) {
          callback.call({}, videos);
        }
      }
    }
  }

};







