(function (ken) {
    const ihtml = (val, ival) => `${val}<i>${ken.valOrDefault(ival, '=')}</i>`;

    const obl = "<i class='bracket'>&lt;</i>";
    const obr = "<i class='bracket'>&gt;</i>";
    const cbl = "<i class='bracket'>&lt;/</i>";
    const cbr = "<i class='bracket'>/&gt;</i>";

    const isTextNode = (node) => node.nodeType === 3;

    const isEmpty = (node) => ken.isEmpty(node.nodeValue.trim());

    const main = ken.getElement('main');

    const codes = ken.getElements('.html-code-container');
    const htmlCodes = [];
    for (let i = 0; i < codes.length; i++) {
        let code = ken.getElement('.html-code', codes[i]);
        let btnCopy = ken.getElement('.btn-copy', codes[i]);
        btnCopy.dataset['index'] = i;
        htmlCodes.push(code.innerHTML);
        code.childNodes.forEach((node) => { if (isTextNode(node) && isEmpty(node)) node.remove(); });
        createAllChildren(code);
    }
    
    main.addEventListener('click', (e) => {
        var target = e.target;
        if (ken.hasClass(target, 'btn-copy')) {
            ken.addClass(target, 'click');
            ken.copytoClipboard(htmlCodes[target.dataset['index']].trim());
        }
    }, true);

    activateComponents(ken.getElement('.body'));

    function activateComponents(container) {
        ken.floatingLabel(container);
        ken.inputCounter(container);
        ken.Selector(container);
        ken.Switch(container);

        ken.Collapsible(container);
        ken.Accordion(container);
    }

    /**
     * Creates a block of HTML code
     * @param {HTMLElement} element 
     * @param {string} type 
     */
    function createCode(element, type) {
        type = ken.valOrDefault(type, element.tagName.toLowerCase());

        const output = ken.createSpan({ html: `${obl}${type}`, class: 'html-tag', data: { type: type } });
        for (let i = 0; i < element.children.length; i++) {
            let el = element.children.item(i);
            element.replaceChild(createCode(el), el);
        }
        encodeAttributes(element, output);
        encodeTextNodes(element);

        if (['input', 'img'].includes(type)) {
            output.innerHTML += ` ${cbr}`;
        } else {
            output.innerHTML += obr;
            output.innerHTML += element.innerHTML;
            output.appendChild(ken.createSpan({ html: `${cbl}${type}${obr}`, class: 'html-closing-tag' }));
        }

        return output;
    }

    function encodeAttributes(element, output) {
        var attributes = [];
        var attrs = element.attributes;
        for (const key in attrs) {
            if (ken.hasOwn(attrs, key)) {
                let attr = attrs[key];
                attributes.push(ken.createSpan({
                    html: ihtml(attr.nodeName),
                    class: 'html-attr',
                    data: { value: attr.nodeValue }
                }));
            }
        }
        ken.appendChildren(output, attributes);

        return output;
    }

    function encodeTextNodes(element) {
        element.childNodes.forEach((val) => {
            if (isTextNode(val) && !isEmpty(val))
                element.replaceChild(ken.createSpan({ text: val.nodeValue, class: 'text' }), val);
        });
    }

    /**
     * 
     * @param {HTMLElement} parent 
     */
    function createAllChildren(parent) {
        var children = parent.children;
        for (let i = 0; i < children.length; i++) {
            let element = children.item(i);
            let _element = createCode(element);
            _element.innerHTML += '\n';
            element.parentNode.replaceChild(_element, element);
        }
    }

})(zenkai);