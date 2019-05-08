import { DOM, TYPE } from "@utils/index.js";

function findAncestor(target, callback, max) {
    if (max > 0) {
        return findAncestorIter(target.parentElement, callback, max);
    }

    return findAncestorInf(target.parentElement, callback);
}

function findAncestorInf(target, callback) {
    if (target === null) {
        return undefined;
    }

    if (callback(target)) {
        return target;
    }

    return findAncestorInf(target.parentElement, callback);
}

function findAncestorIter(target, callback, max) {
    if (target === null || max === 0) {
        return undefined;
    }

    if (callback(target)) {
        return target;
    }

    return findAncestorIter(target.parentElement, callback, max - 1);
}

const Accordion = function () {
    const ACCORDION = 'accordion';
    const State = {
        OPEN: 'open',
        COLLAPSED: 'collapsed'
    };

    var collapsibles = Array.from(DOM.getElements('[data-accordion]'));

    collapsibles.forEach(function (collapsible) {
        var content = DOM.getElement('[data-accordion-content]', collapsible);
        // initialize
        if (collapsible.dataset[ACCORDION] === State.COLLAPSED) { DOM.hide(content); }
        // bind events
        collapsible.addEventListener('click', function (e) {
            var target = e.target;
            var headerTarget = findAncestor(target, (el) => 'accordionHeader' in el.dataset, 5);
            var state = collapsible.dataset[ACCORDION];
            if (state === State.COLLAPSED) {
                showAccordion(collapsible, content);
                collapsibles.filter((_collapsible) => _collapsible !== collapsible)
                    .forEach((other) => hideAccordion(other));
            } else if (headerTarget && headerTarget.parentNode === collapsible) {
                hideAccordion(collapsible, content);
            }
        });
    });

    function showAccordion(container, content) {
        content = TYPE.valOrDefault(content, DOM.getElement('[data-accordion-content]', container));
        DOM.show(content);
        container.dataset[ACCORDION] = State.OPEN;
        DOM.addClass(container, 'expanded');
    }

    function hideAccordion(container, content) {
        content = TYPE.valOrDefault(content, DOM.getElement('[data-accordion-content]', container));
        DOM.hide(content);
        container.dataset[ACCORDION] = State.COLLAPSED;
        DOM.removeClass(container, 'expanded');
    }
};