import { getElement, getElements, removeClass, addClass } from "../../dom/index.js";
import { isNullOrWhitespace, isUndefined } from "../../datatype/index.js"; // Label as placeholder

export function floatingLabel(form) {
  var labels = getElements('.form-label', form);

  for (var i = 0; i < labels.length; i++) {
    var lbl = labels[i];

    if (lbl.dataset['type'] == 'placeholder' && !isNullOrWhitespace(lbl.htmlFor)) {
      var input = getElement("#".concat(lbl.htmlFor));

      if (isUndefined(input)) {
        throw new Error("Missing input for label: ".concat(lbl.htmlFor));
      }

      if (isNullOrWhitespace(input.placeholder)) {
        bindEvents(input, lbl);

        if (input.value.length === 0) {
          addClass(lbl, 'down');
        }
      }
    }
  } // add counters


  var counters = getElements('[data-counter]', form);

  var _loop = function _loop(_i) {
    var counter = counters[_i];
    var input = getElement("#".concat(counter.dataset['counter']));
    counter.dataset['counterMax'] = input.maxLength;

    if (input) {
      counter.dataset['counterVal'] = input.value.length;
      input.addEventListener('input', function (e) {
        counter.dataset['counterVal'] = input.value.length;
      });
    }
  };

  for (var _i = 0; _i < counters.length; _i++) {
    _loop(_i);
  }

  function bindEvents(input, lbl) {
    if (isNullOrWhitespace(input.placeholder)) {
      input.addEventListener('focus', function (e) {
        input.placeholder = "";
        removeClass(lbl, 'down');
        addClass(lbl.parentElement, 'focused');
      });
      input.addEventListener('blur', function (e) {
        if (input.value.length === 0) {
          addClass(lbl, 'down');
        }

        removeClass(lbl.parentElement, 'focused');
      });
    }
  }

  return labels;
}