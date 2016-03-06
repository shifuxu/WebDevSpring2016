(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);

    function formController(FormService, $rootScope) {
        var vm = this;

        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;

        function init() {
            vm.forms = FormService.findAllFormsForUser($rootScope.currentUser._id);
        }
        init();

        var selectedFormId = null;

        function addForm(form) {
            if (typeof form !== "undefined" && form.title != "") {
                var newForm = FormService.createFormForUser($rootScope.currentUser._id, form);
                vm.forms.push(newForm);
            }
        }

        function updateForm(form) {
            var newForm = FormService.updateFormById(selectedFormId, form);
        }

        function deleteForm(index) {
            selectedFormId = vm.forms[index]._id;
            FormService.deleteFormById(selectedFormId);
            vm.forms.splice(index, 1);
        }

        function selectForm(index) {
            selectedFormId = vm.forms[index]._id;
            var form = FormService.findFormById(selectedFormId);
            vm.form = {
                _id: form._id,
                title: form.title,
                userId: form.userId
            };
        }
    }
})();