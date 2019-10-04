import { getElement, getElements, isHTMLElement } from '@dom/index.js';

/**
 * Add a counter to an input element
 * @param {HTMLElement} container 
 */
export function inputCounter(container) {
    const counters = getElements('[data-counter]', container);

    for (let i = 0; i < counters.length; i++) {
        let counter = counters[i];
        let ref = counter.dataset['counter'];
        let input = getElement(`#${ref}`);
        if (isHTMLElement(input)) {
            counter.dataset['counterMax'] = input.maxLength;
            counter.dataset['counterVal'] = input.value.length;
            input.addEventListener('input', function (e) {
                counter.dataset['counterVal'] = input.value.length;
            });
        } else{
            console.error(`Failed to add counter ${ref}: Input (referenced) was not found`);
        }
    }

    return counters;
}