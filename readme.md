# metalsmith-clean-css [![Build Status](https://travis-ci.org/aymericbeaumet/metalsmith-clean-css.svg?branch=master)](https://travis-ci.org/aymericbeaumet/metalsmith-clean-css)

> A Metalsmith plugin to minify CSS files via
> [clean-css](https://github.com/jakubpawlowicz/clean-css)

## Install

```sh
npm install --save metalsmith-clean-css clean-css
```

## Usage

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

#### cleanCSS

Type: `Object`
Default: `{}`

Allow you to directly manipulate the [clean-css
API](https://github.com/GoalSmashers/clean-css#how-to-use-clean-css-programmatically).
The configuration object will be passed as is.

#### files

Type: `String`
Default: `**/*.css`

This option defines which files are concerned by the minification. This string
is directly passed to [minimatch](https://github.com/isaacs/minimatch). Each
file matching the pattern will be minified in place using
[clean-css](https://github.com/jakubpawlowicz/clean-css).

#### sourceMap

Type: `Boolean`
Default: `false`

Whether the source maps should be kept after the minification. You can force to
inline the source maps (without creating an extra `.map` file in the build) by
setting `options.sourceMapInlineSources` to `true`.

This plugin supports the forwarding of existing source maps, it will first look
for a `sourceMap` property on the file, then for `.map` file, and finally
fallback to inline source maps.

#### sourceMapInlineSources

Type: `Boolean`
Default: `false`

Whether the source maps should be inlined in each CSS file. If set to `true` the
source maps will be inlined in each file, and no extra `.map` file will be
generated.
