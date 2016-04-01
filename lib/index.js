'use strict'

var CleanCSS = require('clean-css')
var async = require('async')
var minimatch = require('minimatch')

/**
 * A Metalsmith plugin to minify CSS files.
 * @param {Object} options
 * @param {String=} options.files - the pattern to match the CSS files to minify
 * @param {Object=} options.cleanCSS - the options to pass to clean-css
 * @return {Function} - the Metalsmith plugin
 */
module.exports = function plugin (options) {
  options =
    typeof options === 'object' && options ? options
                                           : {}

  options.files =
    typeof options.files === 'string' ? options.files
                                      : '**/*.css'

  options.cleanCSS =
    typeof options.cleanCSS === 'object' && options.cleanCSS ? options.cleanCSS
                                                             : {}

  var cleanCSS = new CleanCSS(options.cleanCSS)

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
