(function() {
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", fieldsController)
        .controller("DialogController", dialogController);

    function fieldsController($routeParams, $uibModal, FieldsService) {
        var vm = this;

        var formId = null;

        vm.addField = addField;
        vm.removeField = removeField;
        vm.editField = editField;
        vm.fields = null;

        function init() {
            formId = $routeParams.formId;
            FieldsService
                .getFieldsForForm(formId)
                .then(function(response) {
                    var fields = response.data;
                    if (fields) {
                        vm.fields = fields;
                    }
                });
        }
        init();

        function addField(fieldType) {
            if (typeof fieldType == "undefined") {
                return ;
            }
            var fieldTemplates = {
                "slt": {
                    "id": null,
                    "label": "New Text Field",
                    "type": "TEXT",
                    "placeholder": "New Field"
                },
                "mlt": {
                    "id": null,
                    "label": "New Text Field",
                    "type": "TEXTAREA",
                    "placeholder": "New Field"
                },
                "date": {
                    "id": null,
                    "label": "New Date Field",
                    "type": "DATE"
                },
                "dropdown": {
                    "id": null,
                    "label": "New Dropdown",
                    "type": "OPTIONS",
                    "options": [{
                        "label": "Option 1",
                        "value": "OPTION_1"
                    }, {
                        "label": "Option 2",
                        "value": "OPTION_2"
                    }, {
                        "label": "Option 3",
                        "value": "OPTION_3"
                    }]
                },
                "checkbox": {
                    "id": null,
                    "label": "New Checkboxes",
                    "type": "CHECKBOXES",
                    "options": [{
                        "label": "Option A",
                        "value": "OPTION_A"
                    }, {
                        "label": "Option B",
                        "value": "OPTION_B"
                    }, {
                        "label": "Option C",
                        "value": "OPTION_C"
                    }]
                },
                "radiobutton": {
                    "id": null,
                    "label": "New Radio Buttons",
                    "type": "RADIOS",
                    "options": [{
                        "label": "Option X",
                        "value": "OPTION_X"
                    }, {
                        "label": "Option Y",
                        "value": "OPTION_Y"
                    }, {
                        "label": "Option Z",
                        "value": "OPTION_Z"
                    }]
                }
            };

            FieldsService
                .createFieldForForm(formId, fieldTemplates[fieldType])
                .then(function(response) {
                    var fields = response.data;
                    if (fields) {
                        vm.fields = fields;
                    }
                });
        }

        function removeField(field) {
            FieldsService
                .deleteFieldFromForm(formId, field._id)
                .then(function(response) {
                    var fields = response.data;
                    if (fields) {
                        vm.fields = fields;
                    }
                });
        }

        function editField(field) {
            console.log(field.type);
            $uibModal.open({
                templateUrl: "views/forms/dialog.view.html",
                controller: "DialogController",
                controllerAs: "model"
            });
        }
    }

    function dialogController($uibModalInstance) {
        var vm = this;

        vm.ok = ok;
        vm.cancel = cancel;

        function init() {

        }
        init();

        function ok() {
            console.log("ok");
        }

        function cancel() {
            $uibModalInstance.dismiss("cancel");
        }
    }

})();