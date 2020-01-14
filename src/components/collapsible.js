import { getElement, getElements, addClass, removeClass, isHTMLElement, findAncestor } from '@dom/index.js';
import { isString, isNullOrUndefined, isEmpty, isFunction, valOrDefault } from '@datatype/index.js';
import { show, hide } from './utils.js';

const ATTRIBUTE = 'collapsible';

const NONE = -1;

const State = {
    OPEN: 'expanded',
    CLOSED: 'collapsed'
};

const toData = (name) => `[data-boost=${name}]`;

const isCollapsible = (el) => ATTRIBUTE in el.dataset;

const isAccordion = (el) => el.dataset['boost'] === 'accordion';

const CollapsibleFactory = {
    /** @returns {CollapsibleFactory} */
    create(container, options) {
        if (!isHTMLElement(container)) {
            throw new Error("Missing container: A collapsible requires a container");
        }

        var instance = Object.create(this);

        Object.assign(instance, options, {
            container: container
        });

        return instance;
    },
    name: 'collapsible',
    /** @type {HTMLElement} */
    container: null,
    /** @type {HTMLElement} */
    header: null,
    /** @type {HTMLElement} */
    content: null,
    /** @type {Function} */
    beforeOpen: null,
    /** @type {Function} */
    afterOpen: null,
    /** @type {Function} */
    beforeClose: null,
    /** @type {Function} */
    afterClose: null,
    getState() { return this.container.dataset[this.name]; },
    setState(val) { this.container.dataset[this.name] = val; },
    /** Verifies that the container is collapsed (closed) */
    isCollapsed() { return this.getState() === State.CLOSED; },
    /** Verifies that the container is expanded (open) */
    isExpanded() { return this.getState() === State.OPEN; },
    isClosed: false,
    isInitialized: false,
    /** Opens the container and calls the defined pre/post operations */
    open() {
        if (this.isInitialized && !this.isClosed) {
            return this;
        }

        var halt = false;

        if (isFunction(this.beforeOpen)) {
            halt = this.beforeOpen(this) === false;
        }

        if (halt) {
            return this;
        }

        this.toggle(show, State.OPEN, addClass);

        if (isFunction(this.afterOpen)) {
            this.afterOpen(this);
        }

        this.isClosed = false;

        return this;
    },
    /** Closes the container and calls the defined pre/post operations */
    close() {
        if (this.isInitialized && this.isClosed) {
            return this;
        }

        var halt = false;

        if (isFunction(this.beforeClose)) {
            halt = this.beforeClose(this) === false;
        }

        if (halt) {
            return this;
        }

        this.toggle(hide, State.CLOSED, removeClass);

        if (isFunction(this.afterClose)) {
            this.afterClose(this);
        }

        this.isClosed = true;

        return this;
    },
    toggle(displayCb, state, classCb) {
        displayCb(this.content);
        this.setState(state);
        classCb(this.container, 'expanded');
    },
    init() {
        this.header = getElement(`[data-${this.name}-header]`, this.container);
        this.content = getElement(`[data-${this.name}-content]`, this.container);

        return this;
    },
    activate() {
        this.init();
        if (this.isCollapsed()) {
            this.close();
        } else if (this.isExpanded()) {
            this.isClosed = true;
            this.open();
        }
        this.bindEvents();

        this.isInitialized = true;
    },
    bindEvents() {
        const container = this.container;
        const header = this.header;

        header.addEventListener('click', (e) => {
            var target = e.target;
            var targetCollapsible = findAncestor(target, (el) => this.name in el.dataset);
            if (container === targetCollapsible) {
                if (this.isCollapsed()) {
                    this.open();
                } else if (header.parentNode === container) {
                    this.close();
                }
            }
        });
    }
};

const AccordionFactory = {
    /** @returns {AccordionFactory} */
    create(container, options) {
        if (!isHTMLElement(container)) {
            throw new Error("Missing container: A collapsible requires a container");
        }

        var instance = Object.create(this);

        Object.assign(instance, options, {
            container: container
        });

        return instance;
    },
    /** @type {HTMLElement} */
    container: null,
    /** @type {CollapsibleFactory[]} */
    sections: null,
    /** @type {CollapsibleFactory} */
    selectedSection: null,
    /** @type {Function} */
    beforeChange: null,
    /** @type {Function} */
    afterChange: null,
    init() {
        this.sections = [];

        return this;
    },
    activate() {
        this.init();

        var accordionElements = getElements('[data-accordion]', this.container);

        for (let i = 0; i < accordionElements.length; i++) {
            let element = accordionElements[i];
            let collapsible = CollapsibleFactory.create(element, {
                name: 'accordion',
                index: i,
                afterOpen: (selected) => {
                    if (isFunction(this.beforeChange)) {
                        this.beforeChange(selected);
                    }

                    this.sections.filter((section) => section.index !== selected.index)
                        .forEach((other) => other.close());

                    if (isFunction(this.afterChange)) {
                        this.afterChange(selected);
                    }

                    this.selectedSection = selected;
                }
            });
            this.sections.push(collapsible);
            collapsible.activate();
        }

        return this;
    }
};

/**
 * Makes a container collapsible
 * @param {!HTMLElement} container 
 * @param {Object} [options]
 */
export function Collapsible(container, _options) {
    var collapsibleElements = getCollapsibles(container);
    var options = valOrDefault(_options, {});

    if (collapsibleElements === NONE) {
        return null;
    }

    var collapsibles = [];

    for (let i = 0; i < collapsibleElements.length; i++) {
        let collapsible = CollapsibleFactory.create(collapsibleElements[i], options);
        collapsible.activate();
        collapsibles.push(collapsible);
    }

    return collapsibles;
}

/**
 * Transforms a container into an accordion
 * @param {!HTMLElement} container 
 * @param {Object} [_options]
 */
export function Accordion(container, _options) {
    var accordionElements = getAccordions(container);
    var options = valOrDefault(_options, {});

    if (accordionElements === NONE) {
        return null;
    }

    var accordions = [];

    for (let i = 0; i < accordionElements.length; i++) {
        let accordion = AccordionFactory.create(accordionElements[i], options);
        accordion.activate();
        accordions.push(accordion);
    }

    return accordions;
}

/**
 * Get all collapsibles within the specified container or on the page
 * @param {HTMLElement|string} [container] 
 * @private
 */
function getCollapsibles(container) {
    if (isHTMLElement(container)) {
        return isCollapsible(container) ? [container] : getElements('[data-collapsible]', container);
    } else if (isString(container) && !isEmpty(container)) {
        let _container = getElement(container);
        return isNullOrUndefined(_container) ? NONE : getCollapsibles(_container);
    } else if (isNullOrUndefined(container)) {
        return getElements('[data-collapsible]');
    }

    return NONE;
}

/**
 * Get all accordions within the specified container or on the page
 * @param {HTMLElement|string} [container] 
 * @private
 */
function getAccordions(container) {
    if (isHTMLElement(container)) {
        return isAccordion(container) ? [container] : getElements(toData('accordion'), container);
    } else if (isString(container) && !isEmpty(container)) {
        let _container = getElement(container);
        return isNullOrUndefined(_container) ? NONE : getAccordions(_container);
    } else if (isNullOrUndefined(container)) {
        return getElements(toData('accordion'));
    }

    return NONE;
}