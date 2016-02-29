(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", formController);

    function formController($scope, FormService, $rootScope) {
        $scope.forms = FormService.findAllFormsForUser($rootScope.currentUser._id);

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        var selectedFormId = null;

        function addForm(form) {
            if (typeof form !== "undefined" && form.title != "") {
                var newForm = FormService.createFormForUser($rootScope.currentUser._id, form);
                $scope.forms.push(newForm);
            }
        }

        function updateForm(form) {
            var newForm = FormService.updateFormById(selectedFormId, form);
        }

        function deleteForm(index) {
            selectedFormId = $scope.forms[index]._id;
            FormService.deleteFormById(selectedFormId);
            $scope.forms.splice(index, 1);
        }

        function selectForm(index) {
            selectedFormId = $scope.forms[index]._id;
            var form = FormService.findFormById(selectedFormId);
            $scope.form = {
                _id: form._id,
                title: form.title,
                userId: form.userId
            };
        }
    }
})();