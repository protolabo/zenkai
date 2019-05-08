import {getElements} from '@utils/dom/index.js';
import { isFunction } from '@utils/datatype/index.js';
import { HTMLAttribute } from './global.js';
import { getInput } from "./utils.js";

const Status = {
    ON: 'on',
    OFF: 'off'
};

function isSelector(el) {
    return el.dataset['type'] == 'selector';
}

export function Selector(form, callback) {
    const labels = getElements('.form-label', form);
    var current = null;

    for (let i = 0, len = labels.length; i < len; i++) {
        let lbl = labels[i];

        if (isSelector(lbl)) {
            let input = getInput('radio', lbl);
            lbl.dataset[HTMLAttribute.CHECKED] = input.checked ? Status.ON : Status.OFF;
            input.addEventListener('click', function (e) {
                if (current) {
                    current.dataset[HTMLAttribute.CHECKED] = Status.OFF;
                }
                lbl.dataset[HTMLAttribute.CHECKED] = input.checked ? Status.ON : Status.OFF;
                current = lbl;

                notify(input.value);
            });

            if (input.checked) {
                current = lbl;
                notify(input.value);
            }
        }
    }

    function notify(val) {
        if (isFunction(callback)) {
            callback(val);
        }
    }
}