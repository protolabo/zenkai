import { getElements, isHTMLElement, isNodeList } from '@dom/index.js';
import { getType } from '../global.js';
import { getInput } from "../utils.js";
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
        var items = [];

        switch (getType(container)) {
            case 'selector':
                for (let i = 0; i < itemContainers.length; i++) {
                    let itemContainer = itemContainers[i];
                    itemContainer.dataset.selectorIndex = i;
                    let item = Object.create(BaseSelectorItem);
                    item.init({
                        container: itemContainer,
                        index: i
                    });
                    items.push(item);
                }
                widget = Object.create(BaseSelector);
                break;
            case 'form-selector':
                for (let i = 0; i < itemContainers.length; i++) {
                    let itemContainer = itemContainers[i];
                    itemContainer.dataset.selectorIndex = i;
                    let input = getInput('radio', itemContainer);
                    if (!isHTMLElement(input)) {
                        return ErrorCode.BAD_INPUT;
                    }
                    input.dataset.selectorIndex = i;
                    let item = Object.create(FormSelectorItem);
                    item.init({
                        container: itemContainer,
                        input: input,
                        index: i
                    });
                    items.push(item);
                }
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
