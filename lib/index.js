'use strict';

var CleanCSS = require('clean-css');
var minimatch = require('minimatch');

/**
 * A Metalsmith plugin to concatenate and minify CSS files.
 */
module.exports = function plugin(options) {
  options = options || {};
  options.files = (typeof options.files === 'string') ? options.files : '**/*.css';
  options.cleanCSS = options.cleanCSS || {};
  var cleanCSS = new CleanCSS(options.cleanCSS);

  /**
   *
   * @param {Object} files
   * @param {Metalsmith} metalsmith
   * @param {Function} done
   */
  return function(files, metalsmith, done) {
    Object.keys(files).forEach(function(filename) {
      if (!minimatch(filename, options.files)) { return; }

      files[filename].contents = cleanCSS.minify(files[filename].contents).styles;
    });

    return done();
  };
};
