import without from 'lodash/without'
import intersection from 'lodash/intersection'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import isPlainObject from 'lodash/isPlainObject'

/**
 * Compare two objects and and return changes
 * @param  {Object} first object
 * @param  {Object} second object
 * @return {Object} changes
 */

function findChangesInObject (a, b) {
  if (a == null || typeof a !== 'object' || b == null || typeof b !== 'object') {
    return {}
  }
  const keysA = Object.keys(a)
  const keysB = Object.keys(b)
  const keysBNotInA = without(keysB, ...keysA)
  const keysANotInB = without(keysA, ...keysB)
  const keysInBoth = intersection(keysA, keysB)

  const keysAdded = {}
  for (const key of keysBNotInA) {
    keysAdded[key] = b[key]
  }

  const keysRemoved = {}
  for (const key of keysANotInB) {
    keysRemoved[key] = null
  }

  const keysUpdated = {}
  for (const key of keysInBoth) {
    if (typeof a[key] !== typeof b[key]) {
      keysUpdated[key] = b[key]
    } else if (isPlainObject(a[key])) {
      const changes = findChangesInObject(a[key], b[key])
      if (!isEmpty(changes)) {
        keysUpdated[key] = changes
      }
    } else if (!isEqual(a[key], b[key])) {
      keysUpdated[key] = b[key]
    }
  }

  return {
    ...keysAdded,
    ...keysRemoved,
    ...keysUpdated
  }
}

export default findChangesInObject
