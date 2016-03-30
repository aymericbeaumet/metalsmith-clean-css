'use strict'

var Metalsmith = require('metalsmith')
var cleanCSS = require('..') // require('metalsmith-clean-css')

Metalsmith(__dirname)
  .use(cleanCSS())
  .build(function (error) { if (error) { throw error } })
