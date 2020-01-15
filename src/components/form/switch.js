import { getElement, getElements, isHTMLElement } from '@dom/index.js';
import { isFunction, isString, isNullOrUndefined, isEmpty, valOrDefault, hasOwn } from '@datatype/index.js';
import { check, uncheck, getState, getType } from './global.js';
import { getInput } from "./utils.js";

const ErrorCode = {
    BAD_CONTAINER: 'BAD_CONTAINER',
    BAD_INPUT: 'BAD_INPUT'
};
const ErrorHandler = {
    BAD_CONTAINER: new Error("Missing container: A switch requires a container"),
    BAD_INPUT: new Error("Missing input: FormSwitch requires an input in the container"),
};

const Status = {
    ON: 'on',
    OFF: 'off'
};

const createDomQuery = (selector) => `[data-type="${selector.name}"]`;

const isSwitch = (element) => RegExp('switch|form-switch').test(element.dataset['type']);

const SwitchFactory = {
    create(container, options) {
        if (!isHTMLElement(container)) {
            return ErrorCode.BAD_CONTAINER;
        }

        var widget = null;
        var input = null;

        switch (getType(container)) {
            case 'switch':
                widget = Object.create(BaseSwitch);
                break;
            case 'form-switch':
                input = getInput('checkbox', container);
                if (!isHTMLElement(input)) {
                    return ErrorCode.BAD_INPUT;
                }
                options.input = input;
                widget = Object.create(FormSwitch);
                break;
        }

        Object.assign(widget, options, {
            container: container,
            querySelector: createDomQuery(widget),
        });


        return widget;
    }
};

const BaseSwitch = {
    name: 'switch',
    /** @type {HTMLElement} */
    container: null,
    /** @type {Function} */
    beforeChange: null,
    /** @type {Function} */
    afterChange: null,
    get value() {
        return this.container.dataset['value'];
    },
    /**
     * Verifies that the switch is checked
     * @param {boolean} check 
     * @returns {boolean} A value indicating whether the switch is checked
     */
    isChecked() {
        return getState(this.container) === Status.ON;
    },
    /**
     * Changes the state of the switch
     * @param {boolean} isChecked 
     * @returns {boolean} A value indicating whether the operation was a success
     */
    setChecked(isChecked) {
        if (isNullOrUndefined(isChecked)) {
            return false;
        }

        if (isChecked) {
            check(this.container, Status.ON);
        } else {
            uncheck(this.container, Status.OFF);
        }

        return true;
    },
    toggle() {
        if (this.isChecked()) {
            this.setChecked(false);
        } else {
            this.setChecked(true);
        }
    },
    init(args) {
        Object.assign(this, args);

        if (this.isChecked()) {
            check(this.container, Status.ON);
        }

        this.bindEvents();

        return this;
    },
    bindEvents() {
        this.container.addEventListener('click', (event) => {
            var halt = false;

            if (isFunction(this.beforeChange)) {
                halt = this.beforeChange(this, event) === false;
            }

            if (halt) {
                return;
            }

            this.toggle();

            if (isFunction(this.afterChange)) {
                this.afterChange(this, event);
            }
        });
    }
};

const FormSwitch = {
    name: 'form-switch',
    /** @type {HTMLElement} */
    container: null,
    /** @type {HTMLInputElement} */
    input: null,
    /** @type {Function} */
    beforeChange: null,
    /** @type {Function} */
    afterChange: null,
    get value() {
        return this.input.value;
    },

    /**
     * Verifies that the switch is checked
     * @param {boolean} check 
     * @returns {boolean} A value indicating whether the switch is checked
     */
    isChecked() {
        return getState(this.container) === Status.ON;
    },
    /**
     * Changes the state of the switch
     * @param {boolean} isChecked 
     * @returns {boolean} A value indicating whether the operation was a success
     */
    setChecked(isChecked) {
        if (isNullOrUndefined(isChecked)) {
            return false;
        }

        this.input.checked = isChecked;

        if (isChecked) {
            check(this.container, Status.ON);
        } else {
            uncheck(this.container, Status.OFF);
        }

        return true;
    },
    toggle() {
        if (this.isChecked()) {
            this.setChecked(false);
        } else {
            this.setChecked(true);
        }
    },
    init(args) {
        Object.assign(this, args);

        if (this.input.checked) {
            this.setChecked(true);
        }

        this.bindEvents();

        return this;
    },
    bindEvents() {
        this.input.addEventListener('change', (event) => {
            var halt = false;

            if (isFunction(this.beforeChange)) {
                halt = this.beforeChange(this, event) === false;
            }

            if (halt) {
                this.input.checked = !this.input.checked;   // revert input checked state
                return;
            }

            this.toggle();

            if (isFunction(this.afterChange)) {
                this.afterChange(this, event);
            }
        });
    }
};

const domQuery = [createDomQuery(BaseSwitch), createDomQuery(FormSwitch)].join(',');

export function Switch(container, _options) {
    const switcheElements = getSliders(container);
    var options = valOrDefault(_options, {});

    if (isNullOrUndefined(switcheElements)) {
        return null;
    }

    var switches = [];

    for (let i = 0; i < switcheElements.length; i++) {
        let $switch = SwitchFactory.create(switcheElements[i], options);
        if (hasOwn(ErrorHandler, $switch)) {
            throw ErrorHandler[$switch];
        }
        $switch.init();

        switches.push($switch);
    }

    return switches;
}

function getSliders(container) {
    if (isHTMLElement(container)) {
        return isSwitch(container) ? [container] : getElements(domQuery, container);
    } else if (isString(container) && !isEmpty(container)) {
        let _container = getElement(container);
        return isNullOrUndefined(_container) ? null : getSliders(_container);
    } else if (isNullOrUndefined(container)) {
        return getElements(domQuery);
    }

    return null;
}