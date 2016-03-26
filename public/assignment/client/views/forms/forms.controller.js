(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);

    function formController(UserService, FormService) {
        var vm = this;

        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        vm.currentUser = null;
        vm.forms = [];

        function init() {
            UserService
                .getCurrentUser()
                .then(function(response) {
                    var userTemp = response.data;
                    if (userTemp) {
                        vm.currentUser = userTemp;
                        return FormService.findAllFormsForUser(vm.currentUser._id);
                    }
                })
                .then(function(response) {
                    var forms = response.data;
                    if (forms) {
                        vm.forms = forms;
                    }
                });
        }
        init();

        var selectedFormId = null;

        function addForm(form) {
            if (typeof form !== "undefined" && form.title != "") {
                FormService
                    .createFormForUser(vm.currentUser._id, form)
                    .then(function(response) {
                        var forms = response.data;
                        if (forms) {
                            vm.forms = forms;
                        }
                    });
            }
        }

        function updateForm(form) {
            FormService
                .updateFormById(selectedFormId, form)
                .then(function(response) {
                    var formTemp = response.data;
                    if (formTemp) {
                        return FormService.findAllFormsForUser(vm.currentUser._id);
                    }
                })
                .then(function(response) {
                    var forms = response.data;
                    if (forms) {
                        vm.forms = forms;
                    }
                });
        }

        function deleteForm(index) {
            selectedFormId = vm.forms[index]._id;
            FormService
                .deleteFormById(selectedFormId)
                .then(function(response) {
                    return FormService.findAllFormsForUser(vm.currentUser._id);
                })
                .then(function(response) {
                    var forms = response.data;
                    if (forms) {
                        vm.forms = forms;
                    }
                });
        }

        function selectForm(index) {
            selectedFormId = vm.forms[index]._id;
            FormService
                .findFormById(selectedFormId)
                .then(function(response) {
                    var formTemp = response.data;
                    if (formTemp) {
                        vm.form = {
                            _id: formTemp._id,
                            title: formTemp.title,
                            userId: formTemp.userId,
                            fields: formTemp.fields
                        };
                    }
                });
        }
    }
})();