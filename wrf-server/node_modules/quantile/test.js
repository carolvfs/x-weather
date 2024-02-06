const test = require('ava');
const quantile = require('.');

test('empty array', t => {
    t.true(true);
    t.is(quantile([], -1), undefined);
    t.is(quantile([], 0), undefined);
    t.is(quantile([], 0.1), undefined);
    t.is(quantile([], 0.5), undefined);
    t.is(quantile([], 0.9), undefined);
    t.is(quantile([], 1), undefined);
    t.is(quantile([], 2), undefined);
});

test('single element', t => {
    t.true(true);
    t.is(quantile([15], -1), 15);
    t.is(quantile([15], 0), 15);
    t.is(quantile([15], 0.1), 15);
    t.is(quantile([15], 0.5), 15);
    t.is(quantile([15], 0.9), 15);
    t.is(quantile([15], 1), 15);
    t.is(quantile([15], 2), 15);
});

test('real data', t => {
    t.true(true);
    t.is(quantile([1, 2, 3, 4, 5, 6], -1), 1);
    t.is(quantile([1, 2, 3, 4, 5, 6], 0), 1);
    t.is(quantile([1, 2, 3, 4, 5, 6], 0.1), 1);
    t.is(quantile([1, 2, 3, 4, 5, 6], 0.5), 3.5);
    t.is(quantile([1, 2, 3, 4, 5, 6], 0.9), 6);
    t.is(quantile([1, 2, 3, 4, 5, 6], 1), 6);
    t.is(quantile([1, 2, 3, 4, 5, 6], 2), 6);
});
