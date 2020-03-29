import { isNullOrUndefined, valOrDefault, hasOwn } from '@std/index.js';
import { getComponentElement } from '../utils.js';
import { Factory, DOMQuerySelector } from "./factory.js";

const ErrorHandler = {
    BAD_CONTAINER: new Error("Missing container: A selector requires a container"),
    BAD_INPUT: new Error("Missing input: FormSelector requires an input in the container"),
};

const isSelector = (element) => RegExp('selector|form-selector').test(element.dataset['type']);

const domQuery = [DOMQuerySelector.BaseSelector, DOMQuerySelector.FormSelector].join(',');

export function Selector(container, _options) {
    const selectorElements = getComponentElement(container, isSelector, domQuery);
    var options = valOrDefault(_options, {});

    if (isNullOrUndefined(selectorElements)) {
        return null;
    }

    var selectors = [];

    for (let i = 0; i < selectorElements.length; i++) {
        let selector = Factory.create(selectorElements[i], options);
        if (hasOwn(ErrorHandler, selector)) {
            throw ErrorHandler[selector];
        }
        selector.init();

        selectors.push(selector);
    }

    return selectors;
}

export const SelectorFactory = Factory; 