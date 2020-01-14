import { getElement, getElements, isHTMLElement } from '@dom/index.js';
import { isFunction, isString, isNullOrUndefined, isEmpty, valOrDefault } from '@datatype/index.js';
import { check, uncheck, setState, getState, getType } from './global.js';
import { getInput } from "./utils.js";

const NONE = -1;
const ERROR = -10;

const Status = {
    ON: 'on',
    OFF: 'off'
};

const createDomQuery = (selector) => `[data-type="${selector.name}"]`;

const isSwitch = (element) => RegExp('switch|form-switch').test(element.dataset['type']);

const SwitchFactory = {
    create(container, options) {
        if (!isHTMLElement(container)) {
            console.error('%c@zenkai%c #Switch>%SwitchFactory:%c Container must be an HTML Element', "text-decoration: underline", "", "font-weight: bold;", "font-weight: normal;");
            return ERROR;
        }

        var widget = null;
        switch (getType(container)) {
            case 'switch':
                widget = Object.create(BaseSwitch);
                break;
            case 'form-switch':
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
    activate() {
        // Init
        if (this.isChecked()) {
            check(this.container, Status.ON);
        }

        // Bind events
        this.container.addEventListener('click', () => {
            var halt = false;

            if (isFunction(this.beforeChange)) {
                halt = this.beforeChange(this) === false;
            }

            if (halt) {
                this.setChecked(!this.isChecked());
                return;
            }

            this.toggle();
            
            if (isFunction(this.afterChange)) {
                this.afterChange(this);
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
        // return this.input.checked;
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
    activate() {
        this.input = getInput('checkbox', this.container);
        if (!isHTMLElement(this.input)) {
            throw new Error("Missing input: FormSwitch requires an input in the container");
        }

        // Init
        if (this.input.checked) {
            this.setChecked(true);
        }

        // Bind events
        this.input.addEventListener('change', (e) => {
            var halt = false;

            if (isFunction(this.beforeChange)) {
                halt = this.beforeChange(this) === false;
            }

            if (halt) {
                this.setChecked(!this.isChecked());
                return;
            }

            this.toggle();
            
            if (isFunction(this.afterChange)) {
                this.afterChange(this);
            }
        });
    }
};

const domQuery = [createDomQuery(BaseSwitch), createDomQuery(FormSwitch)].join(',');

export function Switch(container, _options) {
    const switcheElements = getSliders(container);
    var options = valOrDefault(_options, {});

    if (switcheElements === NONE) {
        return null;
    }

    var switches = [];

    for (let i = 0; i < switcheElements.length; i++) {
        let $switch = SwitchFactory.create(switcheElements[i], options);
        $switch.activate();
        switches.push($switch);
    }

    return switches;
}

function getSliders(container) {
    if (isHTMLElement(container)) {
        return isSwitch(container) ? [container] : getElements(domQuery, container);
    } else if (isString(container) && !isEmpty(container)) {
        let _container = getElement(container);
        return isNullOrUndefined(_container) ? NONE : getSliders(_container);
    } else if (isNullOrUndefined(container)) {
        return getElements(domQuery);
    }

    return NONE;
}