import { isFunction, isNullOrUndefined, valOrDefault } from '@std/index.js';
import { isHTMLElement } from '@dom/index.js';
import { getType, getComponents, getInput } from "../utils.js";
import { BaseSwitch } from './base-switch.js';
import { FormSwitch } from './form-switch.js';


const Name = {
    BaseSwitch: 'switch',
    FormSwitch: 'form-switch',
};

const toSelector = (name) => `[data-type="${name}"]`;

const Selector = {
    BaseSwitch: toSelector(Name.BaseSwitch),
    FormSwitch: toSelector(Name.FormSwitch),
};

const Selectors = [Selector.BaseSwitch, Selector.FormSwitch].join(',');

const isValid = (element) => RegExp('switch|form-switch').test(getType(element));

const isSwitch = (element) => isHTMLElement(element) && isValid(element);


const TypeHandler = {
    'switch': (container) => Object.create(BaseSwitch, {
        name: { value: Name.BaseSwitch },
        container: { value: container },
        querySelector: { value: Selector.BaseSwitch },
    }),
    'form-switch': (container) => {
        const input = getInput('checkbox', container);

        if (!isHTMLElement(input)) {
            throw new Error("Missing input: FormSwitch requires an input in the container");
        }

        return Object.create(FormSwitch, {
            name: { value: Name.FormSwitch },
            container: { value: container },
            input: { value: input },
            querySelector: { value: Selector.FormSwitch },
        });
    }
};

export const SwitchManager = {
    /**
     * Creates a `switch`
     * @param {HTMLElement} container 
     * @param {string} [_type] 
     * @returns {BaseSwitch|FormSwitch}
     */
    create(container, _type) {
        if (!isHTMLElement(container)) {
            throw new TypeError("Missing container: A switch requires a container");
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
     * Activates the `switch` found in the container
     * @param {HTMLElement} container 
     * @param {*} [_options] 
     * @returns {BaseSelector[]|FormSelector[]}
     */
    activate(container, _options) {
        const components = isSwitch(container) ? [container] : getComponents(Selectors, container);
        const options = valOrDefault(_options, {});
    
        if (isNullOrUndefined(components)) {
            return null;
        }
    
        const switches = [];
    
        for (let i = 0; i < components.length; i++) {
            let switchWidget = this.create(components[i]);
    
            switchWidget.init(options);
    
            switches.push(switchWidget);
        }
    
        return switches;
    }
};