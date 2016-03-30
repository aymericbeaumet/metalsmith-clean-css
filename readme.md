[![NPM version](https://img.shields.io/npm/v/metalsmith-clean-css.svg?style=flat&label=npm)](https://www.npmjs.com/package/metalsmith-clean-css)
[![Linux build status](https://img.shields.io/travis/aymericbeaumet/metalsmith-clean-css/master.svg?style=flat&label=linux)](https://travis-ci.org/aymericbeaumet/metalsmith-clean-css)
[![Windows build status](https://img.shields.io/appveyor/ci/aymericbeaumet/metalsmith-clean-css/master.svg?style=flat&label=windows)](https://ci.appveyor.com/project/aymericbeaumet/metalsmith-clean-css)
[![Code coverage](https://img.shields.io/codeclimate/coverage/github/aymericbeaumet/metalsmith-clean-css.svg?style=flat&label=coverage)](https://codeclimate.com/github/aymericbeaumet/metalsmith-clean-css)
[![GPA](https://img.shields.io/codeclimate/github/aymericbeaumet/metalsmith-clean-css.svg?style=flat&label=GPA)](https://codeclimate.com/github/aymericbeaumet/metalsmith-clean-css)
[![Dependencies status](https://img.shields.io/david/aymericbeaumet/metalsmith-clean-css.svg?style=flat&label=dependencies)](https://david-dm.org/aymericbeaumet/metalsmith-clean-css)

# metalsmith-clean-css

A Metalsmith plugin to minify CSS files.

## Installation

```javascript
$ npm install metalsmith-clean-css
```

## Usage

This plugin relies on [clean-css](https://github.com/jakubpawlowicz/clean-css).

### CLI

```javascript
{
  "plugins": {
    "metalsmith-clean-css": {
      "files": "src/**/*.css"
    }
  }
}
```

### JavaScript

```javascript
var MetalSmith = require('metalsmith');
var cleanCSS = require('metalsmith-clean-css');

Metalsmith(__dirname)
  .use(cleanCSS({
    files: 'src/**/*.css',
    cleanCSS: {
      rebase: true
    }
  }))
;
```

#### files
Type: `String`
Default: `**/*.css`

This option defines which files are concerned by the minification. This string
is directly passed to [minimatch](https://github.com/isaacs/minimatch). Each
file matching the pattern will be minified in place using
[clean-css](https://github.com/jakubpawlowicz/clean-css).

#### cleanCSS
Type: `Object`
Default: `{}`

Allow you to directly manipulate the [clean-css
API](https://github.com/GoalSmashers/clean-css#how-to-use-clean-css-programmatically).
The configuration object will be passed as is.

## Changelog

* 3.0.0
  * Add AppVeyor
  * Add EditorConfig
  * Change license
  * Switch to standard coding style
  * 100% code coverage
  * Fix dependencies with shrinkwrap
  * Bump dependencies
  * Switch test engine to tape

* 2.0.0
  * Update clean-css

* 1.0.0
  * Bump stable

* 0.0.3
  * Fix an issue with file content

* 0.0.2
  * Fix the example

* 0.0.1
  * Working plugin

## License

[![CC0](http://i.creativecommons.org/p/zero/1.0/88x31.png)](http://creativecommons.org/publicdomain/zero/1.0/)

To the extent possible under law, [Aymeric Beaumet](https://aymericbeaumet.com)
has waived all copyright and related or neighboring rights to this work.
