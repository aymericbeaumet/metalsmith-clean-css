'use strict'

const cleanCSS = require('..')
const path = require('path')
const test = require('ava')

test.cb('metalsmith-clean-css should not match any file if an empty string is given', (t) => {
  t.plan(2)
  const files = {
    'main.css': {
      contents: new Buffer('  * { display: none }  ')
    }
  }
  cleanCSS({ files: '' })(files, metalsmithFixture(), (errors) => {
    t.ifError(errors)
    t.deepEqual(files, {
      'main.css': {
        contents: new Buffer('  * { display: none }  ')
      }
    })
    t.end()
  })
})

test.cb('metalsmith-clean-css should match any CSS file with the default pattern', (t) => {
  t.plan(2)
  const files = {
    'main.css': {
      contents: new Buffer('  * { display: none }  ')
    },
    'deep/path/main.css': {
      contents: new Buffer('  * { display: none }  ')
    }
  }
  cleanCSS()(files, metalsmithFixture(), (errors) => {
    t.ifError(errors)
    t.deepEqual(files, {
      'main.css': {
        contents: new Buffer('*{display:none}')
      },
      'deep/path/main.css': {
        contents: new Buffer('*{display:none}')
      }
    })
    t.end()
  })
})

test.cb('metalsmith-clean-css should only match the desired CSS files if a pattern is given', (t) => {
  t.plan(2)
  const files = {
    'main.css': {
      contents: new Buffer('  * { display: none }  ')
    },
    'deep/path/main.css': {
      contents: new Buffer('  * { display: none }  ')
    }
  }
  cleanCSS({ files: '*.css' })(files, metalsmithFixture(), (errors) => {
    t.ifError(errors)
    t.deepEqual(files, {
      'main.css': {
        contents: new Buffer('*{display:none}')
      },
      'deep/path/main.css': {
        contents: new Buffer('  * { display: none }  ')
      }
    })
    t.end()
  })
})

test.cb('metalsmith-clean-css should correctly pass options to clean-css', (t) => {
  t.plan(2)
  const files = {
    'main.css': { contents: new Buffer('/*! special comment */') }
  }
  cleanCSS({ cleanCSS: { keepSpecialComments: 0 } })(files, metalsmithFixture(), (errors) => {
    t.ifError(errors)
    t.deepEqual(files, {
      'main.css': {
        contents: new Buffer('')
      }
    })
    t.end()
  })
})

test.cb('metalsmith-clean-css should forward clean-css errors', (t) => {
  t.plan(2)
  const files = {
    'main.css': { contents: new Buffer('@import url(https://not/found);') }
  }
  cleanCSS()(files, metalsmithFixture(), (errors) => {
    t.true(Array.isArray(errors))
    t.deepEqual(errors.length, 1)
    t.end()
  })
})

test.cb('metalsmith-clean-css should not generate source maps by default', (t) => {
  t.plan(3)
  const files = {
    'main.css': { contents: new Buffer(' * { display: none } ') }
  }
  cleanCSS({})(files, metalsmithFixture(), (errors) => {
    t.ifError(errors)
    t.false(!!files['main.css'].sourceMap)
    t.deepEqual(Object.keys(files), ['main.css'])
    t.end()
  })
})

test.cb('metalsmith-clean-css should expose both a `sourceMap` property and a `.map` file', (t) => {
  t.plan(3)
  const files = {
    'main.css': { contents: new Buffer(' * { display: none } ') }
  }
  cleanCSS({ sourceMap: true })(files, metalsmithFixture(), (errors) => {
    t.ifError(errors)
    t.true(!!files['main.css'].sourceMap)
    t.deepEqual(Object.keys(files), ['main.css', 'main.css.map'])
    t.end()
  })
})

test.cb('metalsmith-clean-css should not expose a .map when `options.sourceMapInlineSources` is set', (t) => {
  t.plan(3)
  const files = {
    'main.css': { contents: new Buffer(' * { display: none } ') }
  }
  cleanCSS({ sourceMap: true, sourceMapInlineSources: true })(files, metalsmithFixture(), (errors) => {
    t.ifError(errors)
    t.true(!!files['main.css'].sourceMap)
    t.deepEqual(Object.keys(files), ['main.css'])
    t.end()
  })
})

function metalsmithFixture () {
  return {
    _directory: path.resolve(__dirname, 'fixture')
  }
}
