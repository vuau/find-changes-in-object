const assert = require('assert')
const getChanges = require('..')

function test (casename, { actual, expected }) {
  assert.deepEqual(actual, expected)
  console.log(`\u001B[32m✓\u001B[39m ${casename}`)
}

test('remove and add prop', {
  actual: getChanges({ a: 1 }, { b: 2 }),
  expected: { a: null, b: 2 }
})

test('change prop', {
  actual: getChanges({ a: 1 }, { a: 2 }),
  expected: { a: 2 }
})

test('prop is array', {
  actual: getChanges({ a: [{ b: 1 }, { c: 2 }] }, { a: [{ b: 1 }, { c: 3 }] }),
  expected: {
    a: [{ b: 1 }, { c: 3 }]
  }
})

test('prop is array of objects', {
  actual: getChanges({ a: [{ b: 1 }, { c: 2 }] }, { a: [{ b: 1 }, { c: 3 }] }),
  expected: {
    a: [{ b: 1 }, { c: 3 }]
  }
})

test('prop is multi dimension array', {
  actual: getChanges(
    {
      a: [
        [1, 2],
        [3, 4]
      ]
    },
    { a: [[5, 6]], b: [7], c: 8 }
  ),
  expected: { a: [[5, 6]], b: [7], c: 8 }
})

test('prop is object', {
  actual: getChanges({ a: {} }, { a: {} }),
  expected: {}
})

test('prop is multi level object', {
  actual: getChanges(
    { a: { b: { c: null }, d: 'this text not changed' } },
    { a: { b: { c: [1, 2, 3] }, d: 'this text not changed' } }
  ),
  expected: { a: { b: { c: [1, 2, 3] } } }
})

test('edge case: null, null ', {
  actual: getChanges(null, null),
  expected: {}
})

test('edge case: null, {} ', {
  actual: getChanges(null, {}),
  expected: {}
})

test('edge case: {}, {} ', {
  actual: getChanges({}, {}),
  expected: {}
})
