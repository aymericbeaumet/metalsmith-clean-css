# metalsmith-clean-css [![Build Status](https://img.shields.io/travis/aymericbeaumet/metalsmith-clean-css.svg?style=flat)](https://travis-ci.org/aymericbeaumet/metalsmith-clean-css) [![NPM version](https://img.shields.io/npm/v/metalsmith-clean-css.svg?style=flat)](https://www.npmjs.com/package/metalsmith-clean-css)

A Metalsmith plugin to minify CSS files using
[clean-css](https://github.com/GoalSmashers/clean-css).

## Installation

```javascript
$ npm install metalsmith-clean-css
```

## Usage

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
  .build()
;
```

#### files
Type: `String`
Default: `**/*.css`

This option defines which files are concerned by the minification. This string
is directly passed to [minimatch](https://github.com/isaacs/minimatch). Each
file matching the pattern will be minified using
[Clean-css](https://github.com/jakubpawlowicz/clean-css).

#### cleanCSS
Type: `Object`
Default: `{}`

Allow you to directly manipulate the [Clean-css
API](https://github.com/GoalSmashers/clean-css#how-to-use-clean-css-programmatically).
The configuration object will be passed as is.

## Changelog

* 2.0.0
  * Update Clean-css

* 1.0.0
  * Bump stable

* 0.0.3
  * Fix an issue with file content

* 0.0.2
  * Fix the example

* 0.0.1
  * Working plugin

## License

MIT © [Aymeric Beaumet](http://beaumet.me)
