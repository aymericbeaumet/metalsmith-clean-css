'use strict'

var CleanCSS = require('clean-css')
var async = require('async')
var minimatch = require('minimatch')

/**
 * A Metalsmith plugin to concatenate and minify CSS files.
 */
module.exports = function plugin (options) {
  options = typeof options === 'undefined' ? {} : options
  options.files = typeof options.files === 'undefined' ? '**/*.css' : options.files
  options.cleanCSS = typeof options.cleanCSS === 'undefined' ? {} : options.cleanCSS
  var cleanCSS = new CleanCSS(options.cleanCSS)

  /**
   *
   * @param {Object} files
   * @param {Metalsmith} metalsmith
   * @param {Function} done
   */
  return function (files, metalsmith, done) {
    async.each(Object.keys(files), function (filename, callback) {
      if (!minimatch(filename, options.files)) {
        return callback()
      }
      cleanCSS.minify(files[filename].contents, function (error, minified) {
        if (error) {
          return callback(error)
        }
        files[filename].contents = minified.styles
        return callback()
      })
    }, done)
  }
}
