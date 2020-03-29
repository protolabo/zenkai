import { getElements, isHTMLElement, isNodeList, createListItem } from '@dom/index.js';
import { getInput, getType } from "../utils.js";
import { BaseSelector, BaseSelectorItem } from './base-selector.js';
import { FormSelector, FormSelectorItem } from './form-selector.js';

const ErrorCode = {
    BAD_CONTAINER: 'BAD_CONTAINER',
    BAD_INPUT: 'BAD_INPUT'
};

const createDomQuery = (selector) => `[data-type="${selector.name}"]`;

export const DOMQuerySelector = {
    BaseSelector: createDomQuery(BaseSelector),
    FormSelector: createDomQuery(FormSelector)
};

export const Factory = {
    create(container, options) {
        if (!isHTMLElement(container)) {
            return ErrorCode.BAD_CONTAINER;
        }

        var itemContainers = getElements('[data-selector]', container);
        if (!isNodeList(itemContainers)) {
            return ErrorCode.BAD_CONTAINER;
        }

        var widget = null;
        var items = null;
        var type = getType(container);

        switch (type) {
            case 'selector':
                items = createSelectorItem(itemContainers, type, false);
                widget = Object.create(BaseSelector);
                break;
            case 'form-selector':
                items = createSelectorItem(itemContainers, type, true);
                widget = Object.create(FormSelector);
                break;
        }

        Object.assign(widget, options, {
            container: container,
            items: items,
            querySelector: createDomQuery(widget),
        });

        return widget;
    }
};

function createSelectorItem(itemContainers, type, hasInput) {
    var items = [];

    var typeHandler = {
        'selector': Object.create(BaseSelectorItem),
        'form-selector': Object.create(FormSelectorItem),
    };

    for (let i = 0; i < itemContainers.length; i++) {
        let itemContainer = itemContainers[i];
        itemContainer.dataset.selectorIndex = i;

        let args = {
            container: itemContainer,
            index: i
        };

        if (hasInput) {
            let input = getInput('radio', itemContainer);
            if (!isHTMLElement(input)) {
                return ErrorCode.BAD_INPUT;
            }
            input.dataset.selectorIndex = i;
            
            Object.assign(args, { input: input });
        }

        let item = typeHandler[type]().init(args);

        items.push(item);
    }

    return items;
}