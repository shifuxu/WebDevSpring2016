var forms = require("./form.mock.json");

module.exports = function() {
    var api = {
        createFormForUser: createFormForUser,
        findAllFormsForUser: findAllFormsForUser,
        findFormById: findFormById,
        findAllForms: findAllForms,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        findFormByTitle: findFormByTitle,
        findAllFieldsById: findAllFieldsById,
        findFieldByFieldIdAndFormId: findFieldByFieldIdAndFormId,
        deleteFieldByFieldIdAndFormId: deleteFieldByFieldIdAndFormId,
        createFieldForForm: createFieldForForm,
        updateFieldForForm: updateFieldForForm
    };

    return api;

    function createFormForUser(userId, form) {
        var newForm = {
            _id: (new Date).getTime().toString(),
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
        }
        return null;
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

    function findAllFieldsById(formId) {
        var form = findFormById(formId);
        if (!form) {
            return form.fields;
        }

        return [];
    }

    function findFieldByFieldIdAndFormId(formId, fieldId) {
        var fields = findAllFieldsById(formId);
        if (!fields) {
            for (var f in fields) {
                if (fields[f] == fieldId) {
                    return fields[f];
                }
            }
        }

        return null;
    }

    function deleteFieldByFieldIdAndFormId(formId, fieldId) {
        var field = findFieldByFieldIdAndFormId(formId, fieldId);
        var fields = findAllFieldsById(formId);
        if (!field) {
            fields.splice(fields.indexOf(filed), 1);
        }
        return null;
    }

    function createFieldForForm(formId, field) {
        var newField = {
            _id: (new Date).getTime(),
            label: field.label,
            type: field.type,
            placeholder: field.placeholder,
            options: field.options
        };

        var fields = findAllFieldsById(formId);
        fields.push(newField);

        // can we remove here?
        var form = findFormById(formId);
        var newForm = {
            _id: form._id,
            title: form.title,
            userId: form.userId,
            fields: fields
        };

        updateFormById(formId, newForm);

        return newField;
    }

    function updateFieldForForm(formId, fieldId, field) {
        var fieldTemp = findFieldByFieldIdAndFormId(formId, fieldId);
        if (!fieldTemp) {
            fieldTemp._id = field._id;
            fieldTemp.label = field.label;
            fieldTemp.type = field.type;
            fieldTemp.placeholder = field.placeholder;
            fieldTemp.options = field.options;
            return fieldTemp;
        } else {
            return null;
        }
    }

};