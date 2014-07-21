'use strict';

var Metalsmith = require('metalsmith');
var cleanCSS = require('../lib'); // require('metalsmith-clean-css');

Metalsmith(__dirname)
  .use(cleanCSS())
  .build(function(err) { if (err) { throw err; } })
;
