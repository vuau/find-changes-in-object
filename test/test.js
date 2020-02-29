/* eslint-disable */
const expect = require('chai').expect
const findChangesInObject = require('..')

describe('Find changes in objects', function() {
  it('return null if inputs are invalid', function() {
    expect(findChangesInObject(null, null)).to.be.null
    expect(findChangesInObject(null, {})).to.be.null
    expect(findChangesInObject({}, null)).to.be.null
  })
  it('return {} if inputs are equal', function() {
    expect(findChangesInObject({}, {})).to.deep.equal({})
  })
  it('return changes when adding props', function() {
    expect(findChangesInObject({}, { a: 1 }), 'number').to.deep.equal({
      a: 1
    })
    expect(findChangesInObject({}, { a: [1, 2, 3] }), 'array').to.deep.equal({
      a: [1, 2, 3]
    })
    expect(findChangesInObject({}, { a: { b: 1 } }), 'object').to.deep.equal({
      a: { b: 1 }
    })
  })
  it('return changes when removing props', function() {
    expect(findChangesInObject({ a: 1 }, {}), 'number').to.deep.equal({
      a: null
    })
    expect(findChangesInObject({ a: [1, 2, 3] }, {}), 'array').to.deep.equal({
      a: null
    })
    expect(
      findChangesInObject({ a: { b: 1 } }, { a: {} }),
      'object'
    ).to.deep.equal({
      a: { b: null }
    })
  })
  it('return changes when updating props', function() {
    expect(findChangesInObject({ a: 1 }, { a: 2 }), 'number').to.deep.equal({
      a: 2
    })
    expect(
      findChangesInObject({ a: [1, 2, 3] }, { a: [4] }),
      'array'
    ).to.deep.equal({
      a: [4]
    })
    expect(
      findChangesInObject({ a: { b: 1 } }, { a: { b: 2 } }),
      'object'
    ).to.deep.equal({
      a: { b: 2 }
    })
    expect(
      findChangesInObject({ a: [{ b1: 1 }, { b2: 2 }] }, { a: [{ b3: 3 }] }),
      'array of object'
    ).to.deep.equal({
      a: [{ b3: 3 }]
    })
  })
})
