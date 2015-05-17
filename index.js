var slice = require('sliced')

module.exports = ApplyStyles

function ApplyStyles(Element, css) {
  var _createShadowRoot = Element.prototype.createShadowRoot

  Element.prototype.createShadowRoot = function() {
    var shadow = _createShadowRoot.apply(this, slice(arguments))
    var style  = document.createElement('style')

    style.innerHTML = css
    shadow.appendChild(style)

    return shadow
  }

  return Element
}
