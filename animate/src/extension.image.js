Animate.Extension(function (insance) {

    if (!(insance instanceof Animate))
        return;
    var

        /**
         * @type Animate.prototype
         */
        that = insance,

        /**
         * @type CanvasRenderingContext2D
         */
        context = insance.getContext(),

        image = {
            images: {}
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
    image.load = function (imgs, callback) {
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
                        image.images = Animate.Util.defaultObject(image.images, images);
                        callback.call(that, images);
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
    image.get = function (name) {
        if (typeof name === 'string')
            return image.images[name] ? image.images[name] : false;
        if (Array.isArray(name)) {
            var i, imgs = [];
            for (i = 0; i < name.length; i ++)
                if (image.images[i]) imgs.push(image.images[i]);
            return imgs;
        }
    };


    insance.image = image;
})