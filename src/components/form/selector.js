import { getElements, isHTMLElement } from '@dom/index.js';
import { isFunction, isNullOrUndefined, isNull, valOrDefault, isUndefined, hasOwn } from '@datatype/index.js';
import { check, uncheck, setState, getState, getType, getComponentElement } from './global.js';
import { getInput } from "./utils.js";

const ErrorCode = {
    BAD_CONTAINER: 'BAD_CONTAINER',
    BAD_INPUT: 'BAD_INPUT'
};
const ErrorHandler = {
    BAD_CONTAINER: new Error("Missing container: A selector requires a container"),
    BAD_INPUT: new Error("Missing input: FormSelector requires an input in the container"),
};

const Status = {
    ON: 'on',
    OFF: 'off'
};

const SelectorFactory = {
    create(container, options) {
        if (!isHTMLElement(container)) {
            return ErrorCode.BAD_CONTAINER;
        }

        var widget = null;
        var input = null;

        switch (getType(container)) {
            case 'selector':
                widget = Object.create(BaseSelector);
                break;
            case 'form-selector':
                input = getInput('radio', container);
                if (!isHTMLElement(input)) {
                    return ErrorCode.BAD_INPUT;
                }
                options.input = input;
                widget = Object.create(FormSelector);
                break;
        }

        Object.assign(widget, options, {
            container: container,
            querySelector: createDomQuery(widget),
        });


        return widget;
    }
};

const BaseSelector = {
    name: 'selector',
    /** @type {HTMLElement} */
    container: null,
    current: null,
    /** @type {Function} */
    beforeChange: null,
    /** @type {Function} */
    afterChange: null,
    get value() {
        return this.current.dataset['value'];
    },
    setCurrentItem(item) {
        this.current = item;
        check(this.current, Status.ON);

        return true;
    },
    init() {
        var value = this.container.dataset['value'];
        var defaultItem = null;
        var selectorElements = getElements('[data-selector]', this.container);

        for (let i = 0; i < selectorElements.length; i++) {
            let item = selectorElements[i];

            if (getState(item) === Status.ON) {
                this.setCurrentItem(item);
            }
            if (!isUndefined(value) && item.dataset.value === value) {
                defaultItem = item;
            }
        }

        if (isNull(this.current) && !isNull(defaultItem)) {
            this.setCurrentItem(defaultItem);
        }

        this.bindEvents();

        return this;
    },
    bindEvents() {
        this.container.addEventListener('click', (event) => {
            const target = event.target;
            if (!hasOwn(event.target.dataset, 'selector')) {
                return;
            }
            var halt = false;

            if (isFunction(this.beforeChange)) {
                halt = this.beforeChange(this, event) === false;
            }

            if (halt) {
                return;
            }

            if (this.current) {
                uncheck(this.current, Status.OFF);
            }
            this.setCurrentItem(target);

            if (isFunction(this.afterChange)) {
                this.afterChange(this, event);
            }
        });
    }
};

const FormSelector = {
    name: 'form-selector',
    /** @type {HTMLElement} */
    container: null,
    current: null,
    /** @type {Function} */
    beforeChange: null,
    /** @type {Function} */
    afterChange: null,
    setCurrentItem(item, _input) {
        var input = valOrDefault(_input, getInput('radio', item));
        input.checked = true;
        this.current = item;
        check(this.current, Status.ON);
    },
    init() {
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
            // input.addEventListener('change', () => {
            //     if (this.current) {
            //         uncheck(this.current, Status.OFF);
            //     }
            //     this.setCurrentItem(item, input);
            // });
        }

        if (isNull(this.current) && !isNull(defaultItem)) {
            this.setCurrentItem(defaultItem);
        }

        return this;
    },
    bindEvents() {
        this.container.addEventListener('change', (event) => {
            var halt = false;
            var target = event.target;

            if (isFunction(this.beforeChange)) {
                halt = this.beforeChange(this, event) === false;
            }

            if (halt) {
                return;
            }
            if (this.current) {
                uncheck(this.current, Status.OFF);
            }
            // this.setCurrentItem(item, input);
            this.setCurrentItem(target, target);
            if (isFunction(this.afterChange)) {
                this.afterChange(this, event);
            }
        });
    }
};

const createDomQuery = (selector) => `[data-type="${selector.name}"]`;

const isSelector = (element) => RegExp('selector|form-selector').test(element.dataset['type']);

const domQuery = [createDomQuery(BaseSelector), createDomQuery(FormSelector)].join(',');

export function Selector(container, _options) {
    const selectorElements = getComponentElement(container, isSelector, domQuery);
    var options = valOrDefault(_options, {});

    if (isNullOrUndefined(selectorElements)) {
        return null;
    }

    var selectors = [];

    for (let i = 0; i < selectorElements.length; i++) {
        let selector = SelectorFactory.create(selectorElements[i], options);
        if (hasOwn(ErrorHandler, selector)) {
            throw ErrorHandler[selector];
        }
        selector.init();

        selectors.push(selector);
    }

    return selectors;
}