(function (jsLabo) {
    const { DOM, FORM, UI } = jsLabo;
    const form = DOM.getElement('.body');
    var floatingLabels = FORM.floatingLabel(form);
    const selectors = FORM.Selector(form);

    var sliders = FORM.Slider(form);

    UI.Collapsible(form);
})(jsLabo);