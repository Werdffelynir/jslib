Animate.Extension(function (instance) {

    if (!(instance instanceof Animate))
        return;

    /**
     * @type CanvasRenderingContext2D
     */
    var context = instance.getContext();

    instance.resource = {
        _images: {},
        _audios: {},
        _videos: {}
    };

    instance.resource.loadImage = function (imgs, callback) {
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
                    if (iterator == length) {
                        instance.resource._images = Animate.defaultObject(instance.resource._images, images);
                        callback.call(instance, images);
                    }
                };
            }
        }
    };

    instance.resource.loadAudio = function (srcs, callback) {
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
                if (iterator == length) {
                    instance.resource._audios = Animate.defaultObject(instance.resource._audios, audios);
                    callback.call(instance, audios);
                }
            }
        }
    };

    instance.resource.loadVideo = function (srcs, callback) {
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
                    instance.resource._videos = Animate.defaultObject(instance.resource._videos, videos);
                    callback.call(instance, videos);
                }
            }
        }
    };

    instance.resource.getImage = function (name) {
        if (typeof name === 'string')
            return instance.resource._images[name] ? instance.resource._images[name] : false;
        if (Array.isArray(name)) {
            var i, imgs = [];
            for (i = 0; i < name.length; i ++)
                if (instance.resource._images[i]) imgs.push(instance.resource._images[i]);
            return imgs;
        }
    };

    instance.resource.getAudio = function (name) {
        if (typeof name === 'string')
            return instance.resource._audios[name] ? instance.resource._audios[name] : false;
        if (Array.isArray(name)) {
            var i, result = [];
            for (i = 0; i < name.length; i ++)
                if (instance.resource._audios[i]) result.push(instance.resource._audios[i]);
            return result;
        }
    };

    instance.resource.getVideo = function (name) {
        if (typeof name === 'string')
            return instance.resource._videos[name] ? instance.resource._videos[name] : false;
        if (Array.isArray(name)) {
            var i, result = [];
            for (i = 0; i < name.length; i ++)
                if (instance.resource._videos[i]) result.push(instance.resource._videos[i]);
            return result;
        }
    };



})