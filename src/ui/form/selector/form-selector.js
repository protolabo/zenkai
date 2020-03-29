import { isFunction, isNullOrUndefined, isNull, valOrDefault } from '@std/index.js';
import { check, uncheck, getState } from '../utils.js';

const Status = {
    ON: 'on',
    OFF: 'off'
};

export const FormSelectorItem = {
    init(args) {
        Object.assign(this, args);

        if (this.isChecked()) {
            check(this.container, Status.ON);
        }

        return this;
    },
    /** @type {HTMLElement} */
    container: null,
    /** @type {HTMLInputElement} */
    input: null,
    /** @type {number} */
    index: null,
    /** @returns {string} */
    get value() { return this.input['value']; },
    /** @returns {boolean} */
    isChecked() { return this.input.checked; },
    /**
     * Set the state of the item
     * @param {boolean} isChecked 
     * @returns {boolean} Value indicating the success of the operation
     */
    setChecked(isChecked) {
        if (isNullOrUndefined(isChecked)) {
            return false;
        }

        if (isChecked) {
            this.input.checked = true;
            check(this.container, Status.ON);
        } else {
            this.input.checked = false;
            uncheck(this.container, Status.OFF);
        }

        return true;
    },
};

export const FormSelector = {
    name: 'form-selector',
    /** @type {HTMLElement} */
    container: null,
    /** @type {FormSelectorItem[]} */
    items: null,
    /** @type {number} */
    selectedIndex: null,
    /** @type {HTMLElement} */
    selectedItem: null,
    /** @type {Function} */
    beforeChange: null,
    /** @type {Function} */
    afterChange: null,
    get value() {
        return this.selectedItem.value;
    },
    setSelectedItem(item) {
        if (!this.items.includes(item)) {
            return null;
        }

        if (this.selectedItem) {
            this.selectedItem.setChecked(false);
        }
        this.selectedItem = item;
        this.selectedItem.setChecked(true);

        return true;
    },
    init() {
        var value = this.container.dataset['value'];
        var defaultItem = null;

        for (let i = 0; i < this.items.length; i++) {
            let item = this.items[i];

            if (item.isChecked()) {
                this.setSelectedItem(item);
            }
            if (item.value === value) {
                defaultItem = item;
            }
        }

        if (isNull(this.selectedItem) && !isNull(defaultItem)) {
            this.setSelectedItem(defaultItem);
        }

        this.bindEvents();

        return this;
    },
    bindEvents() {
        this.container.addEventListener('change', (event) => {
            const target = event.target;            

            var halt = false;

            if (isFunction(this.beforeChange)) {
                halt = this.beforeChange(this, event) === false;
            }

            if (halt) {
                target.checked = false;
                this.items[this.selectedIndex].setChecked(true);
                return;
            }

            const item = this.items.find((i) => i.index === +valOrDefault(target.dataset.selectorIndex, -1));
            if(isNullOrUndefined(item)) {
                return;
            }

            this.setSelectedItem(item);

            if (isFunction(this.afterChange)) {
                this.afterChange(this, event);
            }
        });
    }
};
