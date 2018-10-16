`python3 watcher.py 'src' 'php -f script.php'`
`php -f builder.php < config.json`

# AnimateApplication

```
constructor (config)
scene
sceneObject
stop
start
clear

getFPS
getIteration
getContext
getCanvas
```


# AnimateText
```
constructor (AnimateInstance)
format
print
```








```angular2html


fillStyle: "#000000"
filter: "none"
font: "16px "bold sans", Arial"
globalAlpha: 1
globalCompositeOperation: "source-over"
imageSmoothingEnabled: true
imageSmoothingQuality: "low"
lineCap: "butt"
lineDashOffset: 0
lineJoin: "miter"
lineWidth: 1
miterLimit: 10
shadowBlur: 0
shadowColor: "rgba(0, 0, 0, 0)"
shadowOffsetX: 0
shadowOffsetY: 0
strokeStyle: "#000000"
textAlign: "start"
textBaseline: "alphabetic"

canvas: canvas.canvas
---
accessKey: ""
assignedSlot: null
attributeStyleMap: StylePropertyMap {size: 0}
attributes: NamedNodeMap {0: class, 1: width, 2: height, class: class, width: width, height: height, length: 3}
autocapitalize: ""
baseURI: "http://jslib.loc/animateapplication/"
childElementCount: 0
childNodes: NodeList []
children: HTMLCollection []
classList: DOMTokenList ["canvas", value: "canvas"]
className: "canvas"
clientHeight: 600
clientLeft: 0
clientTop: 0
clientWidth: 800
contentEditable: "inherit"
dataset: DOMStringMap {}
dir: ""
draggable: false
firstChild: null
firstElementChild: null
height: 600
hidden: false
id: ""
innerHTML: ""
innerText: ""
inputMode: ""
isConnected: true
isContentEditable: false
lang: ""
lastChild: null
lastElementChild: null
localName: "canvas"
namespaceURI: "http://www.w3.org/1999/xhtml"
nextElementSibling: script
nextSibling: text
nodeName: "CANVAS"
nodeType: 1
nodeValue: null
nonce: ""
offsetHeight: 600
offsetLeft: 8
offsetParent: body
offsetTop: 8
offsetWidth: 800
onabort: null
onauxclick: null
onbeforecopy: null
onbeforecut: null
onbeforepaste: null
onblur: null
oncancel: null
oncanplay: null
oncanplaythrough: null
onchange: null
onclick: null
onclose: null
oncontextmenu: null
oncopy: null
oncuechange: null
oncut: null
ondblclick: null
ondrag: null
ondragend: null
ondragenter: null
ondragleave: null
ondragover: null
ondragstart: null
ondrop: null
ondurationchange: null
onemptied: null
onended: null
onerror: null
onfocus: null
ongotpointercapture: null
oninput: null
oninvalid: null
onkeydown: null
onkeypress: null
onkeyup: null
onload: null
onloadeddata: null
onloadedmetadata: null
onloadstart: null
onlostpointercapture: null
onmousedown: null
onmouseenter: null
onmouseleave: null
onmousemove: null
onmouseout: null
onmouseover: null
onmouseup: null
onmousewheel: null
onpaste: null
onpause: null
onplay: null
onplaying: null
onpointercancel: null
onpointerdown: null
onpointerenter: null
onpointerleave: null
onpointermove: null
onpointerout: null
onpointerover: null
onpointerup: null
onprogress: null
onratechange: null
onreset: null
onresize: null
onscroll: null
onsearch: null
onseeked: null
onseeking: null
onselect: null
onselectstart: null
onstalled: null
onsubmit: null
onsuspend: null
ontimeupdate: null
ontoggle: null
onvolumechange: null
onwaiting: null
onwebkitfullscreenchange: null
onwebkitfullscreenerror: null
onwheel: null
outerHTML: "<canvas class="canvas" width="800" height="600"></canvas>"
outerText: ""
ownerDocument: document
parentElement: body
parentNode: body
prefix: null
previousElementSibling: null
previousSibling: text
scrollHeight: 600
scrollLeft: 0
scrollTop: 0
scrollWidth: 800
shadowRoot: null
slot: ""
spellcheck: true
style: CSSStyleDeclaration {alignContent: "", alignItems: "", alignSelf: "", alignmentBaseline: "", all: "", …}
tabIndex: -1
tagName: "CANVAS"
textContent: ""
title: ""
translate: true
width: 800




###########################################################################
###########################################################################
###########################################################################

  /**
   * @param size {number}
   * @param weight {string|boolean}
   * @param family {string}
   * @returns {AnimateText}
   */
  font (size, weight, family) {
    this.config.font = `${size}px/${(size + 2)}px ${weight} ${family}`;
    return this;}
  /** @param src {number} */
  x (src) {this.config.x = src;
    return this;}
  /** @param src {number} */
  y (src) {this.config.y = src;
    return this;}
  /** @param src {string} "sans" || "serif" || "Arial" || "Ubuntu" || "Verdana" */
  famely (src) { this.config.family = src;
    return this;}
  /** @param src {string} "left" || "right" || "center" || "start" || "end" */
  align (src) { this.config.align = src;
    return this;}
  /** @param src {string} "normal" || "bold" || "100" || "400" || "600" */
  weight (src) { this.config.weight = src === true ? 'bold' : src === false ? "normal" : src;
    return this;}
  /** @param src {number} */
  size (src) { this.config.size = src;
    return this;}
  /** @param src {string} "top" || "hanging" || "middle" || "alphabetic" || "ideographic" || "bottom" */
  baseline (src) {this.config.baseline = src;
    return this;}
  /** @param src {string} "black" || "#000000" || "rgba(0, 0, 0, 0.5)" */
  color (src) {this.config.color = src;
    return this;}




##########################################################

  /**
   * @param src {string} = "none" || <filter-function1> [<filter-function2] [<filter-functionN]
   * @returns {AnimateApplication}
   */
  set filter (src) { this._context.filter = src; return this }
  /**
   * @param src {string} = type
   *  "source-over" || "source-in" || "source-out" || "source-atop" || "destination-over" || "destination-in" ||
   *  "destination-out" || "destination-atop" || "lighter" || "copy" || "xor" || "multiply" || "screen" || "overlay" ||
   *  "lighten" || "color-dodge" || "color-burn" || "hard-light" || "soft-light"|| "difference" || "exclusion" ||
   *  "hue" || "saturation" || "color" || "luminosity"
   * @returns {AnimateApplication}
   */
  set globalCompositeOperation (src) { this._context.globalCompositeOperation = src; return this }
  /**
   * @param src {boolean}
   * @returns {AnimateApplication}
   */
  set imageSmoothingEnabled (src) { this._context.imageSmoothingEnabled = src; return this }
  /**
   * @param src {string} "low" || "medium" || "high""
   * @returns {AnimateApplication}
   */
  set imageSmoothingQuality (src) { this._context.__ = src; return this }
  /**
   * @param src {string} "butt" || "round" || "square"
   * @returns {AnimateApplication}
   */
  set lineCap (src) { this._context.lineCap = src; return this }
  /**
   * @param src {number}
   * @returns {AnimateApplication}
   */
  set lineDashOffset (src) { this._context.lineDashOffset = src; return this }
  /**
   * @param src {number}
   * @returns {AnimateApplication}
   */
  set lineJoin (src) { this._context.lineJoin = src; return this }
  /**
   * @param src {number}
   * @returns {AnimateApplication}
   */
  set lineWidth (src) { this._context.lineWidth = src; return this }
  /**
   * @param src {number}
   * @returns {AnimateApplication}
   */
  set miterLimit (src) { this._context.miterLimit = src; return this }
  /**
   * @param src {number} 0 - 1
   * @returns {AnimateApplication}
   */
  set shadowBlur (src) { this._context.shadowBlur = src; return this }
  /**
   * @param src {string} = "red" || "#FF0000" || "rgba(0, 0, 0, 0.3)"
   * @returns {AnimateApplication}
   */
  set shadowColor (src) { this._context.shadowColor = src; return this }
  /**
   * @param src {number}
   * @returns {AnimateApplication}
   */
  set shadowOffsetX (src) { this._context.shadowOffsetX = src; return this }
  /**
   * @param src {number}
   * @returns {AnimateApplication}
   */
  set shadowOffsetY (src) { this._context.shadowOffsetY = src; return this }
  /**
   * @param src {number} 0 - 1
   * @returns {AnimateApplication}
   */
  set globalAlpha (src) { this._context.globalAlpha = src; return this }
  /**
   * @param src {string} "red" || "#FF0000" || "rgba(0, 0, 0, 0.3)"
   * @returns {AnimateApplication}
   */
  set fillStyle (src) { this._context.fillStyle = src; return this }
  /**
   * @param src {string} "red" || "#FF0000" || "rgba(0, 0, 0, 0.3)"
   * @returns {AnimateApplication}
   */
  set strokeStyle (src) { this._context.strokeStyle = src; return this }
  /**
   * @param src {string} "48px serif" || "12px/14px bold sans, serif"
   * @returns {AnimateApplication}
   */
  set font (src) { this._context.font = src; return this }
  /**
   * @param src {string} "left" || "right" || "center" || "start" || "end";
   * @returns {AnimateApplication}
   */
  set textAlign (src) { this._context.textAlign = src; return this }
  /**
   * @param src {string} "top" || "hanging" || "middle" || "alphabetic" || "ideographic" || "bottom"
   * @returns {AnimateApplication}
   */
  set textBaseline (src) { this._context.textBaseline = src; return this }


```





