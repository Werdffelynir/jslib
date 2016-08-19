/*
 piece-bg
 piece-box
 piece-title
 piece-content
 piece-close
 */
(function(){

    /**
     * @namespace window.Piece
     */
    var piece = function (options) {
        if(!(this instanceof Piece)) return new Piece(options);

        //piece.addCommonStyle();

        this.options = {
            width: 'auto',
            height: 'auto',
            bgColor: '#000000',
            bgAction: true,
            hideRemoved: true
        };

        if(typeof options === 'object') {
            for (var key in options) {
                if(this.options[key] !== undefined) this.options[key] = options[key];
            }
        }

    };

    piece.addCommonStyle = function(){
        var style = document.createElement('style');
        style.textContent = '.piece-bg{}.piece-box {position: absolute;background-color: #ffffff}.piece-title {display: inline-block}.piece-content {}.piece-close {display: inline-block; position: absolute;right: 5px;}';
        document.head.appendChild(style);
    };


    piece.horizontalAlign = function(elem){
        elem.style.left = ((document.body.clientWidth / 2) - ( elem.offsetWidth / 2) ) + 'px';
    };

    piece.verticalAlign = function(elem){

        elem.style.top = ((window.innerHeight / 2) - ( elem.offsetHeight / 2) ) + 'px';
    };


    piece.prototype._stack = {};

    piece.prototype.createElement = function (id) {

        //var bg = document.createElement('div');
        var box = document.createElement('div');
        var head = document.createElement('div');
        var title = document.createElement('div');
        var close = document.createElement('div');
        var content = document.createElement('div');

        box.id = id;
        //bg.className = 'piece-bg';
        box.className = 'piece-box';
        title.className = 'piece-title';
        close.className = 'piece-close';
        content.className = 'piece-content';

        title.textContent = 'Piece Label';
        close.textContent = 'close';
        content.textContent = 'Piece Content text ...';

        head.appendChild(close);
        head.appendChild(title);
        box.appendChild(head);
        box.appendChild(content);
        //bg.appendChild(box);

        return box;
    };

    piece.prototype.register = function (id) {
        var elem = document.getElementById(id);
        if(!elem) {
            console.error('Element not find by id: ' + id);
            return;
        }
        var node = document.getElementById(id);

        return this.create(id, node);
    };

    piece.prototype.get = function (id) {
        return this._stack[id]
    };

    piece.prototype.create = function (id, elem) {

        var fn = {}, that = this;
        elem = elem || this.createElement(id);

        fn.y = 0;
        fn.x = 0;
        fn.id = id;
        fn.node = elem;
        fn.isVisibly = false;

        fn.show = function(){
            if(!this.isVisibly) {
                if(!document.getElementById(id)) document.body.insertBefore(this.node, document.body.firstChild);

                this.node.style.display = 'block';
                this.isVisibly = true;

                if(this.x > 0) this.node.style.left = this.x + 'px';
                else piece.horizontalAlign(elem);

                if(this.y > 0) this.node.style.top = this.y + 'px';
                else piece.verticalAlign(elem);
            }
        };

        fn.hide = function(){
            if(this.isVisibly) {
                if(!document.getElementById(id) && that.options.hideRemoved) document.body.removeChild(this.node);

                this.node.style.display = 'none';
                this.isVisibly = false;
            }
        };

        fn.toggle = function(){
            if(this.isVisibly) this.hide();
            else this.show();
        };

        fn.setTitle = function(txtHtml){
            this.node.querySelector('.piece-title').innerHTML = txtHtml || '';
        };

        fn.setContent = function(txtHtml){
            this.node.querySelector('.piece-content').innerHTML = txtHtml || '';
        };

        // position
        if(that.options['width'] !== 'auto' && that.options['width'] > 0) {
            elem.style.width = that.options['width'] + 'px'
        }

        if(that.options['height'] !== 'auto' && that.options['height'] > 0) {
            elem.style.height = that.options['height'] + 'px'
        }

        fn.setX = function(pxs){fn.x = pxs};
        fn.setY = function(pxs){fn.y = pxs};

        fn.node.querySelector('.piece-close').onclick = (function(event){
            fn.hide.call(fn, event);
        });

        return this._stack[id] = fn;
    };

    window.Piece = piece;

})();