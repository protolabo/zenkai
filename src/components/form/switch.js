import { getElement, getElements, isHTMLElement } from '@dom/index.js';
import { isFunction, isString, isNullOrUndefined, isEmpty } from '@datatype/index.js';
import { check, setState, getState, getType } from './global.js';
import { getInput } from "./utils.js";

const NONE = -1;
const ERROR = -10;

const Status = {
    ON: 'on',
    OFF: 'off'
};

const SwitchFactory = {
    create(container, callback) {
        if (!isHTMLElement(container)) {
            console.error('%c@zenkai%c #Switch>%SwitchFactory:%c Container must be an HTML Element', "text-decoration: underline", "", "font-weight: bold;","font-weight: normal;");
            return ERROR;
        }

        var widget = null;
        switch (getType(container)) {
            case 'switch':
                widget = Object.create(BaseSwitch);
                break;
            case 'form-switch':
                widget = Object.create(FormSwitch);
                break;
        }
        Object.assign(widget, {
            container: container,
            querySelector: createDomQuery(widget),
            callback: isFunction(callback) ? callback : function (val, el) { }
        });


        return widget;
    }
};

const BaseSwitch = {
    name: 'switch',
    container: null,
    callback: null,
    activate() {
        if (getState(this.container) === Status.ON) {
            check(this.container, Status.ON);
        }

        // Bind events
        this.container.addEventListener('click', () => {
            setState(this.container, getState(this.container) === Status.ON ? Status.OFF : Status.ON);
            this.callback.call(this, this.container.dataset.value, this.container);
        });
    }
};

const FormSwitch = {
    name: 'form-switch',
    container: null,
    callback: null,
    activate() {
        var input = getInput('checkbox', this.container);
        
        // Init
        setState(this.container, input.checked ? Status.ON : Status.OFF);
        this.callback.call(this, input.value, this.container);

        // Bind events
        input.addEventListener('change', (e) => {
            setState(this.container, input.checked ? Status.ON : Status.OFF);
            this.callback.call(this, input.value, this.container);
        });
    }
};

const createDomQuery = (selector) => `[data-type="${selector.name}"]`;

const isSwitch = (element) => RegExp('switch|form-switch').test(element.dataset['type']);

const domQuery = [createDomQuery(BaseSwitch), createDomQuery(FormSwitch)].join(',');

function getSliders(container) {
    if (isHTMLElement(container)) {
        return isSwitch(container) ? [container] : getElements(domQuery, container);
    } else if (isString(container) && !isEmpty(container)) {
        let _container = getElement(container);
        return isNullOrUndefined(_container) ? NONE : getSliders(_container);
    } else if (isNullOrUndefined(container)) {
        return getElements(domQuery);
    }

    return NONE;
}

export function Switch(container, _callback) {
    const switches = getSliders(container);

    if (switches === NONE) {
        return null;
    }

    for (let i = 0; i < switches.length; i++) {
        let switchWidget = SwitchFactory.create(switches[i], _callback);
        switchWidget.activate();
    }

    return switches;
}