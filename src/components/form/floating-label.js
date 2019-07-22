import { getElement, getElements,  removeClass, addClass } from '@dom/index.js';
import { isNullOrWhitespace, isUndefined } from '@datatype/index.js';

// Label as placeholder
export function floatingLabel(form) {
    const labels = getElements('.form-label', form);

    for (let i = 0; i < labels.length; i++) {
        let lbl = labels[i];
        if (lbl.dataset['type'] == 'placeholder' && !isNullOrWhitespace(lbl.htmlFor)) {
            let input = getElement(`#${lbl.htmlFor}`);

            if (isUndefined(input)) {
                throw new Error(`Missing input for label: ${lbl.htmlFor}`);
            }
            
            if (isNullOrWhitespace(input.placeholder)) {
                bindEvents(input, lbl);
                if (input.value.length === 0) {
                    addClass(lbl, 'down');
                }
            }
        }
    }

    // add counters
    var counters = getElements('[data-counter]', form);
    for (let i = 0; i < counters.length; i++) {
        let counter = counters[i];
        let input = getElement(`#${counter.dataset['counter']}`);
        counter.dataset['counterMax'] = input.maxLength;
        if (input) {
            counter.dataset['counterVal'] = input.value.length;
            input.addEventListener('input', function (e) {
                counter.dataset['counterVal'] = input.value.length;
            });
        }
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