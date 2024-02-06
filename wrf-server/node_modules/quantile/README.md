# quantile

Computes a [quantile](https://en.wikipedia.org/wiki/Quantile) for sorted array of numbers. Don't do anything else. Extremely easy.

[![Build Status][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]

## Install

```bash
npm i quantile
```

## Usage

```js
quantile(sortedArray, probability);
```

`quantile` does not check if array is sorted, if it contains only numbers or if `0 <= probability >= 1`. Use correct params.

## Example

```js
const quantile = require('quantile');

console.log(quantile([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 0.9));

```

## License

MIT

[npm-url]: https://npmjs.org/package/quantile
[npm-image]: https://badge.fury.io/js/quantile.svg
[travis-url]: https://travis-ci.org/astur/quantile
[travis-image]: https://travis-ci.org/astur/quantile.svg?branch=master