import { isDerivedOf, isFunction, valOrDefault } from "@std/index.js";
import { getTemplate, cloneTemplate, addClass, removeClass, removeChildren } from "@dom/index.js";
import { show, hide } from "../utils/index.js.js";

export const Notify = {
    context: null,
    /** @type {DocumentFragment} */
    template: null,
    /** @type {HTMLElement} */
    container: null,
    /** @type {HTMLElement} */
    header: null,
    /** @type {HTMLElement} */
    body: null,
    /** @type {HTMLElement} */
    footer: null,
    /** @type {Function} */
    beforeOpen: null,
    /** @type {Function} */
    afterOpen: null,
    /** @type {Function} */
    beforeClose: null,
    /** @type {Function} */
    afterClose: null,
    /** @type {boolean} */
    isActive: false,

    create(args) {
        var instance = Object.create(this);

        Object.assign(instance, args);
        if (isDerivedOf(instance, Notify) && isFunction(instance.extend)) {
            instance.extend();
        }

        return instance;
    },
    init(tplName, ctx) {
        this.template = getTemplate(`#${tplName}`);
        var content = cloneTemplate(this.template);
        if (content) {
            this.cacheDOM(content);
        }
        this.context = ctx;

        this.bindEvents();
        this.render();

        return this;
    },
    cacheDOM(element) {
        this.container = element.querySelector('.notify');
        this.header = element.querySelector('.notify-header');
        this.body = element.querySelector('.notify-content');
        this.footer = element.querySelector('.notify-footer');
    },
    show() { show(this.container); },
    hide() { hide(this.container); },
    open(time, callback) {
        const pseudotime = {
            SLOW: 5000,
            NORMAL: 3000,
            FAST: 1500
        };
        if (isFunction(this.beforeOpen)) {
            this.beforeOpen();
        }

        addClass(this.container, 'open');
        this.isActive = true;

        // Close notification after timeout
        setTimeout(() => {
            if (isFunction(this.beforeClose)) {
                this.beforeClose();
            }
            removeClass(this.container, 'open');
            if (isFunction(this.afterClose)) {
                this.afterClose();
            }
            this.isActive = false;
        }, valOrDefault(time, pseudotime.NORMAL));

        if (isFunction(callback)) {
            callback.call(this);
        }

        if (isFunction(this.afterOpen)) {
            this.afterOpen();
        }

        return this;
    },
    destroy() {
        removeChildren(this.container);
        this.container.remove();

        this.context = null;
        this.template = null;
        this.container = null;
        this.header = null;
        this.body = null;
        this.footer = null;
        this.beforeOpen = null;
        this.afterOpen = null;
        this.beforeClose = null;
        this.afterClose = null;
        this.isActive = false;

        return true;
    },
    render() {
        return this.container;
    },
    clear() {
        removeChildren(this.body);

        return this;
    },
    bindEvents() { }
};