import { isFunction, isNullOrUndefined, isNull, valOrDefault, hasOwn } from '@std/index.js';
import { check, uncheck, getState } from '../utils.js';

const Status = {
    ON: 'on',
    OFF: 'off'
};

export const BaseSelectorItem = {
    init(args) {
        Object.assign(this, args);

        if (this.isChecked()) {
            check(this.container, Status.ON);
        }

        return this;
    },
    /** @type {HTMLElement} */
    container: null,
    /** @type {number} */
    index: null,
    /** @returns {string} */
    get value() { return this.container.dataset['value']; },
    /** @returns {boolean} */
    isChecked() { return getState(this.container) === Status.ON; },
    /** @returns {boolean} */
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
};

export const BaseSelector = {
    name: 'selector',
    /** @type {HTMLElement} */
    container: null,
    /** @type {HTMLElement[]} */
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
        this.container.addEventListener('click', (event) => {
            const target = event.target;
            if (!hasOwn(target.dataset, 'selector')) {
                return;
            }
            
            var halt = false;

            if (isFunction(this.beforeChange)) {
                halt = this.beforeChange(this, event) === false;
            }

            if (halt) {
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
