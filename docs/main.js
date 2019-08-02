(function ($Z) {
    const ihtml = (val, ival) => `${val}<i>${$Z.valOrDefault(ival, '=')}</i>`;

    const obl = "<i class='bracket'>&lt;</i>";
    const obr = "<i class='bracket'>&gt;</i>";
    const cbl = "<i class='bracket'>&lt;/</i>";
    const cbr = "<i class='bracket'>/&gt;</i>";

    const isTextNode = (node) => node.nodeType === 3;

    const isEmpty = (node) => $Z.isEmpty(node.nodeValue.trim());

    const main = $Z.getElement('main');

    const codes = $Z.getElements('.html-code-container');
    const htmlCodes = [];
    for (let i = 0; i < codes.length; i++) {
        let code = $Z.getElement('.html-code', codes[i]);
        let btnCopy = $Z.getElement('.btn-copy', codes[i]);
        btnCopy.dataset['index'] = i;
        htmlCodes.push(code.innerHTML);
        code.childNodes.forEach((node) => { if (isTextNode(node) && isEmpty(node)) node.remove(); });
        createAllChildren(code);
    }
    
    main.addEventListener('click', (e) => {
        var target = e.target;
        if ($Z.hasClass(target, 'btn-copy')) {
            $Z.addClass(target, 'click');
            $Z.copytoClipboard(htmlCodes[target.dataset['index']].trim());
        }
    }, true);

    activateComponents($Z.getElement('.body'));

    function activateComponents(container) {
        $Z.floatingLabel(container);
        $Z.Selector(container);
        $Z.Switch(container);

        $Z.Collapsible(container);
        $Z.Accordion(container);
    }

    /**
     * Creates a block of HTML code
     * @param {HTMLElement} element 
     * @param {string} type 
     */
    function createCode(element, type) {
        type = $Z.valOrDefault(type, element.tagName.toLowerCase());

        const output = $Z.createSpan({ html: `${obl}${type}`, class: 'html-tag', data: { type: type } });
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
            output.appendChild($Z.createSpan({ html: `${cbl}${type}${obr}`, class: 'html-closing-tag' }));
        }

        return output;
    }

    function encodeAttributes(element, output) {
        var attributes = [];
        var attrs = element.attributes;
        for (const key in attrs) {
            if ($Z.hasOwn(attrs, key)) {
                let attr = attrs[key];
                attributes.push($Z.createSpan({
                    html: ihtml(attr.nodeName),
                    class: 'html-attr',
                    data: { value: attr.nodeValue }
                }));
            }
        }
        $Z.appendChildren(output, attributes);

        return output;
    }

    function encodeTextNodes(element) {
        element.childNodes.forEach((val) => {
            if (isTextNode(val) && !isEmpty(val))
                element.replaceChild($Z.createSpan({ text: val.nodeValue, class: 'text' }), val);
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