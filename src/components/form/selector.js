import { getElement, getElements, isHTMLElement } from '@dom/index.js';
import { isFunction, isString, isNullOrUndefined, isEmpty, isNull, valOrDefault, isUndefined } from '@datatype/index.js';
import { check, uncheck, setState, getState, getType } from './global.js';
import { getInput } from "./utils.js";

const NONE = -1;
const ERROR = -10;

const Status = {
    ON: 'on',
    OFF: 'off'
};

const SelectorFactory = {
    create(container, callback) {
        if (!isHTMLElement(container)) {
            console.error('SelectorFactory>>Container must be an HTML Element');
            return ERROR;
        }

        var selector = null;
        switch (getType(container)) {
            case 'selector':
                selector = Object.create(BaseSelector);
                break;
            case 'form-selector':
                selector = Object.create(FormSelector);
                break;
        }
        Object.assign(selector, {
            container: container,
            querySelector: createDomQuery(selector),
            callback: isFunction(callback) ? callback : function (val, el) { }
        });


        return selector;
    }
};

const BaseSelector = {
    name: 'selector',
    container: null,
    current: null,
    callback: null,
    setCurrentItem(item) {
        this.current = item;
        check(this.current, Status.ON);
        this.callback(this.current);
    },
    activate() {
        var value = this.container.dataset['value'];
        var defaultItem = null;
        var selectorItems = getElements('[data-selector]', this.container);
        for (let i = 0, len = selectorItems.length; i < len; i++) {
            let item = selectorItems[i];

            if (getState(item) === Status.ON) {
                this.setCurrentItem(item);
            }
            if (!isUndefined(value) && item.dataset.value === value) {
                defaultItem = item;
            }
            item.addEventListener('click', () => {
                if (this.current) {
                    uncheck(this.current, Status.OFF);
                }
                this.setCurrentItem(item);
            });
        }

        if (isNull(this.current) && !isNull(defaultItem)) {
            this.setCurrentItem(defaultItem);
        }
    }
};

const FormSelector = {
    name: 'form-selector',
    container: null,
    current: null,
    callback: null,
    setCurrentItem(item, _input) {
        var input = valOrDefault(_input, getInput('radio', item));
        this.current = item;
        check(this.current, Status.ON);
        this.callback(input.value, this.current);
    },
    activate() {
        var value = this.container.dataset['value'];
        var defaultItem = null;
        var selectorItems = getElements('[data-selector]', this.container);
        for (let i = 0, len = selectorItems.length; i < len; i++) {
            let item = selectorItems[i];
            let input = getInput('radio', item);
            setState(item, input.checked ? Status.ON : Status.OFF);
            if (input.checked) {
                this.setCurrentItem(item, input);
            }
            if (input.value === value) {
                defaultItem = item;
            }
            input.addEventListener('change', () => {
                if (this.current) {
                    uncheck(this.current, Status.OFF);
                }
                this.setCurrentItem(item, input);
            });
        }

        if (isNull(this.current) && !isNull(defaultItem)) {
            this.setCurrentItem(defaultItem);
        }
    }
};

const createDomQuery = (selector) => `[data-type="${selector.name}"]`;

const isSelector = (element) => RegExp('selector|form-selector').test(element.dataset['type']);

const domQuery = [createDomQuery(BaseSelector), createDomQuery(FormSelector)].join(',');

function getSelectors(container) {
    if (isHTMLElement(container)) {
        return isSelector(container) ? [container] : getElements(domQuery, container);
    } else if (isString(container) && !isEmpty(container)) {
        let _container = getElement(container);
        return isNullOrUndefined(_container) ? NONE : getSelectors(_container);
    } else if (isNullOrUndefined(container)) {
        return getElements(domQuery);
    }

    return NONE;
}

export function Selector(container, _callback) {
    const selectors = getSelectors(container);

    if (selectors === NONE) {
        return null;
    }

    for (let i = 0; i < selectors.length; i++) {
        let selector = SelectorFactory.create(selectors[i], _callback);
        selector.activate();
    }

    return selectors;
}