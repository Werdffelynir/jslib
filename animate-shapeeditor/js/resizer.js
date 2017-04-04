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
            clientWidth = startWidth + e.clientX - startX;
            clientHeight = startHeight + e.clientY - startY;
            resized.style.width = clientWidth + 'px';
            resized.style.height = clientHeight + 'px';

            if (typeof onChangeDrag === 'function') {
                onChangeDrag.call(resized, {width:clientWidth, height:clientHeight});
            }
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