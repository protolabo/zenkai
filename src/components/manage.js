(function (jsLabo) {
    const { DOM, AJAX } = jsLabo;

    // TEH.collapsible();
    // TEH.floatingLabel();
    // TEH.accordion();

    TDP.Table.create({
        name: 'unique-tdp-name',
        type: 'server',
        schema: APP.TDP.Schema['Situation'],
        options: {
            selectable: true,
            searchable: true,
            pagineable: false,
        },
        actions: {
            sort: {
                action: null,
                callback: () => console.log("Hello"),
            },
            delete: {
            },
            search: {
                action: { route: 'GET', params: { page: '$currentPage' }, query: { search: '$search' }, callback: () => console.log("Hello") },
                disabled: 'EMPTY',
            },
        },
        routes: {
            GET: 'api/listes-controlees/typecategories.json',
            GET_SITUATIONS: { path: '/api/situations.json' },
            DELETE: { path: '/api/situations.json' },
            UPDATE_STATUS: { path: 'api/listes-controlees/typecategories.json', params: ['status'] },
            GET_ALL: { path: 'api/listes-controlees/organismes.json/#page', params: { page: 1 } },
        },
    });
    //.init(TDP.API.getSituations(TDP.GET_SITUATIONS, { page: 1 }));

    const API_ROUTE = `${globalhostname}services/ajax`;

    const notify = createNotify();

    var tplBtnEdit = DOM.createButton({ class: 'btn btn-edit', html: '<i class="material-icons">edit</i>' });

    const TDPs = DOM.getElements('[data-tdp-entity]');
    TDPs.forEach(function (tdpContainer) {
        const entity = tdpContainer.dataset['tdpEntity'];

        // Create modal windows
        const modalCreate = createModal(
            null,
            function () {
                var self = this;
                const form = DOM.getElement('form', this.body);
                var formData = new FormData(form);
                var object = {};
                // Log formData entries
                for (const [key, value] of formData.entries()) {
                    console.log(key, value);
                }
                // FormData to JSON
                formData.forEach(function (value, key) {
                    object[key] = value;
                });
                var json = JSON.stringify(object);
                // Send form's data
                // Fallback
                // $.CENR.Request.SUBMIT($(form), { url:`${API_ROUTE}/echelles/add` });

                AJAX.POST(`${API_ROUTE}/${entity}/add`, formData, (response) => {
                    // var html = JSON.parse(response).form.trim();
                    this.close();
                });
            },
            function () {
                this.close()
            }
        );
        const modalEdit = createModal(
            {
                btnOk: { text: 'Sauvegarder' }
            },
            function () {
                const form = DOM.getElement('form', this.body);
                var formData = new FormData(form);
                AJAX.POST(`${API_ROUTE}/${entity}/${this.params.id}/edit`, formData, (response) => {
                    // var html = JSON.parse(response).form.trim();
                    this.close();
                });
            },
            function () {
                this.close()
            }
        );

        // Create router
        const router = TDP.Router.create({
            routes: {
                GET: `${API_ROUTE}/${entity}.json`,
                GET_P: `${API_ROUTE}/${entity}.json/#page`,
                SEARCH: `${API_ROUTE}/${entity}.json`,
                EDIT: `${API_ROUTE}/${entity}.json?id=#id`,
                DELETE: { path: `/api/${entity}.json` },
                UPDATE_STATUS: { path: `${API_ROUTE}/${entity}.json`, params: ['status'] },
                GET_ALL: { path: `api/listes-controlees/${entity}.json/#page`, params: { page: 1 } },
            },
        });

        // Create datatable
        const table = TDP.Table.create({
            el: tdpContainer,
            type: 'server',
            schema: APP.TDP.Schema.Organization,
            options: {
                selectable: true,
                searchable: { placeholder: 'Chercher par nom' },
                variable: true,
                pagineable: { total: 'info.total_pages', limit: 'info.limit' },
                totalItems: 'info.total_records',
            },
            actions: {
                sort: {
                    route: { name: 'GET_P', params: { page: '$currentPage' }, query: { sort: '$selected' } },
                    callback: (test) => console.log(`Hello ${test}`),
                },
                getPage: {
                    route: { name: 'GET', query: { page: '$to.currentPage', limit: '$to.pageSize' } },
                },
                delete: {
                    route: { name: 'DELETE', query: { page: '$to.currentPage' } },
                },
                search: {
                    route: { route: 'GET', params: { page: '$currentPage' }, query: { search: '$search' } },
                    callback: () => console.log("Hello"),
                    disabled: 'EMPTY',
                },
            },
            router: router,
            btnEdit: tplBtnEdit
        }).init(TDP.API.get(router, 'GET', { query: { limit: 5 } }));


        table.fnAdd = function () {
            modalCreate.onopen = function () {
                this.clear();
                this.title = 'Ajouter une échelle';
                AJAX.GET(`${API_ROUTE}/form/${entity}.json`, (response) => {
                    var html = JSON.parse(response).form.trim();
                    this.body.innerHTML = html;
                    setTimeout(() => {
                        TEH.floatingLabel(this.body);
                    }, 500);

                });
            }
            modalCreate.onclose = () => this.refresh();

            modalCreate.open();
        }
        table.fnEdit = function (id) {
            modalEdit.params.id = id;
            modalEdit.open(function () {
                // Get form and append it to the modal window's body
                AJAX.GET(`${API_ROUTE}/form/${entity}.json?id=${id}`, function (response) {
                    var html = JSON.parse(response).form.trim();
                    var container = DOM.createDiv({ html: html });
                    modalEdit.body.innerHTML = html;
                    TEH.floatingLabel(modalEdit.body);
                });
            });
            modalEdit.onclose = () => this.refresh();
        }
        table.fnDelete = function (id) {
            AJAX.DELETE(`${API_ROUTE}/${entity}/${id}/delete.json`, null, (response) => {
                notify.body = "resource delete success";
                notify.show();
                this.refresh();
            });
        }
        table.fnValidate = function (id) {
            AJAX.POST(`${API_ROUTE}/${entity}/${id}/update.json`, null, (response) => {
                notify.body = "resource update success";
                notify.show();
                this.refresh();
            });
        }
    });

})(jsLabo)