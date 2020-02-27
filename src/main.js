import isEqual from 'lodash/isEqual'
import isPlainObject from 'lodash/isPlainObject'
import transform from 'lodash/transform'

/**
 * Compare two objects and and return changes
 * @param  {Object} original object
 * @param  {Object} updated object
 * @return {Object} changes
 */

function findChangesInObject (origin, updated) {
  if (
    origin == null ||
    typeof origin !== 'object' ||
    updated == null ||
    typeof updated !== 'object'
  ) {
    return {}
  }
  const changes = {}
  Object.keys(origin).forEach(key => {
    if (updated[key] === undefined) {
      // key is removed
      changes[key] = null
    }
  })
  return transform(
    updated,
    (changes, value, key) => {
      if (origin[key] === undefined) {
        // key is added
        changes[key] = value
      } else if (!isEqual(value, origin[key])) {
        changes[key] =
          isPlainObject(value) && isPlainObject(origin[key])
            ? findChangesInObject(origin[key], value)
            : value
      }
    },
    changes
  )
}

export default findChangesInObject
