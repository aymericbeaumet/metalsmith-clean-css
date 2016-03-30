'use strict'

var cleanCSS = require('..')
var test = require('tape')

test('metalsmith-clean-css should not match any file if an empty string is given', function (t) {
  t.plan(2)
  var files = {
    'main.css': {
      contents: '  * { display: none }  '
    }
  }
  cleanCSS({ files: '' })(files, null, function (errors) {
    t.error(errors)
    t.deepEqual(files['main.css'].contents, '  * { display: none }  ')
  })
})

test('metalsmith-clean-css should match any CSS file with the default pattern', function (t) {
  var files = {
    'main.css': {
      contents: '  * { display: none }  '
    },
    'deep/path/main.css': {
      contents: '  * { display: none }  '
    }
  }
  t.plan(1 + Object.keys(files).length)
  cleanCSS()(files, null, function (errors) {
    t.error(errors)
    Object.keys(files).forEach(function (filename) {
      t.deepEqual(files[filename].contents, '*{display:none}')
    })
  })
})

test('metalsmith-clean-css should only match the desired CSS files if a pattern is given', function (t) {
  t.plan(3)
  var files = {
    'main.css': {
      contents: '  * { display: none }  '
    },
    'deep/path/main.css': {
      contents: '  * { display: none }  '
    }
  }
  cleanCSS({ files: '*.css' })(files, null, function (errors) {
    t.error(errors)
    t.deepEqual(files['main.css'].contents, '*{display:none}')
    t.deepEqual(files['deep/path/main.css'].contents, '  * { display: none }  ')
  })
})

test('metalsmith-clean-css should correctly pass options to clean-css', function (t) {
  t.plan(2)
  var files = {
    'main.css': { contents: '/*! special comment */' }
  }
  cleanCSS({ cleanCSS: { keepSpecialComments: 0 } })(files, null, function (errors) {
    t.error(errors)
    t.deepEqual(files['main.css'].contents, '')
  })
})

test('metalsmith-clean-css should forward clean-css errors', function (t) {
  t.plan(2)
  var files = {
    'main.css': { contents: '@import url(https://not/found);' }
  }
  cleanCSS()(files, null, function (errors) {
    t.ok(Array.isArray(errors))
    t.deepEqual(errors.length, 1)
  })
})
