/**
 * Return form parameters
 * @returns {object|undefined}
 * @ignore
 */
function getFormParameters(form) {
  var formData = new FormData(form); // A révisier: provient du code de Christian Simeu (CEN-R)

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = formData.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var pair = _step.value;

      if (pair[1] === undefined) {
        formData.delete(pair[0]);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return formData.entries();
}