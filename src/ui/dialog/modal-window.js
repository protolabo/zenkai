import { isDerivedOf, isFunction, valOrDefault } from "@std/index.js";
import {
    getTemplate, cloneTemplate, removeChildren,
    createH3, createButton, appendChildren, isHTMLElement
} from "@dom/index.js";
import { show, hide } from "../utils/index.js.js";

const ModalWindow = {
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
        if (isDerivedOf(instance, ModalWindow) && isFunction(instance.extend)) {
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
        this.container = element.querySelector('.modalwindow');
        this.header = element.querySelector('.modalwindow-header');
        this.body = element.querySelector('.modalwindow-content');
        this.footer = element.querySelector('.modalwindow-footer');
    },
    show() {
        show(this.container);
        this.isActive = true;

        return this;
    },
    hide() {
        hide(this.container);
        this.isActive = false;

        return this;
    },
    open(callback) {
        if (isFunction(this.beforeOpen)) {
            this.beforeOpen();
        }

        this.container.classList.remove('close');
        setTimeout(() => {
            this.show();
            this.container.classList.add('open');
        }, 100);

        if (isFunction(callback)) {
            callback.call(this);
        }

        if (isFunction(this.afterOpen)) {
            this.afterOpen();
        }

        this.isActive = true;

        return this;
    },
    close(callback) {
        if (isFunction(this.beforeClose)) {
            this.beforeClose();
        }

        this.container.classList.remove('open');
        setTimeout(() => {
            if (this.container) {
                this.container.classList.add('close');
            }
        }, 100);

        if (isFunction(callback)) {
            callback.call(this);
        }

        if (isFunction(this.afterClose)) {
            this.afterClose();
        }

        this.isActive = false;

        return this;
    },
    destroy(callback) {
        this.close(() => {
            removeChildren(this.container);
            this.container.remove();
        });

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

        if (isFunction(callback)) {
            callback.call(this);
        }

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

export const ActionModalWindow = ModalWindow.create({
    params: null,
    btnOK: null,
    btnOKHandler: null,
    btnCancel: null,
    btnCancelHandler: null,
    extend() {
        this.params = {};
        this.title = createH3({ class: 'modalwindow-title' });
        hide(this.title);

        if (this.btnOK) {
            this.btnOK = createModalButton({ class: ['btn-add'] }, valOrDefault(this.btnOK.text, "OK"));
        }
        if (this.btnCancel) {
            this.btnCancel = createModalButton({ class: ['btn-cancel'] }, valOrDefault(this.btnCancel.text, "Annuler"));
        }
    },
    applyConfig(config) {
        if (this.btnOK && config.btnOK) {
            this.btnOK.textContent = valOrDefault(config.btnOK.text, "OK");
        }
        if (this.btnCancel && config.btnCancel) {
            this.btnCancel.textContent = valOrDefault(config.btnCancel.text, "Annuler");
        }
    },
    render() {
        this.header.appendChild(this.title);
        appendChildren(this.footer, [this.btnCancel, this.btnOK].filter((el) => isHTMLElement(el)));

        return this.container;
    },
    bindEvents() {
        if (isHTMLElement(this.btnOK)) {
            this.btnOK.addEventListener('click', () => {
                if (isFunction(this.btnOKHandler)) {
                    this.btnOKHandler.call(this);
                }
            });
        }
        if (isHTMLElement(this.btnCancel)) {
            this.btnCancel.addEventListener('click', () => {
                if (isFunction(this.btnCancelHandler)) {
                    this.btnCancelHandler.call(this);
                }
            });
        }
    }
});

function createModalButton(options, text) {
    var attr = {
        class: ['btn', 'btn-modal'].concat(options.class)
    };

    return createButton(attr, text);
}