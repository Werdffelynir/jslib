////////////////////////////////////////////////////////////////////////
// Mouse Methods
var Ut = window.Ut || {};   // THIS-LINE-WILL-DELETED
Ut.Mouse = {};

Ut.Mouse.m = function (src){};

/**
 * Returns the coordinates of the mouse on any element
 * @param event
 * @param element
 * @returns {{x: number, y: number}}
 */
Ut.Mouse.position = function (event, element) {
    var positions = {x: 0, y: 0};
    element = element || document.body;
    if(element instanceof HTMLElement && event instanceof MouseEvent) {
        if(element.getBoundingClientRect) {
            var rect = element.getBoundingClientRect();
            positions.x = event.clientX - rect.left;
            positions.y = event.clientY - rect.top;
        }else {
            positions.x = event.pageX - element.offsetLeft;
            positions.y = event.pageY - element.offsetTop;
        }
    }
    return positions;
};
