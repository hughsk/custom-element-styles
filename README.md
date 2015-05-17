# custom-element-styles
![](http://img.shields.io/badge/stability-stable-orange.svg?style=flat)
![](http://img.shields.io/npm/v/custom-element-styles.svg?style=flat)
![](http://img.shields.io/npm/dm/custom-element-styles.svg?style=flat)
![](http://img.shields.io/npm/l/custom-element-styles.svg?style=flat)

Automatically inject styles into a custom element's Shadow DOM once it's
created.

Similar to [insert-css](https://github.com/substack/insert-css), except for
custom elements.

## Usage

[![NPM](https://nodei.co/npm/custom-element-styles.png)](https://nodei.co/npm/custom-element-styles/)

### `styles(Element, css)`

Applies the `css` styles when a `ShadowRoot` is created on the `Element` custom
element.

``` javascript
require('webcomponents.js')

const styles = require('custom-element-styles')

const CustomElement = {
  prototype: Object.create(HTMLElement.prototype)
}

styles(CustomElement, `
  h1 {
    color: red;
    text-transform: uppercase;
  }
`)

CustomElement.prototype.createdCallback = function() {
  var h1 = document.createElement('h1')
  h1.innerText = 'hello world'
  this.createShadowRoot().appendChild(h1)
}

// Note: it's important that you assign the styles
// *before* the element is registered.
document.registerElement('custom-element', CustomElement)
```

Alternatively, using [brfs](http://github.com/substack/brfs)
and
[custom-element](http://github.com/requireio/custom-element):

``` javascript
require('webcomponents.js')

const styles        = require('custom-element-styles')
const customElement = require('custom-element')
const fs            = require('fs')

const css = fs.readFileSync(require.resolve('./index.css'), 'utf8')

const CustomElement = customElement()
  .once('created', () => {
    var h1 = document.createElement('h1')
    h1.innerText = 'hello world'
    this.createShadowRoot().appendChild(h1)
  })

styles(CustomElement, css)

document.registerElement('custom-element', CustomElement)
```

## See Also

* [webcomponents.js](https://github.com/webcomponents/webcomponentsjs)
* [custom-element](https://github.com/requireio/custom-element)
* [insert-css](https://github.com/substack/insert-css)
* [brfs](https://github.com/substack/brfs)

## License

MIT. See [LICENSE.md](http://github.com/hughsk/custom-element-styles/blob/master/LICENSE.md) for details.
