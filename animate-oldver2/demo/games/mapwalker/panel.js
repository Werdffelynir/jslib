Animate.Module('Panel', {
  i: 0,
  an: null,
  ctx: null,

  init: function (an) {
    this.an = an;
    this.ctx = an.getContext();
  },

  showFrames: function (i) {
    this.i = i;
    this.an.TextField().text('Frame: ' + i, 5, 5)
      .color('#fff')
      .fill();
  }
});