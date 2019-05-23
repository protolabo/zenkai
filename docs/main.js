(function (jsLabo) {
    const { DOM, TYPE, FORM, UI } = jsLabo;

    const ihtml = (val, ival) => `${val}<i>${TYPE.valOrDefault(ival, '=')}</i>`;

    const isTextNode = (node) => node.nodeType === 3;

    const isEmpty = (node) => TYPE.isEmpty(node.nodeValue.trim());

    const codes = DOM.getElements('.html-code');
    for (let i = 0; i < codes.length; i++) {
        let code = codes[i];
        code.childNodes.forEach((node) => { if (isTextNode(node) && isEmpty(node)) node.remove(); });
        createAllChildren(code);
    }

    activateComponents(DOM.getElement('.body'));

    function activateComponents(container) {
        FORM.floatingLabel(container);
        FORM.Selector(container);
        FORM.Slider(container);

        UI.Collapsible(container);
    }

    function createInputCode(element) {
        if (!(element instanceof HTMLInputElement)) {
            return null;
        }

        const output = DOM.createSpan({ text: 'input', class: 'html-tag', data: { type: 'input' } });
        encodeAttributes(element, output, { type: element.type, name: element.name, value: element.value });
        encodeTextNodes(element);

        return output;
    }

    function createLabelCode(element) {
        if (!(element instanceof HTMLLabelElement)) {
            return null;
        }

        const output = DOM.createSpan({ text: 'label', class: 'html-tag', data: { type: 'label' } });
        encodeAttributes(element, output);
        encodeTextNodes(element);
        createChildren('input', element, createInputCode);
        output.innerHTML += "<i class='close'>></i>";
        output.innerHTML += element.innerHTML;
        output.appendChild(DOM.createSpan({ text: 'label', class: 'html-closing-tag' }));

        return output;
    }

    /**
     * Creates a block of HTML code
     * @param {HTMLElement} element 
     * @param {string} type 
     */
    function createBlockCode(element, type) {
        if (['div'].includes(element.tagName)) {
            return null;
        }
        type = TYPE.valOrDefault(type, element.tagName.toLowerCase());

        const output = DOM.createSpan({ text: type, class: 'html-tag', data: { type: type } });
        encodeAttributes(element, output);
        encodeTextNodes(element);
        createChildren('label', element, createLabelCode);
        createChildren('input', element, createInputCode);
        output.innerHTML += "<i class='close'>></i>";
        output.innerHTML += element.innerHTML;
        output.appendChild(DOM.createSpan({ text: type, class: 'html-closing-tag' }));

        return output;
    }


    /**
     * Creates a block of HTML code
     * @param {HTMLElement} element 
     * @param {string} type 
     */
    function createCode(element, type) {
        type = TYPE.valOrDefault(type, element.tagName.toLowerCase());

        const output = DOM.createSpan({ text: type, class: 'html-tag', data: { type: type } });
        for (let i = 0; i < element.children.length; i++) {
            let el = element.children.item(i);
            element.replaceChild(createCode(el), el);
        }
        encodeAttributes(element, output);
        encodeTextNodes(element);
        output.innerHTML += "<i class='close'>></i>";
        output.innerHTML += element.innerHTML;
        if (!['input', 'img'].includes(type)) {
            output.appendChild(DOM.createSpan({ text: type, class: 'html-closing-tag' }));
        }

        return output;
    }

    function encodeAttributes(element, output) {
        var attributes = [];
        var attrs = element.attributes;
        for (const key in attrs) {
            if (TYPE.hasOwn(attrs, key)) {
                let attr = attrs[key];
                attributes.push(DOM.createSpan({
                    html: ihtml(attr.nodeName),
                    class: 'html-attr',
                    data: { value: attr.nodeValue }
                }));
            }
        }
        DOM.appendChildren(output, attributes);

        return output;
    }

    function encodeTextNodes(element) {
        element.childNodes.forEach((val) => {
            if (isTextNode(val) && !isEmpty(val))
                element.replaceChild(DOM.createSpan({ text: val.nodeValue, class: 'text' }), val);
        });
    }

    /**
     * 
     * @param {HTMLElement} parent 
     */
    function createAllChildren(parent) {
        for (let i = 0; i < parent.children.length; i++) {
            let element = parent.children.item(i);
            element.parentNode.replaceChild(createCode(element), element);
        }
    }

    function createChildren(type, parent, callback) {
        var labels = DOM.getElements(type, parent);
        for (let i = 0; i < labels.length; i++) {
            let label = labels[i];
            label.parentNode.replaceChild(callback(label), label);
        }
    }

})(jsLabo);