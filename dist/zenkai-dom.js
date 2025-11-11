var zendom = (function (exports, index_js) {
    'use strict';

    /**
     * Gets the window's width
     * @memberof DOM
     */
    const windowWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    /**
     * Gets the window's height
     * @memberof DOM
     */
    const windowHeight = () => window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    /* istanbul ignore next */
    const isElementNode = (obj) => !index_js.isNullOrUndefined(obj) && obj.nodeType === Node.ELEMENT_NODE;

    /* istanbul ignore next */
    const isDocumentFragmentNode = (obj) => !index_js.isNullOrUndefined(obj) && obj.nodeType === Node.DOCUMENT_FRAGMENT_NODE;

    /**
     * Verifies that an object is a *Node*
     * @param {Element} obj 
     * @returns {boolean} Value indicating whether the object is an *Node*
     * @memberof DOM
     */
    const isNode = (obj) => obj instanceof Node;

    /**
     * Verifies that an object is a *NodeList*
     * @param {Element} obj 
     * @returns {boolean} Value indicating whether the object is an *NodeList*
     * @memberof DOM
     */
    const isNodeList = (obj) => obj instanceof NodeList;

    /**
     * Verifies that an object is an *Element*
     * @param {Element} obj 
     * @returns {boolean} Value indicating whether the object is an *Element*
     * @memberof DOM
     */
    const isElement = (obj) => isElementNode(obj) && obj instanceof Element;

    /**
     * Verifies that an object is an *HTML Element*
     * @param {Element} obj 
     * @param {string|string[]|string[][]} [kind] 
     * @returns {boolean} Value indicating whether the object is an *HTMLElement*
     * @memberof DOM
     */
    const isHTMLElement = (obj, kind) => {
        if (!(isElementNode(obj) && obj instanceof HTMLElement)) {
            return false;
        }

        if (index_js.isIterable(kind)) {
            return isHTMLElementKind(obj, Array.isArray(kind) ? kind : [kind]);
        }

        return true;
    };

    const TagNameMapping = {
        'a': "Anchor",
        'br': "BR",
        'dl': "DList",
        'datalist': "DataList",
        'fieldset': "FieldSet",
        'frameset': "FrameSet",
        'hr': "HR",
        'h1': "Heading",
        'h2': "Heading",
        'h3': "Heading",
        'h4': "Heading",
        'h5': "Heading",
        'h6': "Heading",
        'li': "LI",
        'ol': "OList",
        'optgroup': "OptGroup",
        'p': "Paragraph",
        'q': "Quote",
        'blockquote': "Quote",
        'caption': "TableCaption",
        'td': "TableCell",
        'th': "TableCell",
        'col': "TableCol",
        'tr': "TableRow",
        'tbody': "TableSection",
        'thead': "TableSection",
        'tfoot': "TableSection",
        'textarea': "TextArea",
        'ul': "UList",
    };

    /**
     * Verifies the tag of an *HTML Element*
     * @param {HTMLElement} element 
     * @param {string[]|string[][]} kinds
     * @returns {boolean}
     * @private
     */
    function isHTMLElementKind(element, kinds) {
        const isInstanceOf = (obj) => element instanceof obj;
        const hasTag = (tag) => element.tagName === tag.toUpperCase();
        const isOfType = (type) => Array.isArray(type) ? type.includes(element.type) : element.type === type;
        
        return kinds.some((kind) => {
            if (!index_js.isIterable(kind)) {
                return false;
            }

            var name = kind;
            var type = null;
            
            if (Array.isArray(kind)) {
                [name, type] = kind;
            }

            name = name.toLowerCase();
            var interfaceName = `HTML${index_js.hasOwn(TagNameMapping, name) ? TagNameMapping[name] : index_js.pascalCase(name)}Element`;

            if (!(isInstanceOf(window[interfaceName]) || hasTag(name))) {
                return false;
            }

            if (index_js.isCollection(type) && !index_js.isEmpty(type)) {
                return isOfType(type);
            }

            return true;
        });
    }

    /**
     * Verifies that an object is an *HTMLCollection*
     * @param {Element} obj 
     * @returns {boolean} Value indicating whether the object is an *HTMLCollection*
     * @memberof DOM
     */
    const isHTMLCollection = (obj) => obj instanceof HTMLCollection;

    /**
     * Verifies that an object is an *DocumentFragment*
     * @param {Element} obj 
     * @returns {boolean} Value indicating whether the object is an *DocumentFragment*
     * @memberof DOM
     */
    const isDocumentFragment = (obj) => isDocumentFragmentNode(obj) && obj instanceof DocumentFragment;

    /**
     * Converts an html string to an HTML Element or a list of HTML Elements
     * @param {!string} prop 
     * @param {!string} html 
     * @private
     */
    /* istanbul ignore next */
    function _htmlToElement(prop, html) {
        if (!index_js.isString(html)) {
            return null;
        }

        var template = document.createElement('template');
        template.innerHTML = html.trim();

        return template.content[prop];
    }

    /**
     * Converts an html string to an HTML Element
     * @param {!string} html 
     * @returns {Node}
     * @memberof DOM
     */
    const htmlToElement = _htmlToElement.bind(null, 'firstChild');

    /**
     * Converts an html string to a list of HTML Elements
     * @param {!string} html 
     * @returns {NodeList}
     * @memberof DOM
     */
    const htmlToElements = _htmlToElement.bind(null, 'childNodes');

    /**
     * Verifies that an element is visible
     * @param {!HTMLElement} element 
     * @returns {boolean}
     * @memberof DOM
     */
    function isInViewport(element) {
        if (!isHTMLElement(element)) {
            throw new TypeError("Bad argument: The given 'element' is not a valid HTML Element");
        }

        const { top, right, bottom, left } = element.getBoundingClientRect();

        return top >= 0 && left >= 0 && bottom <= windowHeight() && right <= windowWidth();
    }

    /**
     * Verifies that an element is displayed inside a target element
     * @param {!HTMLElement} element 
     * @param {!HTMLElement} target
     * @returns {boolean}
     * @memberof DOM
     */
    function isInElement(element, target) {
        if (!index_js.all([element, target], isHTMLElement)) {
            throw new TypeError("Bad argument: The given 'element' is not a valid HTML Element");
        }

        const { top: top1, right: right1, bottom: bottom1, left: left1 } = element.getBoundingClientRect();
        const { top: top2, right: right2, bottom: bottom2, left: left2 } = target.getBoundingClientRect();

        return index_js.all([[top2, top1], [left2, left1], [right1, right2], [bottom1, bottom2]], (inner, outer) => inner <= outer);
    }



    /**
     * Computes the delta
     * @param {number} x 
     * @param {number} y 
     */
    const delta = (x, y) => Math.abs(x - y);

    const margin = {
        "top": (style) => style.marginTop,
        "right": (style) => style.marginRight,
        "bottom": (style) => style.marginBottom,
        "left": (style) => style.marginLeft,
    };

    const padding = {
        "top": (style) => style.paddingTop,
        "right": (style) => style.paddingRight,
        "bottom": (style) => style.paddingBottom,
        "left": (style) => style.paddingLeft,
    };

    const border = {
        "top": (style) => style.borderTopWidth,
        "right": (style) => style.borderRightWidth,
        "bottom": (style) => style.borderBottomWidth,
        "left": (style) => style.borderLeftWidth,
    };


    /**
     * Verifies if an element is the closest to a direction of a container
     * @param {HTMLElement} source 
     * @param {HTMLElement} container 
     * @param {string} dir 
     */
    function isClosestTo(source, container, dir) {
        const sourceStyle = window.getComputedStyle(source);
        const containerStyle = window.getComputedStyle(container);

        const sourceMargin = margin[dir](sourceStyle);
        const containerPadding = padding[dir](containerStyle);
        const containerBorder = border[dir](containerStyle);

        let sourceDistance = source.getBoundingClientRect()[dir] + pixelToNumber(sourceMargin);
        let containerDistance = container.getBoundingClientRect()[dir] - pixelToNumber(containerPadding) - pixelToNumber(containerBorder);

        return delta(sourceDistance, containerDistance) < 2;
    }


    /**
     * Gets the first visible element
     * @param {HTMLElement} parent 
     */
    function getVisibleElement(parent) {
        for (let i = 0; i < parent.children.length; i++) {
            const element = parent.children[i];

            if (!isHidden(element)) {
                return element;
            }
        }

        return null;
    }

    /**
     * Get closest element from a direction inside an optional container
     * @param {HTMLElement} source 
     * @param {string} dir 
     * @param {HTMLElement} container 
     * @param {boolean} relative 
     */
    function getClosest(source, dir, container, relative) {
        if (dir === "up") {
            return getElementTop(source, container, relative);
        } else if (dir === "down") {
            return getElementBottom(source, container, relative);
        } else if (dir === "left") {
            return getElementLeft(source, container, relative);
        } else if (dir === "right") {
            return getElementRight(source, container, relative);
        }

        console.error("unknown direction", dir);

        return null;
    }


    /**
     * Get closest element above a source element inside an optional container
     * @param {HTMLElement} source 
     * @param {HTMLElement} container 
     * @param {boolean} relative 
     */
    function getElementTop(source, container, relative = true) {
        const items = container.children;

        const { top: top1, left: left1 } = source.getBoundingClientRect();

        if (relative && isClosestTo(source, container, "top")) {
            return null;
        }

        let closest = null;

        let vdist = 99999;
        let hdist = 99999;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            if (isHidden(item) || item.classList.contains("badge") || item === source) {
                continue;
            }

            const { bottom: bottom2, left: left2 } = item.getBoundingClientRect();

            let $vdist = Math.abs(top1 - bottom2);
            let $hdist = Math.abs(left1 - left2);

            if (top1 >= (bottom2 - 1) && ($vdist < vdist || ($vdist === vdist && $hdist < hdist))) {
                closest = item;
                vdist = $vdist;
                hdist = $hdist;
            }
        }

        return closest;
    }



    /**
     * Get closest element on the left of a source element inside an optional container
     * @param {HTMLElement} source 
     * @param {HTMLElement} container 
     */
    function getElementLeft(source, container, relative = true) {
        const items = container.children;

        const { top: top1, left: left1 } = source.getBoundingClientRect();

        if (relative && isClosestTo(source, container, "left")) {
            return null;
        }

        let closest = null;

        let vdist = 99999;
        let hdist = 99999;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            if (isHidden(item) || item.classList.contains("badge") || item === source) {
                continue;
            }

            const { top: top2, right: right2 } = item.getBoundingClientRect();

            let $vdist = Math.abs(top1 - top2);
            let $hdist = Math.abs(left1 - right2);

            if (left1 >= (right2 - 1) && ($hdist < hdist || ($hdist === hdist && $vdist < vdist))) {
                closest = item;
                vdist = $vdist;
                hdist = $hdist;
            }
        }

        return closest;
    }

    /**
     * Get closest element on the right of a source element inside an optional container
     * @param {HTMLElement} source 
     * @param {HTMLElement} container 
     */
    function getElementRight(source, container, relative = true) {
        const items = container.children;

        const { top: top1, right: right1 } = source.getBoundingClientRect();

        if (relative && isClosestTo(source, container, "right")) {
            return null;
        }

        let closest = null;

        let vdist = 99999;
        let hdist = 99999;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            if (isHidden(item) || item.classList.contains("badge") || item === source) {
                continue;
            }

            const { top: top2, left: left2 } = item.getBoundingClientRect();

            let $vdist = Math.abs(top1 - top2);
            let $hdist = Math.abs(right1 - left2);

            if (right1 <= (left2 + 1) && ($hdist < hdist || ($hdist === hdist && $vdist < vdist))) {
                closest = item;
                vdist = $vdist;
                hdist = $hdist;
            }
        }

        return closest;
    }


    /**
     * Get closest element below a source element inside an optional container
     * @param {HTMLElement} source 
     * @param {HTMLElement} container 
     */
    function getElementBottom(source, container, relative = true) {
        const items = container.children;

        const { bottom: bottom1, left: left1 } = source.getBoundingClientRect();

        if (relative && isClosestTo(source, container, "bottom")) {
            return null;
        }

        let closest = null;

        let vdist = 99999;
        let hdist = 99999;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            if (isHidden(item) || item.classList.contains("badge") || item === source) {
                continue;
            }

            const { top: top2, left: left2 } = item.getBoundingClientRect();

            let $vdist = Math.abs(bottom1 - top2);
            let $hdist = Math.abs(left1 - left2);

            if (bottom1 <= (top2 + 1) && ($vdist < vdist || ($vdist === vdist && $hdist < hdist))) {
                closest = item;
                vdist = $vdist;
                hdist = $hdist;
            }
        }

        return closest;
    }


    /**
     * Returns the closest element to the top of its parent container
     * @param {HTMLElement} container 
     * @returns {HTMLElement|null} The closest element to the top.
     */
    function getTopElement(container, pred) {
        const items = container.children;

        const { top: top1, left: left1 } = container.getBoundingClientRect();

        if (items.length === 0) {
            return null;
        }

        const usePred = isFunction(pred);
        let closest = null;

        let vdist = 99999;
        let hdist = 99999;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            if (usePred && !pred(item)) {
                continue;
            }

            if (isHidden(item) || item.classList.contains("badge")) {
                continue;
            }

            const { top: top2, left: left2 } = item.getBoundingClientRect();

            let $vdist = Math.abs(top1 - top2);
            let $hdist = Math.abs(left1 - left2);

            if (top1 <= (top2 + 1) && ($vdist < vdist || ($vdist === vdist && $hdist < hdist))) {
                closest = item;
                vdist = $vdist;
                hdist = $hdist;
            }
        }

        return closest;
    }

    /**
     * Returns the closest element to the left side of its parent container
     * @param {HTMLElement} container 
     * @returns {HTMLElement|null} The closest element to the left side.
     */
    function getLeftElement(container, pred) {
        const items = container.children;

        const { top: top1, left: left1 } = container.getBoundingClientRect();

        if (items.length === 0) {
            return null;
        }

        const usePred = isFunction(pred);
        let closest = null;

        let vdist = 99999;
        let hdist = 99999;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            if (usePred && !pred(item)) {
                continue;
            }

            if (isHidden(item) || item.classList.contains("badge")) {
                continue;
            }

            const { top: top2, left: left2 } = item.getBoundingClientRect();

            let $vdist = Math.abs(top1 - top2);
            let $hdist = Math.abs(left1 - left2);

            if (left1 <= (left2 + 1) && ($hdist < hdist || ($hdist === hdist && $vdist < vdist))) {
                closest = item;
                vdist = $vdist;
                hdist = $hdist;
            }
        }

        return closest;
    }

    /**
     * Returns the closest element to the right side of its parent container
     * @param {HTMLElement} container 
     * @returns {HTMLElement|null} The closest element to the right side.
     */
    function getRightElement(container, pred) {
        const items = container.children;

        const { top: top1, right: right1 } = container.getBoundingClientRect();

        if (items.length === 0) {
            return null;
        }

        const usePred = isFunction(pred);
        let closest = null;

        let vdist = 99999;
        let hdist = 99999;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            if (usePred && !pred(item)) {
                continue;
            }

            if (isHidden(item) || item.classList.contains("badge")) {
                continue;
            }

            const { top: top2, right: right2 } = item.getBoundingClientRect();

            let $vdist = Math.abs(top1 - top2);
            let $hdist = Math.abs(right1 - right2);

            if (right1 >= (right2 - 1) && ($hdist < hdist || ($hdist === hdist && $vdist < vdist))) {
                closest = item;
                vdist = $vdist;
                hdist = $hdist;
            }
        }

        return closest;
    }

    /**
     * Returns the closest element to the bottom of its parent container
     * @param {HTMLElement} container 
     * @returns {HTMLElement|null} The closest element to the bottom.
     */
    function getBottomElement(container, pred) {
        const items = container.children;

        const { bottom: bottom1, left: left1 } = container.getBoundingClientRect();

        if (items.length === 0) {
            return null;
        }

        const usePred = isFunction(pred);
        let closest = null;

        let vdist = 99999;
        let hdist = 99999;

        for (let i = 0; i < items.length; i++) {
            const item = items[i];

            if (usePred && !pred(item)) {
                continue;
            }

            if (isHidden(item) || item.classList.contains("badge")) {
                continue;
            }

            const { bottom: bottom2, left: left2 } = item.getBoundingClientRect();

            let $vdist = Math.abs(bottom1 - bottom2);
            let $hdist = Math.abs(left1 - left2);

            if (bottom1 >= (bottom2 - 1) && ($vdist < vdist || ($vdist === vdist && $hdist < hdist))) {
                closest = item;
                vdist = $vdist;
                hdist = $hdist;
            }
        }

        return closest;
    }

    /**
     * Removes additional spaces in class attribute
     * @param {string} val class attribute's value
     * @returns {string} formatted value
     * @private
     */
    const formatClass = (val) => val.replace(/\s+/g, ' ').trim();


    /**
     * Add classes to an element
     * @param {HTMLElement} element 
     * @param {string|string[]} value 
     * @private
     * @memberof DOM
     */
    function addClass(element, value) {
        if (!index_js.isIterable(value)) {
            throw new TypeError("Bad argument: The passed `value` argument is not a string or array");
        }

        if (Array.isArray(value)) {
            element.classList.add(...value);
        } else {
            let formattedValue = formatClass(value);

            if (index_js.isNullOrWhitespace(element.className)) {
                element.className = formattedValue;
            } else {
                addClass(element, formattedValue.split(' '));
            }
        }

        return element;
    }

    /**
     * Assigns a value to an attribute
     * @param {HTMLElement} element 
     * @param {string} key 
     * @param {string} value 
     * @private
     */
    function assign(element, key, value) {
        element[key] = value;
    }

    /**
     * Assigns a value to an attribute
     * @param {HTMLElement} element 
     * @param {string} key 
     * @param {Object} value 
     * @private
     */
    function assignObject(element, key, value) {
        Object.assign(element[key], value);
    }

    /**
     * Assigns a value to an attribute
     * @param {HTMLElement} element 
     * @param {string} key 
     * @param {Object} value 
     * @private
     */
    function assignAttribute(element, key, value) {
        element.setAttribute(key, value);
    }

    const GLOBAL_ATTRIBUTES = "accesskey,autocapitalize,class,dataset,editable,draggable,hidden,id,inputmode,lang,style,tabindex,title";

    const AttributeHandler = {
        // Global attributes
        accesskey: [assign, 'accessKey'],
        autocapitalize: [assign, 'autocapitalize'],
        class: [addClass],
        dataset: [assignObject, 'dataset'],
        draggable: [assign, 'draggable'],
        editable: [assign, 'contentEditable'],
        hidden: [assign, 'hidden'],
        id: [assign, 'id'],
        inputmode: [assign, 'inputMode'],
        lang: [assign, 'lang'],
        html: [assign, 'innerHTML'],
        style: [assign, 'style'],
        tabindex: [assign, 'tabIndex'],
        text: [assign, 'textContent'],
        title: [assign, 'title'],
        // Anchor attributes
        download: [assign, 'download'],
        ping: [assign, 'ping'],
        target: [assign, 'target'],
        // Area attributes
        coords: [assign, 'coords'],
        shape: [assign, 'shape'],
        // Audio/Video attributes
        autoplay: [assign, 'autoplay'],
        buffered: [assign, 'buffered'],
        controls: [assign, 'controls'],
        loop: [assign, 'loop'],
        muted: [assign, 'muted'],
        playsinline: [assignAttribute, 'playsinline'],
        poster: [assign, 'poster'],
        preload: [assign, 'preload'],
        // Form attributes
        accept: [assign, 'accept'],
        "accept-charset": [assign, 'acceptCharset'],
        action: [assign, 'action'],
        autocomplete: [assign, 'autocomplete'],
        autofocus: [assign, 'autofocus'],
        capture: [assign, 'capture'],
        checked: [assign, 'checked'],
        cols: [assign, 'cols'],
        disabled: [assign, 'disabled'],
        dirname: [assign, 'dirName'],
        enctype: [assign, 'enctype'],
        for: [assign, 'htmlFor'],
        form: [assign, 'form'],
        formaction: [assign, 'formAction'],
        formenctype: [assign, 'formEnctype'],
        formmethod: [assign, 'formMethod'],
        formnovalidate: [assign, 'formNoValidate'],
        formtarget: [assign, 'formTarget'],
        high: [assign, 'high'],
        label: [assign, 'label'],
        list: [assign, 'list'],
        low: [assign, 'low'],
        max: [assign, 'max'],
        maxlength: [assign, 'maxLength'],
        method: [assign, 'method'],
        min: [assign, 'min'],
        minlength: [assign, 'minLength'],
        multiple: [assign, 'multiple'],
        novalidate: [assign, 'noValidate'],
        optimum: [assign, 'optimum'],
        pattern: [assign, 'pattern'],
        placeholder: [assign, 'placeholder'],
        readonly: [assign, 'readOnly'],
        required: [assign, 'required'],
        rows: [assign, 'rows'],
        selected: [assign, 'selected'],
        size: [assign, 'size'],
        spellcheck: [assignAttribute, 'spellcheck'],
        step: [assign, 'step'],
        wrap: [assign, 'wrap'],
        // Image attributes
        crossorigin: [assign, 'crossOrigin'],
        decoding: [assign, 'decoding'],
        height: [assign, 'height'],
        ismap: [assign, 'isMap'],
        loading: [assign, 'loading'],
        srcset: [assign, 'srcset'],
        width: [assign, 'width'],
        // Link attributes
        alt: [assign, 'alt'],
        as: [assign, 'as'],
        media: [assign, 'media'],
        rel: [assign, 'rel'],
        src: [assign, 'src'],
        sizes: [assign, 'sizes'],
        // List attributes
        reversed: [assign, 'reversed'],
        start: [assign, 'start'],
        // Meta attributes
        charset: [assignAttribute, 'charset'],
        content: [assign, 'content'],
        "http-equiv": [assign, 'httpEquiv'],
        // Object attributes
        data: [assign, 'data'],
        // Quote attributes
        cite: [assign, 'cite'],
        // Table attributes
        abbr: [assign, 'abbr'],
        colspan: [assign, 'colSpan'],
        span: [assign, 'span'],
        rowspan: [assign, 'rowSpan'],
        scope: [assign, 'scope'],
        // Track attributes
        default: [assign, 'default'],
        kind: [assign, 'kind'],
        srclang: [assign, 'srclang'],
        // Mix attributes
        href: [assign, 'href'],
        hreflang: [assign, 'hreflang'],
        datetime: [assign, 'dateTime'],
        name: [assign, 'name'],
        type: [assign, 'type'],
        value: [assign, 'value'],
        usemap: [assign, 'useMap'],
    };


    /**
     * Sets the attributes of an element
     * @param {!HTMLElement} element element
     * @param {Object} attribute attribute
     * @returns {HTMLElement}
     * @memberof DOM
     */
    function addAttributes(element, attribute, validAttributes) {
        if (!isHTMLElement(element)) {
            throw new TypeError("Bad argument: The given 'element' argument is not a valid HTML Element");
        }

        if (!index_js.isObject(attribute)) {
            return element;
        }

        const isValid = (key) => GLOBAL_ATTRIBUTES.includes(key) || index_js.isNullOrUndefined(validAttributes) || validAttributes.includes(key);

        for (const key of Object.keys(attribute)) {
            if (isValid(key)) {
                let value = attribute[key];
                let args = AttributeHandler[key].slice(0);
                let fn = args.shift();

                if (!index_js.isNullOrUndefined(value)) {
                    fn(element, ...args, value);
                }
            }
        }

        return element;
    }

    /**
     * Changes the selected option of a `<select>` element
     * @param {!HTMLSelectElement} select
     * @param {!string} optValue option value to select
     * @returns {boolean} value indicating whether the option was found and selected
     * @memberof DOM
     */
    function changeSelectedValue(select, optValue) {
        if (!isHTMLElement(select, "select")) {
            throw new TypeError("Bad argument: The given 'select' argument is not a valid HTML Select element");
        }

        if (!(index_js.isString(optValue) || index_js.isObject(optValue))) {
            throw new TypeError("Bad argument: The given 'optValue' argument is a null or undefined");
        }

        /**
         * Object equality
         * @param {HTMLOptionElement} option 
         * @param {*} obj 
         */
        const objectEq = (option, obj) => option.value === obj.value || option.text === obj.text;

        /**
         * String equality
         * @param {HTMLOptionElement} option 
         * @param {string} obj 
         */
        const stringEq = (option, value) => option.value === value;

        const eqHandler = index_js.isString(optValue) ? stringEq : objectEq;

        const { options, multiple } = select;

        for (let i = 0; i < options.length; i++) {
            let option = options[i];

            if (eqHandler(option, optValue)) {
                if (!multiple) {
                    Array.from(select.selectedOptions).forEach(opt => opt.selected = false);
                }
                option.selected = true;

                return true;
            }
        }

        return false;
    }

    /**
     * Creates an empty element with attributes
     * @param {string} tagName 
     * @param {string} [_validAttributes] 
     * @param {object} [_attributes] 
     * @returns {HTMLElement}
     * @private
     */
    /* istanbul ignore next */
    function createEmptyElement(tagName, _validAttributes, _attributes) {
        const element = document.createElement(tagName);

        if (!isHTMLElement(element)) {
            return null;
        }

        if (index_js.isObject(_attributes)) {
            addAttributes(element, _attributes, index_js.valOrDefault(_validAttributes, ""));
        }

        return element;
    }

    /**
     * Creates an element with attributes and content
     * @param {string} tagName 
     * @param {string} [_validAttributes] 
     * @param {Function} [contentResolver] 
     * @param {object} [_attributes] 
     * @param {Text|HTMLElement|HTMLElement[]} [_content] 
     * @returns {HTMLElement}
     * @private
     */
    /* istanbul ignore next */
    function createElement(tagName, _validAttributes, _attributes, _content) {
        const element = createEmptyElement(tagName, _validAttributes, _attributes);

        if (!isHTMLElement(element)) {
            return null;
        }

        if (!index_js.isNullOrUndefined(_content)) {
            addContent(element, _content);
        }

        return element;
    }


    // TODO: createScript

    // TODO: createStyle

    /**
     * Creates a document fragment
     * @function createDocFragment
     * @returns {DocumentFragment}
     * @memberof DOM
     */
    function createDocFragment(_children) {
        var fragment = document.createDocumentFragment();

        if (!index_js.isNullOrUndefined(_children)) {
            addContent(fragment, _children);
        }

        return fragment;
    }

    /**
     * Creates a text node
     * @function createTextNode
     * @param {string} text
     * @returns {Text}
     * @memberof DOM
     */
    const createTextNode = (text) => document.createTextNode(text);


    /******************************************************************************
     * Metadata Element
     *****************************************************************************/

    /**
     * Creates an `<base>` element with some attributes
     * @function createBase
     * @param {object} _attribute 
     * @returns {HTMLBaseElement}
     * @memberof DOM
     */
    const createBase = createEmptyElement.bind(null, "base", "href,target");

    /**
     * Creates a `<link>` element with some attributes
     * @function createLink
     * @param {object} _attribute Global attributes
     * @returns {HTMLLinkElement}
     * @memberof DOM
     */
    const createLink = createEmptyElement.bind(null, "link", "as,crossorigin,disabled,href,hreflang,media,rel,sizes,type");

    /**
     * Creates a `<meta>` element with some attributes
     * @function createLink
     * @param {object} _attribute Global attributes
     * @returns {HTMLMetaElement}
     * @memberof DOM
     */
    const createMeta = createEmptyElement.bind(null, "meta", "charset,content,http-equiv,name");

    /**
     * Creates a `<title>` element with some attributes
     * @function createTemplate
     * @param {object} _attribute Global attributes
     * @param {Text|HTMLElement|HTMLElement[]} _children Content
     * @returns {HTMLTitleElement}
     * @memberof DOM
     */
    const createTitle = createElement.bind(null, "title", "html,text");

    /**
     * Creates a `<template>` element with some attributes
     * @function createTemplate
     * @param {object} _attribute Global attributes
     * @param {Text|HTMLElement|HTMLElement[]} _children Content
     * @returns {HTMLTemplateElement}
     * @memberof DOM
     */
    const createTemplate = createElement.bind(null, "template", "html,text");


    /******************************************************************************
     * Sectionning Element
     *****************************************************************************/

    /**
     * Creates a `<header>` element with some attributes
     * @function createHeader
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLElement}
     * @memberof DOM
     */
    const createHeader = createElement.bind(null, "header", "html,text");

    /**
     * Creates an `<footer>` element with some attributes
     * @function createFooter
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLElement}
     * @memberof DOM
     */
    const createFooter = createElement.bind(null, "footer", "html,text");

    /**
     * Creates an `<main>` element with some attributes
     * @function createMain
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLElement}
     * @memberof DOM
     */
    const createMain = createElement.bind(null, "main", "html,text");

    /**
     * Creates an `<article>` element with some attributes
     * @function createArticle
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLElement}
     * @memberof DOM
     */
    const createArticle = createElement.bind(null, "article", "html,text");

    /**
     * Creates an `<section>` element with some attributes
     * @function createSection
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLElement}
     * @memberof DOM
     */
    const createSection = createElement.bind(null, "section", "html,text");

    /**
     * Creates an `<nav>` element with some attributes
     * @function createNav
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLElement}
     * @memberof DOM
     */
    const createNav = createElement.bind(null, "nav", "html,text");

    /**
     * Creates an `<aside>` element with some attributes
     * @function createAside
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLElement}
     * @memberof DOM
     */
    const createAside = createElement.bind(null, "aside", "html,text");


    /******************************************************************************
     * Heading Element
     *****************************************************************************/

    /**
     * Creates a `<h1>` element with some attributes
     * @function createH1
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLHeadingElement}
     * @memberof DOM
     */
    const createH1 = createElement.bind(null, "h1", "html,text");

    /**
     * Creates a `<h2>` element with some attributes
     * @function createH2
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLHeadingElement}
     * @memberof DOM
     */
    const createH2 = createElement.bind(null, "h2", "html,text");

    /**
     * Creates a `<h3>` element with some attributes
     * @function createH3
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLHeadingElement}
     * @memberof DOM
     */
    const createH3 = createElement.bind(null, "h3", "html,text");

    /**
     * Creates a `<h4>` element with some attributes
     * @function createH4
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLHeadingElement}
     * @memberof DOM
     */
    const createH4 = createElement.bind(null, "h4", "html,text");

    /**
     * Creates a `<h5>` element with some attributes
     * @function createH5
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLHeadingElement}
     * @memberof DOM
     */
    const createH5 = createElement.bind(null, "h5", "html,text");

    /**
     * Creates a `<h6>` element with some attributes
     * @function createH6
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLHeadingElement}
     * @memberof DOM
     */
    const createH6 = createElement.bind(null, "h6", "html,text");

    /**
     * Creates a `<div>` element with some attributes
     * @function createDiv
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLDivElement}
     * @memberof DOM
     */
    const createDiv = createElement.bind(null, "div", "html,text");



    /**
     * Creates a `<br>` element \
     * Line break (carriage-return)
     * @function createLineBreak
     * @returns {HTMLBRElement}
     * @memberof DOM
     */
    const createLineBreak = createEmptyElement.bind(null, "br", "");

    /**
     * Creates a `<hr>` element \
     * Thematic break
     * @function createThematicBreak
     * @returns {HTMLHRElement}
     * @memberof DOM
     */
    const createThematicBreak = createEmptyElement.bind(null, "hr", "");

    /**
     * Creates a `<p>` element with some attributes
     * @function createParagraph
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLParagraphElement}
     * @memberof DOM
     */
    const createParagraph = createElement.bind(null, "p", "html,text");


    /**
     * Creates a `<blockquote>` element with some attributes
     * @function createBlockQuotation
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLQuoteElement}
     * @memberof DOM
     */
    const createBlockQuotation = createElement.bind(null, "blockquote", "cite,html,text");

    /**
     * Creates a `<ul>` element with some attributes
     * @function createUnorderedList
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLUListElement}
     * @memberof DOM
     */
    const createUnorderedList = createElement.bind(null, "ul", "html");

    /**
     * Creates a `<ol>` element with some attributes
     * @function createOrderedList
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLOListElement}
     * @memberof DOM
     */
    const createOrderedList = createElement.bind(null, "ol", "html,reversed,start,type");

    /**
     * Creates a `<li>` element with some attributes
     * @function createListItem
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLLIElement}
     * @memberof DOM
     */
    const createListItem = createElement.bind(null, "li", "html,text,value");


    /**
     * Creates a `<dl>` element with some attributes
     * @function createDescriptionList
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLDListElement}
     * @memberof DOM
     */
    const createDescriptionList = createElement.bind(null, "dl", "html");

    /**
     * Creates a `<dt>` element with some attributes
     * @function createDescriptionTerm
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLElement}
     * @memberof DOM
     */
    const createDescriptionTerm = createElement.bind(null, "dt", "html,text");

    /**
     * Creates a `<dd>` element with some attributes
     * @function createDescriptionDetails
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLElement}
     * @memberof DOM
     */
    const createDescriptionDetails = createElement.bind(null, "dd", "html,text");

    /******************************************************************************
     * Inline Element
     *****************************************************************************/

    /**
     * Creates an `<a>` element with some attributes
     * @function createAnchor
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLAnchorElement}
     * @memberof DOM
     */
    const createAnchor = createElement.bind(null, "a", "download,href,hreflang,html,ping,rel,target,text,type");

    /**
     * Creates an `<area>` element with some attributes
     * @function createArea
     * @param {object} _attribute 
     * @returns {HTMLAreaElement}
     * @memberof DOM
     */
    const createArea = createEmptyElement.bind(null, "area", "alt,coords,download,href,hreflang,media,ping,rel,shape,target");


    /******************************************************************************
     * Embedded Element
     *****************************************************************************/

    /**
     * Creates a `<audio>` element with some attributes
     * @function createAudio
     * @param {object} _attribute
     * @param {Text|HTMLElement|HTMLElement[]} _children
     * @returns {HTMLAudioElement}
     * @memberof DOM
     */
    const createAudio = createElement.bind(null, "audio", "autoplay,controls,crossorigin,html,loop,muted,preload,src,text");

    /**
     * Creates a `<img>` element with some attributes
     * @function createImage
     * @param {object} _attribute 
     * @returns {HTMLImageElement}
     * @memberof DOM
     */
    const createImage = createEmptyElement.bind(null, "img", "alt,crossorigin,decoding,height,ismap,loading,sizes,src,srcset,usemap,width");

    /**
     * Creates a `<embed>` element with some attributes
     * @function createEmbed
     * @param {object} _attribute 
     * @returns {HTMLEmbedElement}
     * @memberof DOM
     */
    const createEmbed = createEmptyElement.bind(null, "embed", "height,src,type,width");

    /**
     * Creates a `<figure>` element with some attributes
     * @function createFigure
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLElement}
     * @memberof DOM
     */
    const createFigure = createElement.bind(null, "figure", "html,text");

    /**
     * Creates a `<figcaption>` element with some attributes
     * @function createFigureCaption
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLElement}
     * @memberof DOM
     */
    const createFigureCaption = createElement.bind(null, "figcaption", "html,text");

    /**
     * Creates a `<object>` element with some attributes
     * @function createObject
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLObjectElement}
     * @memberof DOM
     */
    const createObject = createElement.bind(null, "object", "data,height,html,name,text,type,usemap,width");

    /**
     * Creates a `<picture>` element with some attributes
     * @function createPicture
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLPictureElement}
     * @memberof DOM
     */
    const createPicture = createElement.bind(null, "picture", "html");

    /**
     * Creates a `<source>` element with some attributes
     * @function createSource
     * @param {object} _attribute
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLSourceElement}
     * @memberof DOM
     */
    const createSource = createEmptyElement.bind(null, "source", "media,sizes,src,srcset,type");

    /**
     * Creates a `<track>` element with some attributes
     * @function createTrack
     * @param {object} _attribute 
     * @returns {HTMLTrackElement}
     * @memberof DOM
     */
    const createTrack = createEmptyElement.bind(null, "track", "default,kind,label,src,srclang");

    /**
     * Creates a `<video>` element with some attributes
     * @function createVideo
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLVideoElement}
     * @memberof DOM
     */
    const createVideo = createElement.bind(null, "video", "autoplay,controls,crossorigin,height,html,loop,muted,playsinline,poster,preload,src,text,width");


    /**
     * Creates a `<span>` element with some attributes
     * @function createSpan
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLSpanElement}
     * @memberof DOM
     */
    const createSpan = createElement.bind(null, "span", "html,text");

    /**
     * Creates a `<strong>` element with some attributes
     * @function createStrong
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLElement}
     * @memberof DOM
     */
    const createStrong = createElement.bind(null, "strong", "html,text");

    /**
     * Creates a `<em>` element with some attributes
     * @function createEmphasis
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLElement}
     * @memberof DOM
     */
    const createEmphasis = createElement.bind(null, "em", "html,text");

    /**
     * Creates a `<mark>` element with some attributes
     * @function createMark
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLElement}
     * @memberof DOM
     */
    const createMark = createElement.bind(null, "mark", "html,text");

    /**
     * Creates a `<samp>` element with some attributes
     * @function createSample
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLElement}
     * @memberof DOM
     */
    const createSample = createElement.bind(null, "samp", "html,text");

    /**
     * Creates a `<sub>` element with some attributes
     * @function createSubscript
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLElement}
     * @memberof DOM
     */
    const createSubscript = createElement.bind(null, "sub", "html,text");

    /**
     * Creates a `<sup>` element with some attributes
     * @function createSuperscript
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLElement}
     * @memberof DOM
     */
    const createSuperscript = createElement.bind(null, "sup", "html,text");

    /**
     * Creates a `<del>` element with some attributes
     * @function createDeletedPart
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLModElement}
     * @memberof DOM
     */
    const createDeletedPart = createElement.bind(null, "del", "cite,datetime");

    /**
     * Creates a `<ins>` element with some attributes
     * @function createInsertedPart
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLModElement}
     * @memberof DOM
     */
    const createInsertedPart = createElement.bind(null, "ins", "cite,datetime");

    /**
     * Creates a `<q>` element with some attributes
     * @function createQuote
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLQuoteElement}
     * @memberof DOM
     */
    const createQuote = createElement.bind(null, "q", "cite,html,text");

    /**
     * Creates a `<abbr>` element with some attributes
     * @function createAbbreviation
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLElement}
     * @memberof DOM
     */
    const createAbbreviation = createElement.bind(null, "abbr", "html,text");

    /**
     * Creates a `<b>` element with some attributes
     * @function createB
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLElement}
     * @memberof DOM
     */
    const createB = createElement.bind(null, "b", "html,text");

    /**
     * Creates a `<i>` element with some attributes
     * @function createI
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLElement}
     * @memberof DOM
     */
    const createI = createElement.bind(null, "i", "html,text");

    /**
     * Creates a `<s>` element with some attributes
     * @function createS
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLElement}
     * @memberof DOM
     */
    const createS = createElement.bind(null, "s", "html,text");

    /**
     * Creates a `<u>` element with some attributes
     * @function createU
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLElement}
     * @memberof DOM
     */
    const createU = createElement.bind(null, "u", "html,text");

    /**
     * Creates a `<cite>` element with some attributes
     * @function createCite
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLElement}
     * @memberof DOM
     */
    const createCite = createElement.bind(null, "cite", "html,text");

    /**
     * Creates a `<time>` element with optionally some attributes
     * @function createTime
     * @param {object} _attribute 
     * @returns {HTMLTimeElement}
     * @memberof DOM
     */
    const createTime = createElement.bind(null, "time", "datetime,html,text");

    /**
     * Creates a `<code>` element with some attributes
     * @function createCode
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLElement}
     * @memberof DOM
     */
    const createCode = createElement.bind(null, "code", "html,text");

    /**
     * Creates a `<form>` element with some attributes
     * @function createForm
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLFormElement}
     * @memberof DOM
     */
    const createForm = createElement.bind(null, "form", "accept-charset,action,autocomplete,enctype,html,method,name,novalidate,rel,target,text");

    /**
     * Creates an `<input>` element with some attributes
     * @function createInput
     * @param {object} _attribute 
     * @returns {HTMLInputElement}
     * @memberof DOM
     */
    const createInput = createEmptyElement.bind(null, "input", "accept,alt,autocomplete,autofocus,capture,checked,dirname,disabled,height,max,maxlength,minlength,min,multiple,name,pattern,placeholder,readonly,required,size,src,step,type,value,width");

    /**
     * Creates a `<textarea>` element with some attributes
     * @function createTextArea
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLTextAreaElement}
     * @memberof DOM
     */
    const createTextArea = createElement.bind(null, "textarea", "autocomplete,autofocus,cols,disabled,html,maxlength,minlength,name,placeholder,readonly,required,rows,spellcheck,text,value,wrap");

    /**
     * Creates a `<label>` element with some attributes
     * @function createLabel
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLLabelElement}
     * @memberof DOM
     */
    const createLabel = createElement.bind(null, "label", "for,html,text");

    /**
     * Creates a `<select>` element with some attributes
     * @function createSelect
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLSelectElement}
     * @memberof DOM
     */
    const createSelect = createElement.bind(null, 'select', "autocomplete,autofocus,disabled,html,multiple,name,required,size");

    /**
     * Creates a `<option>` element with some attributes
     * @function createOption
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLOptionElement}
     * @memberof DOM
     */
    const createOption = createElement.bind(null, "option", "disabled,html,label,selected,text,value");

    /**
     * Creates a `<optgroup>` element with some attributes
     * @function createOptionGroup
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLOptGroupElement}
     * @memberof DOM
     */
    const createOptionGroup = createElement.bind(null, "optgroup", "disabled,html,label");

    /**
     * Creates a `<fieldset>` element with some attributes
     * @function createFieldset
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLFieldSetElement}
     * @memberof DOM
     */
    const createFieldset = createElement.bind(null, "fieldset", "disabled,html,name,text");

    /**
     * Creates a `<legend>` element with some attributes
     * @function createLegend
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLLabelElement}
     * @memberof DOM
     */
    const createLegend = createElement.bind(null, "legend", "html,text");

    /**
     * Creates a `<datalist>` element with some attributes
     * @function createDataList
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLTextAreaElement}
     * @memberof DOM
     */
    const createDataList = createElement.bind(null, "datalist", "html");

    /**
     * Creates a `<meter>` element with some attributes
     * @function createMeter
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLTextAreaElement}
     * @memberof DOM
     */
    const createMeter = createElement.bind(null, "meter", "high,html,low,max,min,optimum,text,value");

    /**
     * Creates a `<progress>` element with some attributes
     * @function createProgress
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLTextAreaElement}
     * @memberof DOM
     */
    const createProgress = createElement.bind(null, "progress", "html,max,text,value");

    /**
     * Creates a `<output>` element with optionally some attributes and children elements
     * @function createOutput
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLTextAreaElement}
     * @memberof DOM
     */
    const createOutput = createElement.bind(null, "output", "html,name,text,value");

    /**
     * Creates a `<button>` element with optionally some attributes and children elements
     * @function createButton
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLButtonElement}
     * @memberof DOM
     */
    const createButton = createElement.bind(null, "button", "autofocus,disabled,formaction,formenctype,formmethod,formnovalidate,formtarget,html,name,text,type,value");

    /**
     * Creates a `<table>` element with some attributes
     * @function createTable
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLTableElement}
     * @memberof DOM
     */
    const createTable = createElement.bind(null, "table", "html");

    /**
     * Creates a `<caption>` element with some attributes
     * @function createCaption
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLTableCaptionElement}
     * @memberof DOM
     */
    const createCaption = createElement.bind(null, "caption", "html,text");

    /**
     * Creates a `<thead>` element with some attributes
     * @function createTableHeader
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLTableSectionElement}
     * @memberof DOM
     */
    const createTableHeader = createElement.bind(null, "thead", "html");

    /**
     * Creates a `<tbody>` element with some attributes
     * @function createTableBody
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLTableSectionElement}
     * @memberof DOM
     */
    const createTableBody = createElement.bind(null, "tbody", "html");

    /**
     * Creates a `<tfoot>` element with some attributes
     * @function createTableFooter
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLTableSectionElement}
     * @memberof DOM
     */
    const createTableFooter = createElement.bind(null, "tfoot", "html");

    /**
     * Creates a `<col>` element with some attributes
     * @function createTableColumn
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLTableColElement}
     * @memberof DOM
     */
    const createTableColumn = createEmptyElement.bind(null, "col", "span");

    /**
     * Creates a `<colgroup>` element with some attributes
     * @function createTableColumnGroup
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLTableColElement}
     * @memberof DOM
     */
    const createTableColumnGroup = createElement.bind(null, "colgroup", "html,span");

    /**
     * Creates a `<tr>` element with some attributes
     * @function createTableRow
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLTableRowElement}
     * @memberof DOM
     */
    const createTableRow = createElement.bind(null, "tr", "html");

    /**
     * Creates a `<th>` element with some attributes
     * @function createTableHeaderCell
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children 
     * @returns {HTMLTableCellElement}
     * @memberof DOM
     */
    const createTableHeaderCell = createElement.bind(null, "th", "abbr,colspan,html,rowspan,scope,text");

    /**
     * Creates a `<td>` element with some attributes
     * @function createTableCell
     * @param {object} _attribute 
     * @param {Text|HTMLElement|HTMLElement[]} _children
     * @returns {HTMLTableCellElement}
     * @memberof DOM
     */
    const createTableCell = createElement.bind(null, "td", "colspan,html,rowspan,text");

    /**
     * Appends the children to the element
     * @param {Node} element element
     * @param {HTMLCollection} content children elements
     * @private
     * @memberof DOM
     */
    /* istanbul ignore next */
    function addContent(element, content) {
        if (!(isNode(content) || index_js.isIterable(content))) {
            return element;
        }

        if (isNode(content) || index_js.isString(content)) {
            element.append(content);
        } else {
            element.append(...content);
        }

        return element;
    }

    /**
     * Checks whether the selector represents a `class`
     * @returns {boolean}
     * @private
     */
    const isClassSelector = (selector) => /^\.[a-zA-Z0-9_-]+$/.test(selector);

    /**
     * Checks whether the selector represents an `id`
     * @returns {boolean}
     * @private
     */
    const isIdSelector = (selector) => /^#[a-zA-Z0-9_-]+$/.test(selector);

    /**
     * Returns the first element within the specified container that matches the 
     * specified selector, group or selectors.
     * @param {!string} selector A DOMString containing one or more selectors to match
     * @param {HTMLElement|DocumentFragment} [_container] Container queried
     * @returns {HTMLElement|null} The first element matches that matches the specified set of CSS selectors.
     * @memberof DOM
     */
    function getElement(selector, _container) {
        const container = isNode(_container) ? _container : document;

        if (index_js.isNullOrWhitespace(selector)) {
            return null;
        }

        if (isDocumentFragment(container)) {
            return container.querySelector(selector);
        }

        if (isIdSelector(selector)) {
            return document.getElementById(selector.substring(1));
        }

        if (isClassSelector(selector)) {
            return container.getElementsByClassName(selector.substring(1))[0];
        }

        return container.querySelector(selector);
    }

    /**
     * Returns all elements that match the selector query.
     * @param {!string} selector A DOMString containing one or more selectors to match
     * @param {HTMLElement|DocumentFragment} [_container] Container queried
     * @returns {HTMLCollection|NodeList} A live or *static* (not live) collection of the `container`'s children Element that match the `selector`.
     * @memberof DOM
     */
    function getElements(selector, _container) {
        const container = isNode(_container) ? _container : document;

        if (index_js.isNullOrWhitespace(selector)) {
            return null;
        }

        if (isDocumentFragment(container)) {
            return container.querySelectorAll(selector);
        }

        if (isClassSelector(selector)) {
            return container.getElementsByClassName(selector.substring(1));
        }

        return container.querySelectorAll(selector);
    }

    /**
     * Returns the first Template within the specified container that matches the specified selector, group or selectors.
     * @param {string} selector A DOMString containing one or more selectors to match
     * @param {HTMLElement} [_container] Container queried
     * @returns {HTMLTemplateElement|null} The first Template matches that matches the specified set of CSS selectors.
     * @memberof DOM
     */
    function getTemplate(selector, _container) {
        return 'content' in document.createElement('template') ? getElement(selector, _container) : null;
    }

    /**
     * Returns a duplicate of the template.
     * @param {HTMLTemplateElement} template 
     * @param {boolean} deep used to decide whether the children of the template should also be clone
     * @returns {DocumentFragment} The template's clone.
     * @memberof DOM
     */
    function cloneTemplate(template, deep) {
        return template ? document.importNode(template.content, index_js.valOrDefault(deep, true)) : template;
    }

    /**
     * Gets the previous or next element of the specified element
     * @param {string} dir sibling direction
     * @param {HTMLElement} element element
     * @returns {(Element|null)} Element or null
     * @private
     */
    /* istanbul ignore next */
    function getElementSibling(dir, element, pred) {
        if (!isHTMLElement(element)) {
            return null;
        }

        var sibling = element[dir];

        if (index_js.isFunction(pred)) {
            while (isElement(sibling) && !pred(sibling)) {
                sibling = sibling[dir];
            }
        }

        return sibling;
    }

    /**
     * Gets the previous element of the specified one in its parent's children list
     * @function getPreviousElementSibling
     * @param {HTMLElement} el element
     * @param {*} pred Search end condition
     * @returns {(Element|null)} Element or null if the specified element is the first one in the list
     * @memberof DOM
     */
    const getPreviousElementSibling = getElementSibling.bind(null, "previousElementSibling");

    /**
     * Gets the element following the specified one in its parent's children list
     * @function getNextElementSibling
     * @param {HTMLElement} el element
     * @param {*} pred Search end condition
     * @returns {(Element|null)} Element or null if the specified element is the last one in the list
     * @memberof DOM
     */
    const getNextElementSibling = getElementSibling.bind(null, "nextElementSibling");

    /**
     * Finds an ancestor of an element
     * @param {!Element} target 
     * @param {!Function} pred Decides whether the target is found
     * @param {number} [_max] Maximum number of iterations
     * @returns {Element|null}
     * @memberof DOM
     */
    function findAncestor(target, pred, _max) {
        if (!isElement(target)) {
            throw new TypeError("Bad argument: The given target parameter is not a valid HTML Element");
        }

        if (!index_js.isFunction(pred)) {
            throw new TypeError("Bad argument: The given pred parameter is not a valid Function");
        }

        var parent = target.parentElement;

        if (_max > 0) {
            return findAncestorIter(parent, pred, _max - 1);
        }

        return findAncestorInf(parent, pred);
    }

    /**
     * Look an ancestor of an element using a callback
     * @param {Element} target 
     * @param {Function} pred Decides whether the target is found
     * @private
     */
    /* istanbul ignore next */
    function findAncestorInf(target, pred) {
        if (index_js.isNullOrUndefined(target)) {
            return null;
        }

        if (pred(target)) {
            return target;
        }

        return findAncestorInf(target.parentElement, pred);
    }

    /**
     * Look for an ancestor of an element using a callback with a maximum number of iteration
     * @param {Element} target 
     * @param {Function} pred Decides whether the target is found
     * @param {number} max Maximum number of iterations
     * @private
     */
    /* istanbul ignore next */
    function findAncestorIter(target, pred, max) {
        if (index_js.isNullOrUndefined(target) || max === 0) {
            return null;
        }

        if (pred(target)) {
            return target;
        }

        return findAncestorIter(target.parentElement, pred, max - 1);
    }

    /**
     * Removes all children of a node from the DOM or 
     * those that satisfy the predicate function if given
     * @param {!Node} node 
     * @param {Function} [_callback] Decides whether the node should be removed
     * @memberof DOM
     */
    function removeChildren(node, _callback) {
        if (!isNode(node)) {
            throw new TypeError("Bad argument: The given `node` is not a valid Node");
        }

        if (index_js.isFunction(_callback)) {
            Array.from(node.childNodes).forEach(n => {
                if (_callback(n)) {
                    node.removeChild(n);
                }
            });

            return node;
        }

        return removeAllChildren(node);

    }

    /**
     * Removes all children of a node from the DOM
     * @param {!Node} node 
     * @private
     */
    /* istanbul ignore next */
    function removeAllChildren(node) {
        while (node.hasChildNodes()) {
            node.removeChild(node.lastChild);
        }

        return node;
    }

    /**
     * Copies selected content to clipboard
     * @param {HTMLElement|string} value
     * @returns {boolean} Value indicating whether the content has been succesfully copied to the clipboard
     * @memberof DOM
     */
    function copytoClipboard(value) {
        if (index_js.isNullOrUndefined(value)) {
            return false;
        }

        var element = createTextArea({
            value: isHTMLElement(value) ? value.textContent : value.toString(),
            readonly: true
        });

        if(!isHTMLElement(element)) {
            return false;
        }

        document.body.appendChild(element);
        element.select();
        document.execCommand('copy');
        element.remove();

        return true;
    }

    exports.addAttributes = addAttributes;
    exports.changeSelectedValue = changeSelectedValue;
    exports.cloneTemplate = cloneTemplate;
    exports.copytoClipboard = copytoClipboard;
    exports.createAbbreviation = createAbbreviation;
    exports.createAnchor = createAnchor;
    exports.createArea = createArea;
    exports.createArticle = createArticle;
    exports.createAside = createAside;
    exports.createAudio = createAudio;
    exports.createB = createB;
    exports.createBase = createBase;
    exports.createBlockQuotation = createBlockQuotation;
    exports.createButton = createButton;
    exports.createCaption = createCaption;
    exports.createCite = createCite;
    exports.createCode = createCode;
    exports.createDataList = createDataList;
    exports.createDeletedPart = createDeletedPart;
    exports.createDescriptionDetails = createDescriptionDetails;
    exports.createDescriptionList = createDescriptionList;
    exports.createDescriptionTerm = createDescriptionTerm;
    exports.createDiv = createDiv;
    exports.createDocFragment = createDocFragment;
    exports.createEmbed = createEmbed;
    exports.createEmphasis = createEmphasis;
    exports.createFieldset = createFieldset;
    exports.createFigure = createFigure;
    exports.createFigureCaption = createFigureCaption;
    exports.createFooter = createFooter;
    exports.createForm = createForm;
    exports.createH1 = createH1;
    exports.createH2 = createH2;
    exports.createH3 = createH3;
    exports.createH4 = createH4;
    exports.createH5 = createH5;
    exports.createH6 = createH6;
    exports.createHeader = createHeader;
    exports.createI = createI;
    exports.createImage = createImage;
    exports.createInput = createInput;
    exports.createInsertedPart = createInsertedPart;
    exports.createLabel = createLabel;
    exports.createLegend = createLegend;
    exports.createLineBreak = createLineBreak;
    exports.createLink = createLink;
    exports.createListItem = createListItem;
    exports.createMain = createMain;
    exports.createMark = createMark;
    exports.createMeta = createMeta;
    exports.createMeter = createMeter;
    exports.createNav = createNav;
    exports.createObject = createObject;
    exports.createOption = createOption;
    exports.createOptionGroup = createOptionGroup;
    exports.createOrderedList = createOrderedList;
    exports.createOutput = createOutput;
    exports.createParagraph = createParagraph;
    exports.createPicture = createPicture;
    exports.createProgress = createProgress;
    exports.createQuote = createQuote;
    exports.createS = createS;
    exports.createSample = createSample;
    exports.createSection = createSection;
    exports.createSelect = createSelect;
    exports.createSource = createSource;
    exports.createSpan = createSpan;
    exports.createStrong = createStrong;
    exports.createSubscript = createSubscript;
    exports.createSuperscript = createSuperscript;
    exports.createTable = createTable;
    exports.createTableBody = createTableBody;
    exports.createTableCell = createTableCell;
    exports.createTableColumn = createTableColumn;
    exports.createTableColumnGroup = createTableColumnGroup;
    exports.createTableFooter = createTableFooter;
    exports.createTableHeader = createTableHeader;
    exports.createTableHeaderCell = createTableHeaderCell;
    exports.createTableRow = createTableRow;
    exports.createTemplate = createTemplate;
    exports.createTextArea = createTextArea;
    exports.createTextNode = createTextNode;
    exports.createThematicBreak = createThematicBreak;
    exports.createTime = createTime;
    exports.createTitle = createTitle;
    exports.createTrack = createTrack;
    exports.createU = createU;
    exports.createUnorderedList = createUnorderedList;
    exports.createVideo = createVideo;
    exports.findAncestor = findAncestor;
    exports.getBottomElement = getBottomElement;
    exports.getClosest = getClosest;
    exports.getElement = getElement;
    exports.getElementBottom = getElementBottom;
    exports.getElementLeft = getElementLeft;
    exports.getElementRight = getElementRight;
    exports.getElementTop = getElementTop;
    exports.getElements = getElements;
    exports.getLeftElement = getLeftElement;
    exports.getNextElementSibling = getNextElementSibling;
    exports.getPreviousElementSibling = getPreviousElementSibling;
    exports.getRightElement = getRightElement;
    exports.getTemplate = getTemplate;
    exports.getTopElement = getTopElement;
    exports.getVisibleElement = getVisibleElement;
    exports.htmlToElement = htmlToElement;
    exports.htmlToElements = htmlToElements;
    exports.isDocumentFragment = isDocumentFragment;
    exports.isElement = isElement;
    exports.isHTMLCollection = isHTMLCollection;
    exports.isHTMLElement = isHTMLElement;
    exports.isInElement = isInElement;
    exports.isInViewport = isInViewport;
    exports.isNode = isNode;
    exports.isNodeList = isNodeList;
    exports.removeChildren = removeChildren;
    exports.windowHeight = windowHeight;
    exports.windowWidth = windowWidth;

    return exports;

})({}, index_js);
