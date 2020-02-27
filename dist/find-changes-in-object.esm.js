import isEqual from 'lodash/isEqual';
import isPlainObject from 'lodash/isPlainObject';
import transform from 'lodash/transform';

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

/**
 * Compare two objects and and return changes
 * @param  {Object} original object
 * @param  {Object} updated object
 * @return {Object} changes
 */

function findChangesInObject(origin, updated) {
  if (origin == null || _typeof(origin) !== 'object' || updated == null || _typeof(updated) !== 'object') {
    return {};
  }

  var changes = {};
  Object.keys(origin).forEach(function (key) {
    if (updated[key] === undefined) {
      // key is removed
      changes[key] = null;
    }
  });
  return transform(updated, function (changes, value, key) {
    if (origin[key] === undefined) {
      // key is added
      changes[key] = value;
    } else if (!isEqual(value, origin[key])) {
      changes[key] = isPlainObject(value) && isPlainObject(origin[key]) ? findChangesInObject(origin[key], value) : value;
    }
  }, changes);
}

export default findChangesInObject;
