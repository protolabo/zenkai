import { getElement, getElements, removeClass, addClass } from '@dom/index.js';
import { isNullOrWhitespace, isUndefined, isEmpty } from '@datatype/index.js';

// Label as placeholder
export function floatingLabel(form) {
    const labels = getElements('.form-label', form);

    for (let i = 0; i < labels.length; i++) {
        let label = labels[i];
        if (label.dataset['type'] == 'placeholder' && !isNullOrWhitespace(label.htmlFor)) {
            let input = getElement(`#${label.htmlFor}`);

            if (isUndefined(input)) {
                throw new Error(`Missing input for label: ${label.htmlFor}`);
            }

            if (isNullOrWhitespace(input.placeholder)) {
                bindEvents(input, label);
                if (input.value.length === 0) {
                    addClass(label, 'down');
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


    /**
     * 
     * @param {HTMLInputElement} input 
     * @param {HTMLLabelElement} label 
     */
    function bindEvents(input, label) {
        if (isNullOrWhitespace(input.placeholder)) {
            input.addEventListener('focus', function (e) {
                input.placeholder = "";
                removeClass(label, 'down');
                addClass(label.parentElement, 'focused');
            });
            input.addEventListener('blur', function (e) {
                if (isEmpty(this.value)) {
                    addClass(label, 'down');
                }
                removeClass(label.parentElement, 'focused');
            });
            input.addEventListener('input', function (e) {
                // check if input does not have focus
                if (document.activeElement != input) {
                    if (isEmpty(this.value)) {
                        addClass(label, 'down');
                    } else {
                        removeClass(label, 'down');
                    }
                }
            });
        }
    }

    return labels;
}