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
            var newForm = FormService.createFormForUser($rootScope.currentUser._id, form);
        }

        function updateForm(form) {
            var newForm = FormService.updateFormById(selectedFormId, form);
        }

        function deleteForm(index) {
            selectedFormId = $scope.forms[index]._id;
            FormService.deleteFormById(selectedFormId);
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