'use strict'

const cleanCSS = require('..')
const test = require('ava')

test.cb('metalsmith-clean-css should not match any file if an empty string is given', (t) => {
  t.plan(2)
  const files = {
    'main.css': {
      contents: '  * { display: none }  '
    }
  }
  cleanCSS({ files: '' })(files, null, (errors) => {
    t.ifError(errors)
    t.same(files['main.css'].contents, '  * { display: none }  ')
    t.end()
  })
})

test.cb('metalsmith-clean-css should match any CSS file with the default pattern', (t) => {
  const files = {
    'main.css': {
      contents: '  * { display: none }  '
    },
    'deep/path/main.css': {
      contents: '  * { display: none }  '
    }
  }
  t.plan(1 + Object.keys(files).length)
  cleanCSS()(files, null, (errors) => {
    t.ifError(errors)
    Object.keys(files).forEach((filename) => {
      t.same(files[filename].contents, '*{display:none}')
    })
    t.end()
  })
})

test.cb('metalsmith-clean-css should only match the desired CSS files if a pattern is given', (t) => {
  t.plan(3)
  const files = {
    'main.css': {
      contents: '  * { display: none }  '
    },
    'deep/path/main.css': {
      contents: '  * { display: none }  '
    }
  }
  cleanCSS({ files: '*.css' })(files, null, (errors) => {
    t.ifError(errors)
    t.same(files['main.css'].contents, '*{display:none}')
    t.same(files['deep/path/main.css'].contents, '  * { display: none }  ')
    t.end()
  })
})

test.cb('metalsmith-clean-css should correctly pass options to clean-css', (t) => {
  t.plan(2)
  const files = {
    'main.css': { contents: '/*! special comment */' }
  }
  cleanCSS({ cleanCSS: { keepSpecialComments: 0 } })(files, null, (errors) => {
    t.ifError(errors)
    t.same(files['main.css'].contents, '')
    t.end()
  })
})

test.cb('metalsmith-clean-css should forward clean-css errors', (t) => {
  t.plan(2)
  const files = {
    'main.css': { contents: '@import url(https://not/found);' }
  }
  cleanCSS()(files, null, (errors) => {
    t.ok(Array.isArray(errors))
    t.same(errors.length, 1)
    t.end()
  })
})
