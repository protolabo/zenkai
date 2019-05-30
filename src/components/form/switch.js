import { getElement, getElements, isHTMLElement } from '@utils/dom/index.js';
import { isFunction, isString, isNullOrUndefined, isEmpty } from '@utils/datatype/index.js';
import { HTMLAttribute } from './global.js';
import { getInput } from "./utils.js";

const ATTRIBUTE = 'switch';

const NONE = -1;

const Status = {
    ON: 'on',
    OFF: 'off'
};

const toData = (name) => `[data-type=${name}]`;

const isSwitch = (element) => element.dataset['type'] === ATTRIBUTE;

const SwitchFactory = {
    create(args) {
        var instance = Object.create(this);

        Object.assign(instance, args);
        if (!isFunction(instance.callback)) {
            instance.callback = function (val, el) { };
        }

        return instance;
    },
    container: null,
    activate() {
        var input = getInput('checkbox', this.container);
        this.container.dataset[HTMLAttribute.CHECKED] = input.checked ? Status.ON : Status.OFF;

        // Bind events
        input.addEventListener('change', (e) => {
            this.container.dataset[HTMLAttribute.CHECKED] = input.checked ? Status.ON : Status.OFF;
            this.callback(input.value, this.container);
        });
    }
};

export function Switch(container, _callback) {
    const switches = getSliders(container);

    if (switches === NONE) {
        return null;
    }

    for (let i = 0; i < switches.length; i++) {
        SwitchFactory.create({ container: switches[i], callback: _callback }).activate();
    }

    return switches;
}

function getSliders(container) {
    if (isHTMLElement(container)) {
        return isSwitch(container) ? [container] : getElements(toData(ATTRIBUTE), container);
    } else if (isString(container) && !isEmpty(container)) {
        let _container = getElement(container);
        return isNullOrUndefined(_container) ? NONE : getSliders(_container);
    } else if (isNullOrUndefined(container)) {
        return getElements(toData(ATTRIBUTE));
    }

    return NONE;
}
