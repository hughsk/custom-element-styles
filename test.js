require('webcomponents.js')

const CustomElement = require('custom-element')
const domify        = require('domify')
const test          = require('tape')
const styles        = require('./')

test('custom-element-styles', t => {
  var Element1 = styles(CustomElement().once('created', created), 'h1 { font-size: 50px; }')
  var Element2 = styles(CustomElement().once('created', created), 'h1 { font-size: 72px; }')

  document.registerElement('element-1', Element1)
  document.registerElement('element-2', Element2)
  document.body.appendChild(domify(`
    <style>h1 { font-size: 12px }</style>
    <h1>Unstyled</h1>
    <element-1></element-1>
    <element-2></element-2>
  `))

  var body     = document.querySelector('h1')
  var element1 = document.querySelector('element-1::shadow h1')
  var element2 = document.querySelector('element-2::shadow h1')

  body     = getComputedStyle(body).getPropertyValue('font-size')
  element1 = getComputedStyle(element1).getPropertyValue('font-size')
  element2 = getComputedStyle(element2).getPropertyValue('font-size')

  t.equal(body, '12px')
  t.equal(element1, '50px')
  t.equal(element2, '72px')
  t.end()

  function created(delay) {
    var h1 = document.createElement('h1')
    h1.innerHTML = 'Header!'
    this.createShadowRoot()
    this.shadowRoot.appendChild(h1)
  }
})
