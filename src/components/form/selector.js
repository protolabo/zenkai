import { getElement, getElements, isHTMLElement } from '@utils/dom/index.js';
import { isFunction, isString, isNullOrUndefined, isEmpty, isNull, valOrDefault } from '@utils/datatype/index.js';
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

const SelectorFactory = {
    create(args) {
        var instance = Object.create(this);

        Object.assign(instance, args);
        if (!isFunction(instance.callback)) {
            instance.callback = function (val, el) { };
        }

        return instance;
    },
    container: null,
    current: null,
    callback: null,
    setCurrentItem(item, _input) {
        var input = valOrDefault(_input, getInput('radio', item));
        this.current = item;
        this.current.dataset[HTMLAttribute.CHECKED] = Status.ON;
        this.callback(input.value, this.current);
    },
    activate() {
        var value = this.container.dataset['value'];
        var defaultItem = null;
        var selectorItems = getElements('[data-selector]', this.container);
        for (let i = 0, len = selectorItems.length; i < len; i++) {
            let item = selectorItems[i];
            let input = getInput('radio', item);
            item.dataset[HTMLAttribute.CHECKED] = input.checked ? Status.ON : Status.OFF;
            if (input.checked) {
                this.setCurrentItem(item, input);
            }
            if (input.value === value) {
                defaultItem = item;
            }
            input.addEventListener('change', () => {
                if (this.current) {
                    this.current.dataset[HTMLAttribute.CHECKED] = Status.OFF;
                }
                this.setCurrentItem(item, input);
            });
        }

        if (isNull(this.current)) {
            this.setCurrentItem(defaultItem);
        }
    }
};

export function Selector(container, _callback) {
    const selectors = getSelectors(container);

    if (selectors === NONE) {
        return null;
    }

    for (let i = 0; i < selectors.length; i++) {
        SelectorFactory.create({ container: selectors[i], callback: _callback }).activate();
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
