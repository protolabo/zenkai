import { getElement, getElements, isHTMLElement } from '@utils/dom/index.js';
import { isFunction, isString, isNullOrUndefined, isEmpty } from '@utils/datatype/index.js';
import { HTMLAttribute } from './global.js';
import { getInput } from "./utils.js";

const ATTRIBUTE = 'selector';

const NONE = -1;

const Status = {
    ON: 'on',
    OFF: 'off'
};

const toData = (name) => `[data-type=${name}]`;

const isSelector = (element) => element.dataset['type'] === ATTRIBUTE;

export function Selector(container, callback) {
    const selectors = getSelectors(container);

    if (selectors === NONE) {
        return null;
    }

    for (let i = 0, len = selectors.length; i < len; i++) {
        activate(selectors[i], callback);
    }

    return selectors;
}

function getSelectors(container) {
    if (isHTMLElement(container)) {
        return isSelector(container) ? [container] : getElements(toData(ATTRIBUTE), container);
    } else if (isString(container) && !isEmpty(container)) {
        let _container = getElement(container);
        return isNullOrUndefined(_container) ? NONE : getSelectors(_container);
    } else if (isNullOrUndefined(container)) {
        return getElements(toData(ATTRIBUTE));
    }

    return NONE;
}


function activate(selector, callback) {
    var current = null;
    var selectorItems = getElements('[data-selector]', selector);
    for (let i = 0, len = selectorItems.length; i < len; i++) {
        let item = selectorItems[i];
        let input = getInput('radio', item);
        item.dataset[HTMLAttribute.CHECKED] = input.checked ? Status.ON : Status.OFF;
        if (input.checked) {
            current = item;
        }
        input.addEventListener('change', function (e) {
            if (current) {
                current.dataset[HTMLAttribute.CHECKED] = Status.OFF;
            }
            item.dataset[HTMLAttribute.CHECKED] = input.checked ? Status.ON : Status.OFF;
            current = item;
            if (isFunction(callback)) {
                callback(input.value);
            }
        });
    }
}