import { getElement, getElements, isHTMLElement } from '@utils/dom/index.js';
import { isFunction, isString, isNullOrUndefined, isEmpty } from '@utils/datatype/index.js';
import { HTMLAttribute } from './global.js';
import { getInput } from "./utils.js";

const ATTRIBUTE = 'slider';

const NONE = -1;

const Status = {
    ON: 'on',
    OFF: 'off'
};

const toData = (name) => `[data-type=${name}]`;

const isSlider = (element) => element.dataset['type'] === ATTRIBUTE;

export function Slider(container, callback) {
    const sliders = getSliders(container);

    if (sliders === NONE) {
        return null;
    }

    for (let i = 0, len = sliders.length; i < len; i++) {
        activate(sliders[i], callback);
    }

    return sliders;
}

function getSliders(container) {
    if (isHTMLElement(container)) {
        return isSlider(container) ? [container] : getElements(toData(ATTRIBUTE), container);
    } else if (isString(container) && !isEmpty(container)) {
        let _container = getElement(container);
        return isNullOrUndefined(_container) ? NONE : getSliders(_container);
    } else if (isNullOrUndefined(container)) {
        return getElements(toData(ATTRIBUTE));
    }

    return NONE;
}


function activate(slider, callback) {
    var input = getInput('checkbox', slider);
    slider.dataset[HTMLAttribute.CHECKED] = input.checked ? Status.ON : Status.OFF;
    input.addEventListener('change', function (e) {
        slider.dataset[HTMLAttribute.CHECKED] = input.checked ? Status.ON : Status.OFF;
        if (isFunction(callback)) {
            callback(input.value);
        }
    });
}