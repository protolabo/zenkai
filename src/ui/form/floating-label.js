import { getElement, getElements, isHTMLElement } from '@dom/index.js';
import { isNullOrWhitespace, isEmpty } from '@std/index.js';


/**
 * Update class related to the action *move label down*
 * @param {HTMLElement} label 
 */
const moveDown = (label) => label.classList.add('down');

/**
 * Update class related to the action *move label up*
 * @param {HTMLElement} label 
 */
const moveUp = (label) => label.classList.remove('down');

/**
 * Update class related to the action *add focus to element*
 * @param {HTMLElement} element 
 */
const addFocus = (element) => element.classList.add('focused');

/**
 * Update class related to the action *remove focus from element*
 * @param {HTMLElement} element 
 */
const removeFocus = (element) => element.classList.remove('focused');

/**
 * Activate floating label in given scope
 * @param {HTMLElement} form 
 */
export function floatingLabel(form) {
    const labels = getElements('.form-label', form);

    for (let i = 0; i < labels.length; i++) {
        let label = labels[i];
        if (label.dataset['type'] == 'placeholder' && !isNullOrWhitespace(label.htmlFor)) {
            let input = getElement(`#${label.htmlFor}`);

            if (isHTMLElement(input)) {
                if (isNullOrWhitespace(input.placeholder)) {
                    bindEvents(input, label);
                    if (isEmpty(input.value)) {
                        moveDown(label);
                    }
                } else {
                    console.warn(`%c@zenkai%c #FloatingLabel>%cfloatingLabel:%c Input "${label.htmlFor}" contains a placeholder`, "text-decoration: underline", "", "font-weight: bold;", "font-weight: normal;");
                }
            } else {
                console.error(`%c@zenkai%c #FloatingLabel>%cfloatingLabel:%c Missing input for label "${label.htmlFor}"`, "text-decoration: underline", "", "font-weight: bold;", "font-weight: normal;");
            }
        }
    }

    /**
     * Bind DOM events
     * @param {HTMLInputElement} input 
     * @param {HTMLLabelElement} label 
     */
    function bindEvents(input, label) {
        if (isNullOrWhitespace(input.placeholder)) {
            input.addEventListener('focus', function (e) {
                input.placeholder = "";
                moveUp(label);
                addFocus(label.parentElement);
            });

            input.addEventListener('blur', function (e) {
                if (isEmpty(this.value)) {
                    moveDown(label);
                }
                removeFocus(label.parentElement);
            });
            
            input.addEventListener('input', function (e) {
                // check if input does not have focus
                if (document.activeElement != input) {
                    if (isEmpty(this.value)) {
                        moveDown(label);
                    } else {
                        moveUp(label);
                    }
                }
            });
        }
    }

    return labels;
}