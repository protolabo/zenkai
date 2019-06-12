import { getElement, getElements, addClass, removeClass, isHTMLElement, findAncestor, show, hide } from '@utils/dom/index.js';
import { isString, isNullOrUndefined, isEmpty, isFunction, isNull } from '@utils/datatype/index.js';

const ATTRIBUTE = 'collapsible';

const NONE = -1;

const State = {
    OPEN: 'open',
    COLLAPSED: 'collapsed'
};

const isCollapsible = (el) => ATTRIBUTE in el.dataset;

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
    current: null,
    callback: null,
    header: null,
    content: null,
    isAccordion: false,
    getState() { return this.container.dataset[ATTRIBUTE]; },
    setState(val) { this.container.dataset[ATTRIBUTE] = val; },
    open() { this.toggle(show, State.OPEN, addClass); },
    collapse() { this.toggle(hide, State.COLLAPSED, removeClass); },
    toggle(displayCb, state, classCb) {
        displayCb(this.content);
        this.setState(state);
        classCb(this.container, 'expanded');
    },
    init() {
        const container = this.container;
        this.header = getElement('[data-collapsible-header]', container);
        this.content = getElement('[data-collapsible-content]', container);
    },
    activate() {
        this.init();
        if (this.container.dataset[ATTRIBUTE] === State.COLLAPSED) {
            hide(this.content);
        }
        this.bindEvents();
    },
    bindEvents() {
        const container = this.container;
        const header = this.header;

        container.addEventListener('click', (e) => {
            var target = e.target;
            var targetCollapsible = findAncestor(target, (el) => ATTRIBUTE in el.dataset);
            if (container === targetCollapsible) {
                if (this.getState() === State.COLLAPSED) {
                    this.open();
                    if (this.isAccordion) {
                        let collapsibles = getElements('[data-accordion]');
                        collapsibles.filter((coll) => coll !== container)
                            .forEach((other) => this.collapse(other));
                    }
                } else if (header && header.parentNode === container) {
                    this.collapse();
                }
            }
        });
    }
};

/**
 * Collapsible
 * @param {HTMLElement} container 
 * @param {boolean} _isAccordion
 */
export function Collapsible(container, _isAccordion, _callback) {
    var collapsibles = getCollapsibles(container);

    if (collapsibles === NONE) {
        return null;
    }

    for (let i = 0; i < collapsibles.length; i++) {
        CollapsibleFactory.create({
            container: collapsibles[i],
            isAccordion: _isAccordion,
            callback: _callback
        }).activate();
    }

    return collapsibles;
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