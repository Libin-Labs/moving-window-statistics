import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('emits all complete windows', () => {
  assert.equal(api.movingWindowStats([1, 2, 3, 4], 2).length, 3);
});
test('calculates window means', () => {
  assert.deepEqual(
    api.movingWindowStats([1, 2, 3], 2).map((x) => x.mean),
    [1.5, 2.5],
  );
});
test('uses population variance', () => {
  assert.equal(api.movingWindowStats([1, 3], 2)[0].variance, 1);
});
test('tracks start and exclusive end indices', () => {
  assert.deepEqual(
    api.movingWindowStats([2, 4, 6], 2).map((x) => [x.start, x.end]),
    [
      [0, 2],
      [1, 3],
    ],
  );
});
test('constant window has zero variance', () => {
  assert.equal(api.movingWindowStats([5, 5, 5], 3)[0].variance, 0);
});
test('rejects window larger than series', () => {
  assert.throws(() => api.movingWindowStats([1, 2], 3), RangeError);
});
