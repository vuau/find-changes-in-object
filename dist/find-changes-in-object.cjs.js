'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var isEqual = _interopDefault(require('lodash/isEqual'));
var isPlainObject = _interopDefault(require('lodash/isPlainObject'));
var transform = _interopDefault(require('lodash/transform'));

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
    return null;
  }

  var changes = {};
  Object.keys(origin).forEach(function (key) {
    if (origin[key] && updated[key] === undefined) {
      // key is removed
      changes[key] = null;
    }
  });
  return transform(updated, function (changes, value, key) {
    if (origin[key] === undefined && value) {
      // key is added
      changes[key] = value;
    } else if (!isEqual(value, origin[key])) {
      changes[key] = isPlainObject(value) && isPlainObject(origin[key]) ? findChangesInObject(origin[key], value) : value;
    }
  }, changes);
}

module.exports = findChangesInObject;
