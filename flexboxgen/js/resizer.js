// resizer.js

(function () {

    var Resizer = function (resizer, resized, onChangeDrag, onStopDrag) {

        if (!(this instanceof Resizer)) return new Resizer(resizer, resized, onChangeDrag, onStopDrag);

        var startX, startY, startWidth, startHeight, clientWidth, clientHeight;

        resizer.addEventListener('mousedown', initDrag, false);

        function initDrag (e) {
            startX = e.clientX;
            startY = e.clientY;
            startWidth = parseInt(document.defaultView.getComputedStyle(resized).width, 10);
            startHeight = parseInt(document.defaultView.getComputedStyle(resized).height, 10);
            document.documentElement.addEventListener('mousemove', doDrag, false);
            document.documentElement.addEventListener('mouseup', stopDrag, false);
        }

        function doDrag (e) {
            var size = {width:true, height:true};

            clientWidth = startWidth + e.clientX - startX;
            clientHeight = startHeight + e.clientY - startY;

            if (typeof onChangeDrag === 'function') {
                size = onChangeDrag.call(resized, {width:clientWidth, height:clientHeight});

                if (size) {
                    clientWidth = size.width >= 0 ? size.width : clientWidth ;
                    clientHeight = size.height >= 0 ? size.height : clientHeight;
                }
            }

            if (size.width)
                resized.style.width = clientWidth + 'px';
            if (size.height)
                resized.style.height = clientHeight + 'px';
        }

        function stopDrag (e) {
            document.documentElement.removeEventListener('mousemove', doDrag, false);
            document.documentElement.removeEventListener('mouseup', stopDrag, false);

            if (typeof onStopDrag === 'function') {
                onStopDrag.call(resized, {width:clientWidth, height:clientHeight});
            }
        }
    };


    window.Resizer = Resizer;
})();