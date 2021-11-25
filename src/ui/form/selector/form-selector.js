import { isFunction, isNullOrUndefined, isNull, hasOwn } from '@std/index.js';
import { findAncestor, getElements, isHTMLElement, removeChildren } from '@dom/index.js';
import { check, uncheck, getValue, getInput } from '../utils.js';


const Status = {
    ON: 'on',
    OFF: 'off'
};

/**
 * Gets the item element
 * @param {HTMLElement} element 
 * @this {HTMLElement}
 */
function getItem(element) {
    const isValid = (el) => hasOwn(el.dataset, 'selector');

    if (isValid(element)) {
        return element;
    }

    return findAncestor(element, isValid, 5);
}

const FormSelectorItem = {
    /** @type {number} */
    index: null,

    init(args) {
        Object.assign(this, args);

        if (this.isChecked()) {
            check(this.container, Status.ON);
        }

        return this;
    },

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

        this.input.checked = isChecked;
        if (isChecked) {
            check(this.container, Status.ON);
            this.container.classList.add("selector-item--selected");
        } else {
            uncheck(this.container, Status.OFF);
            this.container.classList.remove("selector-item--selected");
        }

        return true;
    },
    setIndex(index) {
        this.index = index;
        this.container.dataset.selectorIndex = index;
    },
    destroy() {
        removeChildren(this.container);
        this.container.remove();

        return true;
    }
};

export const FormSelector = {
    /** @type {string} */
    defaultValue: null,
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

    /** @returns {string} */
    get value() { return this.selectedItem.value; },

    init() {
        const itemContainers = getElements('[data-selector]', this.container);

        if (isNullOrUndefined(itemContainers)) {
            return;
        }

        this.items = [];
        this.defaultValue = getValue(this.container);
        var defaultItem = null;

        for (let i = 0; i < itemContainers.length; i++) {
            const item = this.createItem(itemContainers[i]);

            if (item.isChecked()) {
                this.setSelectedItem(item);
            }

            if (item.value === this.defaultValue) {
                defaultItem = item;
            }
        }

        if (isNull(this.selectedItem) && !isNull(defaultItem)) {
            this.setSelectedItem(defaultItem);
        }

        this.bindEvents();

        return this;
    },
    createItem(container) {
        if (!isHTMLElement(container)) {
            throw new TypeError("Missing container: A selector requires a container");
        }

        container.classList.add("selector-item");

        var input = getInput('radio', container);
        if (!isHTMLElement(input)) {
            throw new Error("Missing input: FormSelector requires an input in the container");
        }

        const item = Object.create(FormSelectorItem, {
            container: { value: container },
            input: { value: input },
            selector: { value: this },
        }).init();

        this.addItem(item);

        return item;
    },
    /**
     * Adds a selector item
     * @param {BaseSelectorItem} item 
     * @param {*} _index 
     */
    addItem(item, _index) {
        this.items.push(item);

        this.refresh();

        return this;
    },
    /**
     * Gets a selector item
     * @param {number} index 
     * @returns {FormSelectorItem}
     */
    getItem(index) {
        if (!Number.isInteger(index)) {
            return null;
        }

        return this.items.find((item) => item.index === index);
    },
    /**
     * Removes a selector item
     * @param {number} index 
     */
    removeItem(index) {
        if (!Number.isInteger(index)) {
            return false;
        }

        const item = this.getItem(index);

        if (isNullOrUndefined(item)) {
            return false;
        }

        if (!item.destroy()) {
            return false;
        }

        this.items.splice(item.index, 1);

        this.refresh();

        return true;
    },
    setSelectedItem(item) {
        if (!this.items.includes(item)) {
            return false;
        }

        if (this.selectedItem) {
            this.selectedItem.setChecked(false);
        }

        this.selectedItem = item;
        this.selectedItem.setChecked(true);

        return true;
    },

    refresh() {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            item.setIndex(i);
        }

        return this;
    },
    render() {
        return this.container;
    },

    bindEvents() {
        this.container.addEventListener('change', (event) => {
            const target = getItem(event.target);

            const { selectorIndex } = target.dataset;

            var halt = false;

            if (isFunction(this.beforeChange)) {
                halt = this.beforeChange(this, event) === false;
            }

            if (halt) {
                target.checked = false;
                this.items[this.selectedIndex].setChecked(true);
                return;
            }

            const item = this.getItem(+selectorIndex);

            if (isNullOrUndefined(item)) {
                return;
            }

            this.setSelectedItem(item);

            if (isFunction(this.afterChange)) {
                this.afterChange(this, event);
            }
        });
    }
};
