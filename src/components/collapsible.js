import { DOM } from "../../utils/src/index.js";

// collapsible handler
export const Collapsible = function () {
    var collapsibles = DOM.getElements('[data-collapsible]');

    collapsibles.forEach(function (collapsible) {
        var content = DOM.getElement('[data-collapsible-content]', collapsible);
        if (collapsible.dataset['collapsible'] === 'collapsed') {
            DOM.hide(content);
        }

        collapsible.addEventListener('click', function (e) {
            var target = e.target;
            var state = collapsible.dataset['collapsible'];
            if (state === 'collapsed') {
                DOM.show(content);
                collapsible.dataset['collapsible'] = 'open';
                DOM.addClass(collapsible, 'expanded');
            } else if ('collapsibleHeader' in target.dataset && target.parentNode === collapsible) {
                DOM.hide(content);
                collapsible.dataset['collapsible'] = 'collapsed';
                DOM.removeClass(collapsible, 'expanded');
            }
        });
    });
};