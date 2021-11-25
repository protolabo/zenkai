import { isFunction, isNullOrUndefined, valOrDefault } from '@std/index.js';
import { check, uncheck, getState } from "../utils.js";


const Status = {
    ON: 'on',
    OFF: 'off'
};


/**
 * Changes the state of the switch
 * @param {boolean} isChecked 
 * @returns {boolean} A value indicating whether the operation was a success
 */
function setChecked(isChecked) {
    if (isNullOrUndefined(isChecked)) {
        return false;
    }

    this.input.checked = isChecked;

    if (isChecked) {
        check(this.container, Status.ON);
    } else {
        uncheck(this.container, Status.OFF);
    }

    if (isFunction(this.afterChange)) {
        this.afterChange(this);
    }

    this.refresh();

    return true;
}


export const FormSwitch = {
    /** @type {string} */
    defaultValue: null,
    /** @type {Function} */
    beforeChange: null,
    /** @type {Function} */
    afterChange: null,

    /** @returns {string} */
    get value() { return this.input.value; },

    init(args = {}) {
        Object.assign(this, args);

        this.container.classList.add("zenui-switch");
        this.input.classList.add("zenui-switch-input");

        this.defaultValue = this.isChecked();

        setChecked.call(this, this.isChecked());

        this.bindEvents();

        return this;
    },

    /**
     * Verifies that the switch is checked
     * @returns {boolean} A value indicating whether the switch is checked
     */
    isChecked() {
        return this.input.checked;
    },

    check() {
        setChecked.call(this, true);

        return this;
    },
    uncheck() {
        setChecked.call(this, false);

        return this;
    },
    toggle() {
        setChecked.call(this, !this.isChecked());

        return this;
    },

    reset() {
        setChecked.call(this, this.defaultValue);

        return this;
    },
    refresh() {
        if (this.isChecked()) {
            this.container.classList.add("zenui-switch--checked");
        } else {
            this.container.classList.remove("zenui-switch--checked");
        }

        return this;
    },
    /**
     * @returns {HTMLElement}
     */
    render() {
        return this.container;
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

            setChecked.call(this, this.isChecked());
        });
    }
};
