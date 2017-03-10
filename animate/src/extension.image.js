Animate.Extension(function (insance) {

    if (!(insance instanceof Animate))
        return;

    /**
     * @type {{images: {}, load: load, get: get}}
     */
    insance.Image = {
        images: {},
        load: function (imgs, callback) {},
        get: function (name) {}
    };

    /**
     * Load Image Resource
     * Object imgs:
     *      key     - is the name for the access, assigned after loading
     *      value   - is the URL of the resource to load
     *
     * @param imgs
     * @param callback
     */
    insance.Image.load = function (imgs, callback) {
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
                        insance.Image.images = Animate.Util.defaultObject(insance.Image.images, images);
                        callback.call(insance, images);
                    }
                };
            }
        }
    };
    
    /**
     * Get image`s
     * @param name
     * @returns {*}
     */
    insance.Image.get = function (name) {
        if (typeof name === 'string')
            return insance.Image.images[name] ? insance.Image.images[name] : false;
        if (Array.isArray(name)) {
            var i, imgs = [];
            for (i = 0; i < name.length; i ++)
                if (insance.Image.images[i]) imgs.push(insance.Image.images[i]);
            return imgs;
        }
    };

})