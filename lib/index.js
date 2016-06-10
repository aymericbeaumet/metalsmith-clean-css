'use strict'

const CleanCSS = require('clean-css')
const async = require('async')
const minimatch = require('minimatch')

/**
 * A Metalsmith plugin to minify CSS files.
 * @param {Object} options
 * @param {String=} options.files - the pattern to match the CSS files to minify
 * @param {Object=} options.cleanCSS - the options to pass to clean-css
 * @return {Function} - the Metalsmith plugin
 */
module.exports = (options) => {
  options =
    typeof options === 'object' && options ? options
                                           : {}

  options.cleanCSS =
    typeof options.cleanCSS === 'object' && options.cleanCSS ? options.cleanCSS
                                                             : {}

  options.pattern =
    typeof options.files === 'string' ? options.files
                                      : '**/*.css'

  options.sourceMap =
    typeof options.sourceMap === 'boolean' ? options.sourceMap
                                           : false

  options.sourceMapInlineSources =
    typeof options.sourceMapInlineSources === 'boolean' ? options.sourceMapInlineSources
                                                        : false

  return (files, metalsmith, done) => {
    // Instanciate the clean-css engine (with potential source maps support)
    if (options.sourceMap) {
      options.cleanCSS.sourceMap = true
      options.cleanCSS.sourceMapInlineSources = options.sourceMapInlineSources
      options.cleanCSS.target = options.cleanCSS.target || metalsmith._directory
    }
    const cleanCSS = new CleanCSS(options.cleanCSS)
    // Loop over all the files metalsmith knows of
    async.each(Object.keys(files), (filepath, callback) => {
      const file = files[filepath]
      const sourceMapFilepath = `${filepath}.map`
      const sourceMapFile = files[sourceMapFilepath] || { contents: '' }
      // Check whether the current file is concerned by the minification
      if (!minimatch(filepath, options.pattern)) {
        return callback()
      }
      // Minify the file
      cleanCSS.minify({
        [filepath]: {
          styles: file.contents.toString(),
          sourceMap: file.sourceMap || sourceMapFile.contents.toString() || undefined
        }
      }, (error, minified) => {
        if (error) {
          return callback(error)
        }
        // Update the file contents with its minified version
        file.contents = new Buffer(minified.styles)
        // Deal with the source map
        if (options.sourceMap && minified.sourceMap) {
          // Expose the source map (so that it could be used by another plugin)
          file.sourceMap = sourceMapFile.contents = new Buffer(JSON.stringify(minified.sourceMap))
          // Expose the source map as a .map file if asked not to inline it
          if (!options.sourceMapInlineSources) {
            files[sourceMapFilepath] = sourceMapFile
          }
        }
        return callback()
      })
    }, done)
  }
}
