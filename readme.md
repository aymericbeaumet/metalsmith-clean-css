# metalsmith-clean-css [![Build Status](https://travis-ci.org/aymericbeaumet/metalsmith-clean-css.svg?branch=master)](https://travis-ci.org/aymericbeaumet/metalsmith-clean-css)

> A Metalsmith plugin to minify CSS files

## Install

```sh
npm install --save metalsmith-clean-css clean-css
```

## Usage

This plugin allows you to minify your CSS files by leveraging
[clean-css](https://github.com/jakubpawlowicz/clean-css).

### CLI

**metalsmith.json**

```json
{
  "plugins": {
    "metalsmith-clean-css": {
      "files": "src/**/*.css"
    }
  }
}
```

### API

```js
var metalsmith = require('metalsmith')
var metalsmithCleanCss = require('metalsmith-clean-css')

metalsmith(__dirname).use(
  metalsmithCleanCss({
    files: 'src/**/*.css',
    cleanCSS: {
      rebase: true,
    },
  })
)
```

**metalsmithCleanCss(options)**

#### options

Type: `Object`
Default: `{}`

#### options.cleanCSS

Type: `Object`
Default: `{}`

Allow you to directly manipulate the [clean-css
API](https://github.com/jakubpawlowicz/clean-css#constructor-options). The
configuration object will be passed as is.

#### options.files

Type: `string`
Default: `**/*.css`

This option defines which files are concerned by the minification. This
string is directly passed to
[minimatch](https://github.com/isaacs/minimatch). Each file matching the
pattern will be minified in place using
[clean-css](https://github.com/jakubpawlowicz/clean-css).

#### options.sourceMap

Type: `boolean`
Default: `false`

Whether the source maps should be kept after the minification. You can force
to inline the source maps (without creating an extra `.map` file in the
build) by setting `options.sourceMapInlineSources` to `true`.

This plugin supports the forwarding of existing source maps, it will first
look for a `sourceMap` property on the file, then for `.map` file, and
finally fallback to inline source maps.

#### options.sourceMapInlineSources

Type: `boolean`
Default: `false`

Whether the source maps should be inlined in each CSS file. If set to `true`
the source maps will be inlined in each file, and no extra `.map` file will
be generated.
