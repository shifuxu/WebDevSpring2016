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
            findFormById: findFormById,
            findAllForms: findAllForms,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return service;

        function createFormForUser(userId, form) {
            var newForm = {
                _id: (new Date).getTime(),
                title: form.title,
                userId: userId
            };

            forms.push(newForm);
            return newForm;
        }

        function findAllFormsForUser(userId) {
            var res = [];
            for (var f in forms) {
                if (forms[f].userId == userId) {
                    res.push(forms[f]);
                }
            }

            return res;
        }

        function findFormById(formId) {
            for (var f in forms) {
                if (forms[f]._id == formId) {
                    return forms[f];
                }
            }

            return null;
        }

        function findAllForms() {
            return forms;
        }

        function deleteFormById(formId) {
            var form = findFormById(formId);
            if (form != null) {
                forms.splice(forms.indexOf(form), 1);
            } else {
                return null;
            }
        }

        function updateFormById(formId, newForm) {
            var formTemp = findFormById(formId);
            if (formTemp != null) {
                formTemp.title = newForm.title;
                formTemp.userId = newForm.userId;
                return formTemp;
            } else {
                return null;
            }
        }
    }
})();

