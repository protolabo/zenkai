import { isFunction, isNullOrUndefined, valOrDefault } from '@std/index.js';
import { isHTMLElement } from '@dom/index.js';
import { getType, getComponents } from "../utils.js";
import { BaseSelector } from './base-selector.js';
import { FormSelector } from './form-selector.js';


const Name = {
    BaseSelector: 'selector',
    FormSelector: 'form-selector',
};

const toSelector = (name) => `[data-type="${name}"]`;

const Selector = {
    BaseSelector: toSelector(Name.BaseSelector),
    FormSelector: toSelector(Name.FormSelector),
};

const Selectors = [Selector.BaseSelector, Selector.FormSelector].join(',');

const isValid = (element) => RegExp('selector|form-selector').test(getType(element));

const isSelector = (element) => isHTMLElement(element) && isValid(element);

const TypeHandler = {
    'selector': (container) => Object.create(BaseSelector, {
        name: { value: Name.BaseSelector },
        container: { value: container },
        querySelector: { value: Selector.BaseSelector },
    }),
    'form-selector': (container) => Object.create(FormSelector, {
        name: { value: Name.FormSelector },
        container: { value: container },
        querySelector: { value: Selector.FormSelector },
    }),
};

export const SelectorManager = {
    /**
     * Creates a `selector`
     * @param {HTMLElement} container 
     * @param {string} [_type] 
     * @returns {BaseSelector|FormSelector}
     */
    create(container, _type) {
        if (!isHTMLElement(container)) {
            throw new TypeError("Missing container: A selector requires a container");
        }

        const type = valOrDefault(_type, getType(container));
        const handler = TypeHandler[type];

        if (!isFunction(handler)) {
            throw new Error(`Missing handler: The '${type}' field could not be handled`);
        }

        const widget = handler(container);

        return widget;
    },
    /**
     * Activates the `selector` found in the container
     * @param {HTMLElement} container 
     * @param {*} [_options] 
     * @returns {BaseSelector[]|FormSelector[]}
     */
    activate(container, _options) {
        const components = isSelector(container) ? [container] : getComponents(Selectors, container);
        const options = valOrDefault(_options, {});

        if (isNullOrUndefined(components)) {
            return null;
        }

        const selectors = [];

        for (let i = 0; i < components.length; i++) {
            let selector = this.create(components[i]);

            selector.init(options);

            selectors.push(selector);
        }

        return selectors;
    }
};