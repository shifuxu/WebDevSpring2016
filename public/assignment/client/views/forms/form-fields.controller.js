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
            var modalInstance = $uibModal.open({
                templateUrl: "views/forms/dialog.view.html",
                controller: "DialogController",
                controllerAs: "model",
                resolve: {
                    type: function () {
                        return field.type;
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

    function dialogController($uibModalInstance, type) {
        var vm = this;

        vm.ok = ok;
        vm.cancel = cancel;
        vm.message = null;

        function init() {
            vm.type = type;
        }
        init();

        function ok(field) {
            if (typeof field == "undefined") {
                vm.message = "Please enter something!";
                return ;
            }
            if (!field.label) {
                vm.message = "The label can not be empty!";
                return ;
            }

            if ((type == "TEXT" || type == "TEXTAREA") && !field.placeholder) {
                vm.message = "The placeholder can not be empty";
                return ;
            }

            if ((type == "OPTIONS" || type == "CHECKBOXES" || type == "RADIOS") && !field.options) {
                vm.message = "The options can not be empty";
                return ;
            }

            var newField = {
                "label" : field.label
            };

            if (field.placeholder) {
                newField = {
                    "label" : field.label,
                    "placeholder": field.placeholder
                };
            }

            if (field.options) {
                var optionsTemp = [];
                var info = field.options;
                var optionArr = info.split("\n");
                for (var o in optionArr) {
                    var pair = optionArr[o].split(":");
                    if (pair.length == 2) {
                        var option = {
                            "label": pair[0],
                            "value": pair[1]
                        };
                        optionsTemp.push(option);
                    } else {
                        vm.message = "Please follow input format as label:value!";
                        return ;
                    }
                }

                newField = {
                    "label" : field.label,
                    "options": optionsTemp
                };

                console.log(newField);
            }

            $uibModalInstance.close(newField);
        }

        function cancel() {
            $uibModalInstance.dismiss("cancel");
        }
    }

})();