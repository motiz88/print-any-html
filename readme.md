# print-any-html

**Let the browser print any HTML string.**

[![npm version](https://img.shields.io/npm/v/print-any-html.svg)](https://www.npmjs.com/package/print-any-html)
[![build status](https://img.shields.io/travis/derhuerst/print-any-html.svg)](https://travis-ci.org/derhuerst/print-any-html)
[![dependency status](https://img.shields.io/david/derhuerst/print-any-html.svg)](https://david-dm.org/derhuerst/print-any-html)
[![dev dependency status](https://img.shields.io/david/dev/derhuerst/print-any-html.svg)](https://david-dm.org/derhuerst/print-any-html#info=devDependencies)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/print-any-html.svg)


## Installing

Use the bundle from `build/print-any-html.min.js` or install using [npm](https://www.npmjs.com).

```shell
npm install print-any-html
```


## Usage

```
print(html, [callback], [delay])
```

`delay` is `20` ms by default.

```js
const print = require('print-any-html')

const html = `
	<!doctype html>
	<html>
	<head>
		<meta charset="utf-8"/>
		<style>
			p { text-transform: uppercase; }
		</style>
	</head>
	<body>
		<p>Hello World.</p>
	</body>
	</html>
`

print(html, () => {
	console.info('user has printed or aborted')
})
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/print-any-html/issues).
