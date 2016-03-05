var forms = require("./form.mock.json");

module.exports = function() {
    var api = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        findFormById: findFormById,
        findAllForms: findAllForms,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        findFormByTitle: findFormByTitle
    };

    return api;

    function createFormForUser(userId, form) {
        var newForm = {
            _id: (new Date).getTime(),
            title: form.title,
            userId: userId,
            fields: form.fields
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
            formTemp.fields = newForm.fields;
            return formTemp;
        } else {
            return null;
        }
    }

    function findFormByTitle(title) {
        for (var f in forms) {
            if (forms[f].title == title) {
                return forms[f];
            }
        }

        return null;
    }
};