(function (jsLabo) {
    const { DOM, FORM } = jsLabo;
    const form = DOM.getElement('.body');
    var floatingLabels = FORM.floatingLabel(form);
    var selectors = FORM.Selector(form);
    var sliders = FORM.Slider(form);
})(jsLabo);