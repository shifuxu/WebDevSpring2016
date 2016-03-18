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
            if (field.type == "TEXT") {
                var modalInstance = $uibModal.open({
                    templateUrl: "views/forms/text.dialog.view.html",
                    controller: "DialogController",
                    controllerAs: "model",
                    resolve: {
                        field: function () {
                            return field;
                        }
                    }
                });

                modalInstance.result.then(function (newField) {
                    FieldsService
                        .updateField(formId, field._id, newField)
                        .then(function (response) {
                            var fields = response.data;
                            if (response.data) {
                                vm.fields = fields;
                            }
                        });
                });
            }
        }
    }

    function dialogController($uibModalInstance, field) {
        var vm = this;

        vm.ok = ok;
        vm.cancel = cancel;

        function init() {
            var fieldTemp = {
                _id: field._id,
                label: field.label,
                type: field.type,
                placeholder: field.placeholder,
                options: field.options
            };
            vm.field = fieldTemp;
        }
        init();

        function ok() {
            console.log(vm.field);
            $uibModalInstance.close(vm.field);
        }

        function cancel() {
            $uibModalInstance.dismiss("cancel");
        }
    }

})();