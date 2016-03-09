(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", formService);

    function formService($http) {

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            findFormById: findFormById,
            findAllForms: findAllForms,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return service;

        function createFormForUser(userId, form) {
            return $http.post("/api/assignment/user/" + userId + "/form", form);
        }

        function findAllFormsForUser(userId) {
            return $http.get("/api/assignment/user/" + userId + "/form");
        }

        function findFormById(formId) {
            return $http.get("/api/assignment/form/" + formId);
        }

        function findAllForms() {
            return $http.get("/api/assignment/form");
        }

        function deleteFormById(formId) {
            return $http.delete("/api/assignment/form/" + formId);
        }

        function updateFormById(formId, newForm) {
            return $http.put("/api/assignment/form/" + formId, newForm);
        }
    }
})();

