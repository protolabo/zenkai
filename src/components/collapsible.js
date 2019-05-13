import { getElement, getElements, addClass, removeClass, isHTMLElement, findAncestor, show, hide } from '@utils/dom/index.js';
import { hasOwn } from '@utils/datatype/index.js';

const COLLAPSIBLE = 'collapsible';

const State = {
    OPEN: 'open',
    COLLAPSED: 'collapsed'
};

/**
 * Collapsible
 * @param {HTMLElement} container 
 */
export function Collapsible(container, accordion) {
    var collapsibles;
    if (isHTMLElement(container)) {
        collapsibles = hasOwn(container.dataset, COLLAPSIBLE) ? [getElement(container)] : getElements('[data-collapsible]', container);
    } else {
        collapsibles = getElements('[data-collapsible]');
    }

    collapsibles.forEach(function (collapsible) {
        // initialize
        if (collapsible.dataset[COLLAPSIBLE] === State.COLLAPSED) {
            hide(getContent(collapsible));
        }
        // bind events
        collapsible.addEventListener('click', function (e) {
            var target = e.target;
            var headerTarget = findAncestor(target, (el) => 'collapsibleHeader' in el.dataset, 5);
            var state = collapsible.dataset[COLLAPSIBLE];
            if (state === State.COLLAPSED) {
                open(collapsible);
                if (accordion) {
                    collapsibles.filter((_collapsible) => _collapsible !== collapsible)
                        .forEach((other) => collapse(other));
                }
            } else if (headerTarget && headerTarget.parentNode === collapsible) {
                collapse(collapsible);
            }
        });
    });
}

const getContent = (collapsible) => getElement('[data-collapsible-content]', collapsible);

const open = (collapsible) => toggle(collapsible, show, State.OPEN, addClass);

const collapse = (collapsible) => toggle(collapsible, hide, State.COLLAPSED, removeClass);

function toggle(collapsible, displayCb, state, classCb) {
    displayCb(getContent());
    collapsible.dataset[COLLAPSIBLE] = state;
    classCb(collapsible, 'expanded');
}