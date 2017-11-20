(function () {

  var An = new Animate({
    selector: '#canvas',
    width: 600,
    height: 400,
    fps: 12,
  });


  // * * * * * * * * * * * * * * * * * * * * * * * * *

  var Graphic = An.Graphic();
  var TextField = An.TextField();

  Move = {};


  Move.drawDisplay = An.Clip({
    rotateCurrent: 0,
    rotateEntry: (Animate.DEGREE * 360) / 12,
  }, function (ctx, i) {
    ctx.save();
    ctx.translate(An.width/2, An.height/2);

    for (var i = 1; i < 13; i ++) {
      ctx.save();
      ctx.rotate(this.rotateCurrent);
      Graphic.line(150,0,190,0).color('#7a7a7a').thickness(10).stroke();
      ctx.restore();
      this.rotateCurrent += this.rotateEntry;
    }

    ctx.restore();
  });


  Move.drawSecondsArrow = An.Clip({
    lines: 12,
    secondsCurrent: 0,
    seconds: 0,
    rotateEntry: (Animate.DEGREE * 360) / 60,
  }, function (ctx, i) {
    this.seconds = (new Date()).getSeconds();
    this.secondsCurrent = (this.seconds * this.rotateEntry) - this.rotateEntry * 15;

    ctx.save();
    ctx.translate(An.width/2, An.height/2);
    ctx.rotate(this.secondsCurrent);
    Graphic.line(0,0,180,0).color('#515151').thickness(3).stroke();
    ctx.restore();

  });


  Move.drawHoursArrow = An.Clip({
    lines: 12,
    hoursCurrent: 0,
    hours: 0,
    rotateEntry: (Animate.DEGREE * 360) / 12,
  }, function (ctx, i) {
    this.hours = (new Date()).getHours() + 1;
    this.hoursCurrent = ((this.hours % 12) * this.rotateEntry) - this.rotateEntry * 3;

    ctx.save();
    ctx.translate(An.width/2, An.height/2);
    ctx.rotate(this.hoursCurrent);
    Graphic.line(0,0,150,0).color('#000').thickness(12).stroke();
    ctx.restore();

  });


  Move.drawMinutesArrow = An.Clip({
    lines: 12,
    minutesCurrent: 0,
    minutes: 0,
    rotateEntry: (Animate.DEGREE * 360) / 60,
  }, function (ctx, i) {
    this.minutes = (new Date()).getMinutes();
    this.minutesCurrent = (this.minutes * this.rotateEntry) - this.rotateEntry * 15;

    ctx.save();
    ctx.translate(An.width/2, An.height/2);
    ctx.rotate(this.minutesCurrent);
    Graphic.line(0,0,170,0).color('#3d3d3d').thickness(7).stroke();
    ctx.restore();

  });


  An.frame(function (ctx, i) {
    /** @type CanvasRenderingContext2D */
    ctx = ctx;

    Move.drawDisplay(ctx, i);
    Move.drawSecondsArrow(ctx, i);
    Move.drawMinutesArrow(ctx, i);
    Move.drawHoursArrow(ctx, i);

    TextField.text('Frame: ' + i, 10, 10)
      .color('#000').fill();
  });


  // start
  An.start();

})();
