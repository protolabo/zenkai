import { getElement, getElements, addClass, removeClass, isHTMLElement, findAncestor } from '@dom/index.js';
import { isString, isNullOrUndefined, isEmpty, isFunction } from '@datatype/index.js';
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
    create(args) {
        var instance = Object.create(this);

        Object.assign(instance, args);
        if (!isFunction(instance.callback)) {
            instance.callback = function (val, el) { };
        }

        return instance;
    },
    container: null,
    callback: null,
    header: null,
    content: null,
    name: 'collapsible',
    getState() { return this.container.dataset[this.name]; },
    setState(val) { this.container.dataset[this.name] = val; },
    isCollapsed() { return this.getState() === State.CLOSED; },
    isExpanded() { return this.getState() === State.OPEN; },
    open() { this.toggle(show, State.OPEN, addClass); },
    close() { this.toggle(hide, State.CLOSED, removeClass); },
    toggle(displayCb, state, classCb) {
        displayCb(this.content);
        this.setState(state);
        classCb(this.container, 'expanded');
    },
    init() {
        const container = this.container;
        this.header = getElement(`[data-${this.name}-header]`, container);
        this.content = getElement(`[data-${this.name}-content]`, container);

        return this;
    },
    activate() {
        this.init();
        if (this.isCollapsed()) {
            this.close();
        } else if (this.isExpanded()) {
            this.open();
        }
        this.bindEvents();
    },
    bindEvents() {
        const container = this.container;
        const header = this.header;

        header.addEventListener('click', (e) => {
            var target = e.target;
            var targetCollapsible = findAncestor(target, (el) => this.name in el.dataset);
            if (container === targetCollapsible) {
                if (this.getState() === State.CLOSED) {
                    this.open();
                    this.callback(this);
                } else if (header.parentNode === container) {
                    this.close();
                }
            }
        });
    }
};

const AccordionFactory = {
    create(args) {
        var instance = Object.create(this);

        Object.assign(instance, args);
        if (!isFunction(instance.callback)) {
            instance.callback = function (val, el) { };
        }

        return instance;
    },
    container: null,
    items: null,
    callback: null,
    init() {
        this.items = [];

        return this;
    },
    activate() {
        this.init();
        var accordionElements = getElements('[data-accordion]', this.container);
        for (let i = 0; i < accordionElements.length; i++) {
            let accordionElement = accordionElements[i];
            let collapsible = CollapsibleFactory.create({
                container: accordionElement,
                name: 'accordion',
                callback: (selectedItem) => {
                    this.items.filter((item) => item !== selectedItem && item.isExpanded())
                        .forEach((other) => other.close());
                }
            });
            this.items.push(collapsible);
            collapsible.activate();
        }
    }
};


/**
 * Collapsible
 * @param {HTMLElement} container 
 * @param {*} _callback
 */
export function Collapsible(container, _callback) {
    var collapsibles = getCollapsibles(container);

    if (collapsibles === NONE) {
        return null;
    }

    for (let i = 0; i < collapsibles.length; i++) {
        CollapsibleFactory.create({
            container: collapsibles[i],
            callback: _callback
        }).activate();
    }

    return collapsibles;
}

/**
 * Accordion
 * @param {HTMLElement} container 
 * @param {*} _callback
 */
export function Accordion(container, _callback) {
    var accordions = getAccordions(container);

    if (accordions === NONE) {
        return null;
    }

    for (let i = 0; i < accordions.length; i++) {
        AccordionFactory.create({
            container: accordions[i],
            callback: _callback
        }).activate();
    }

    return accordions;
}

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