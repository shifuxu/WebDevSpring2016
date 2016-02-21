(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", formService);

    function formService() {

        var forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo",     "userId": 123},
            {"_id": "020", "title": "CDs",      "userId": 234}
        ];


        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return service;

        function createFormForUser(userId, form, callback) {

        }

        function findAllFormsForUser(userId, callback) {

        }

        function deleteFormById(formId, callback) {

        }

        function updateFormById(formId, newForm, callback) {

        }
    }


})();

