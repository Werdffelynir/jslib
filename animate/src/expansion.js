(/** @type Animate.prototype */ function (prototype) {

    /**
     * Module of Expansion
     * Assign static as instance methods
     */
    prototype.createClip = Animate.Clip;
    prototype.point = Animate.Point;
    prototype.rectangle = Animate.Rectangle;

    prototype.defaultObject = Animate.defaultObject;
    prototype.copy = Animate.copy;
    prototype.random = Animate.random;
    prototype.randomColor = Animate.randomColor;
    prototype.degreesToRadians = Animate.degreesToRadians;
    prototype.radiansToDegrees = Animate.radiansToDegrees;
    prototype.distanceBetween = Animate.distanceBetween;
    prototype.calculateAngle = Animate.calculateAngle;

})(Animate.prototype)