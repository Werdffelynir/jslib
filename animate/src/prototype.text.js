/**
 * Examples:
 *
 * .TextField()
 *    .text('Simple TextField', 10, 10)
 *    .color('#dd0')
 *    .align(TextField.ALIGN.CENTER)
 *    .font('bold 20px sans, sans-serif')
 *    .fill();
 *
 * @returns {{context: (CanvasRenderingContext2D|null), ALIGN: {LEFT: string, RIGHT: string, CENTER: string, START: string, END: string}, BASELINE: {TOP: string, HANDING: string, MIDDLE: string, ALPHABETIC: string, IDEOGRAPHIC: string, BOTTOM: string}, font: Function, text: Function, fill: Function, stroke: Function, align: Function, baseline: Function, color: Function}}
 * @constructor
 */
Animate.prototype.TextField = function () {

  var TextField = {
    context: this._context,
    formats: {
      x: 10,
      y: 10,
      text: '',
      font: 'normal 14px serif, sans-serif',
      color: '#000000',
      align: 'left',
      baseline: 'top',
      thickness: false,
      alpha: false,
    },
    ALIGNS: {
      LEFT: "left",
      RIGHT: "right",
      CENTER: "center",
      START: "start",
      END: "end",
    },
    BASELINES: {
      TOP: "top",
      HANDING: "hanging",
      MIDDLE: "middle",
      ALPHABETIC: "alphabetic",
      IDEOGRAPHIC: "ideographic",
      BOTTOM: "bottom",
    }
  };

  /**
   * Set font as CSS property `font`
   *
   * Syntax:
   *  font: [font-style||font-variant||font-weight] font-size [/line-height] font-family | inherit
   *
   * Example:
   * .font ( "12px Arial, sans-serif" )
   * .font ( "bold italic 110% serif" )
   * .font ( "normal small-caps 12px/14px fantasy" )
   *
   * @param value
   * @returns {TextField}
   */
  TextField.font = function (value) {
    this.formats.font = value;
    return this;
  };

  /**
   * Set text string, x y positions
   * @param value
   * @param x
   * @param y
   * @returns {TextField}
   */
  TextField.text = function (value, x, y) {
    this.formats.text = value;
    this.formats.x = x;
    this.formats.y = y;
    return this;
  };

  /**
   * Set color
   * @param value
   * @returns {TextField}
   */
  TextField.color = function (value) {
    this.formats.color = value;
    return this;
  };

  /**
   * Set text align.
   * "left" || "right" || "center" || "start" || "end";
   *
   * Example:
   * .align ( "left" );
   *
   * @param value
   * @returns {TextField}
   */
  TextField.align = function (value) {
    this.formats.align = value;
    return this;
  };

  /**
   * Set align to baseline of text.
   * "top" || "hanging" || "middle" || "alphabetic" || "ideographic" || "bottom";
   *
   * Example:
   * .baseline ( "middle" );
   *
   * @param value
   * @returns {TextField}
   */
  TextField.baseline = function (value) {
    this.formats.baseline = value;
    return this;
  };

  TextField.alpha = function (value) {
    this.formats.alpha = value;
    return this;
  };

  TextField.thickness = function (value) {
    this.formats.thickness = value;
    return this;
  };

  TextField.formatsApply = function () {
    if (this.formats.font !== false)
      this.context.font = this.formats.font;

    if (this.formats.align !== false)
      this.context.textAlign = this.formats.align;

    if (this.formats.baseline !== false)
      this.context.textBaseline = this.formats.baseline;

    if (this.formats.alpha !== false)
      this.context.globalAlpha = this.formats.alpha;

    if (this.formats.thickness !== false)
      this.context.lineWidth = this.formats.thickness;
  };

  TextField.fill = function () {
    this.formatsApply();
    if (this.formats.color)
      this.context.fillStyle = this.formats.color;
    this.context.fillText(this.formats.text, this.formats.x, this.formats.y);
  };

  TextField.stroke = function () {
    this.formatsApply();
    if (this.formats.color)
      this.context.strokeStyle = this.formats.color;
    this.context.strokeText(this.formats.text, this.formats.x, this.formats.y);
  };

  return TextField;
};