(function name(jsLabo) {
    // Namespace definition
    const { DOM, TYPE, AJAX } = jsLabo;
    // Api routes
    const API_ROUTE = `${globalhostname}services/ajax`;

    const btnUp = DOM.getElement('.btn-up');
    const btnSave = DOM.getElement('.btn[data-action="save"]');
    const formContainer = DOM.getElement('.form-content');
    const entity = {
        name: formContainer.dataset['entity'],
        section: formContainer.dataset['entitySection'],
        get route() {
            let formName = this.section;
            if (!TYPE.isNullOrWhitespace(formName)) {
                return `${API_ROUTE}/form/${entity}.json?form_name=${formName}`;
            }

            return `${API_ROUTE}/form/${this.name}.json`;
        },
        toString() { return this.name; }
    };

    function getEntity() {
        AJAX.GET(entity.route, function (response) {
            var tempContainer = DOM.createDiv({ html: JSON.parse(response).form.trim() });
            var form = DOM.getElement('form', tempContainer);

            DOM.preprendChild(formContainer, form);

            // add behaviour
            activateComponent(form);
            bindEvents();
        });
    }

    function activateComponent(form) {
        TEH.collapsible();
        TEH.accordion();
        TEH.floatingLabel(form);
        TEH.slider(form);
        $('select').select2();
    }

    function bindEvents() {
        const form = DOM.getElement('form', this.body);
        btnUp.addEventListener('click', function () { window.scrollTo(0, 0); });
        btnSave.addEventListener('click', function () {
            var formData = new FormData(form);
            AJAX.POST(`${API_ROUTE}/${entity}/add`, formData, (response) => {
                var html = JSON.parse(response);
                console.log(html);
            });
        });
        btnPreview.addEventListener('click', function () {
            var formData = new FormData(form);
            console.log("TODO: show form preview");
        });
        btnDelete.addEventListener('click', function () {
            var formData = new FormData(form);
            AJAX.DELETE(`${API_ROUTE}/${entity}/${id}/delete.json`, null, (response) => {
                notify.body = "resource delete success";
                notify.show();
            });
        });
    }

    getEntity();

})(jsLabo)