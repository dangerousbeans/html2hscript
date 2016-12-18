var test = require('tap').test;
var parser = require('../');

test('should return attributes', function(t) {
  parser('<h1 foo="beep">Hello World</h1>', function(err, hscript) {
    t.equals(hscript, 'h("h1", {"attributes":{"foo":"beep"}}, [ "Hello World" ])', 'success')
    t.end()
  })
})

test('should return hyperscript', function(t) {
  parser('<div><div><h1 foo="beep">Hello World</h1></div></div>', function(err, hscript) {
    t.equals(hscript, 'h("div", [ h("div", [ h("h1", {"attributes":{"foo":"beep"}}, [ "Hello World" ]) ]) ])', 'success')
    t.end()
  })
})

test('should return children', function(t) {
  parser('<p>Hello\n<b>World</b></p>', function(err, hscript) {
    t.equals(hscript, 'h("p", [ "Hello\\n", h("b", [ "World" ]) ])', 'success')
    t.end()
  })
})

test('should handle correctly pre', function(t) {
  parser('<pre>Hello\nWorld</pre>', function(err, hscript) {
    t.equals(hscript, 'h("pre", [ "Hello\\nWorld" ])', 'success')
    t.end()
  })
})

test('should output style attribute as an object', function(t) {
  parser('<h1 style="color: red; font-size: 12px">Hello World</h1>', function(err, hscript) {
    t.equals(hscript, 'h("h1", {"style":{"color":"red","font-size":"12px"}}, [ "Hello World" ])', 'success')
    t.end()
  })
})


test('it should output attributes in a normal looking hash, not as "attributes:"', function(t) {
  parser('<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>', function(err, hscript) {
    t.equals(hscript, 'h("a.dropdown-toggle", {"href":"#","role":"button","aria-haspopup":"true","aria-expanded":"false"},"dataset":{"toggle":"dropdown"}}, [ "Dropdown ", h("span.caret") ])', 'success')
    t.end()
  })
})
