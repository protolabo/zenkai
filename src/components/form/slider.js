import { getElements } from '@utils/dom/index.js';
import { HTMLAttribute } from './global.js';
import { getInput } from './utils.js';

const Status = {
    ON: 'on',
    OFF: 'off'
};

function isSlider(el) {
    return el.dataset['type'] == 'slider';
}

export function Slider(form) {
    const labels = getElements('.form-label', form);

    for (let i = 0, len = labels.length; i < len; i++) {
        let lbl = labels[i];

        if (isSlider(lbl)) {
            let input = getInput('checkbox', lbl);
            lbl.dataset[HTMLAttribute.CHECKED] = input.checked ? Status.ON : Status.OFF;
            input.addEventListener('click', function (e) {
                lbl.dataset[HTMLAttribute.CHECKED] = input.checked ? Status.ON : Status.OFF;
            });
        }
    }
}