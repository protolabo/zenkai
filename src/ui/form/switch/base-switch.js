import { isFunction, isNullOrUndefined } from '@std/index.js';
import { check, uncheck, getState, getValue } from "../utils.js";


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

export const BaseSwitch = {
    /** @type {string} */
    defaultValue: null,
    /** @type {Function} */
    beforeChange: null,
    /** @type {Function} */
    afterChange: null,

    /** @returns {string} */
    get value() { return getValue(this.container); },

    init(args = {}) {
        Object.assign(this, args);

        this.container.classList.add("zenui-switch");

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
        return getState(this.container) === Status.ON;
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
        this.container.addEventListener('click', (event) => {
            var halt = false;

            if (isFunction(this.beforeChange)) {
                halt = this.beforeChange(this, event) === false;
            }

            if (halt) {
                return;
            }

            this.toggle();
        });
    }
};