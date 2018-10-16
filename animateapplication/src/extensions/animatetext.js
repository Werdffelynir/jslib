

const FONT_TYPE_FILL = 'fill';
const FONT_TYPE_STROKE = 'stroke';
const FONT_FAMILY = 'sans-serif';
const FONT_BASELINE_TOP = 'top';
const FONT_BASELINE_BOTTOM = 'bottom';
const FONT_BASELINE_MIDDLE = 'middle';
const FONT_BASELINE_HANGING = 'hanging';
const FONT_BASELINE_TLPHABETIC = 'alphabetic';
const FONT_BASELINE_IDEOGRAPHIC = 'ideographic';
const FONT_ALIGN_LEFT = 'left';
const FONT_ALIGN_RIGHT = 'right';
const FONT_ALIGN_CENTER = 'center';
const FONT_ALIGN_START = 'start';
const FONT_ALIGN_END = 'end';
const FONT_WEIGHT_NORMAL = 'normal';
const FONT_WEIGHT_BOLD = 'bold';
const FONT_WEIGHT_100 = '100';
const FONT_WEIGHT_400 = '400';
const FONT_WEIGHT_600 = '600';

class AnimateText {

  constructor (Animate) {
    if ( !(Animate instanceof AnimateApplication) ) {
      throw new Error(':constructor argument in not of instance AnimateApplication');
    }

    this.config = {
      x: 0,
      y: 0,
      text: '',
      type: FONT_TYPE_FILL,
      size: 12,
      align: FONT_ALIGN_LEFT,
      family: 'sans-serif',
      baseline : FONT_BASELINE_TOP,
    };

    /**@type {CanvasRenderingContext2D}*/
    this.context = Animate._context;
  }

  format (textConfig) {
    const conf = textConfig ? {...this.config, ...textConfig} : this.config;
    this.context.font = `${conf.size}px/${(conf.size + 2)}px ${conf.family}`;
    this.context.textAlign = conf.align;
    this.context.textBaseline = conf.baseline;
    return this;
  }

  text (text) {
    this.config.text = text;
    return this;
  }

  stroke () {
    this.context.strokeText(this.config.text, this.config.x, this.config.y);
    return this;
  }

  fill () {
    this.context.fillText(this.config.text, this.config.x, this.config.y);
    return this;
  };

  print (text, posx, posy ) {
    if (isDefined(text)) this.config.text = text;
    if (isDefined(posx)) this.config.x = posx;
    if (isDefined(posy)) this.config.y = posy;

    switch (this.config.type) {
      case FONT_TYPE_FILL:this.fill();break;
      case FONT_TYPE_STROKE:this.stroke();break;
      default:
    }
    return this;
  }

}
