// import q library
var q = require("q");

module.exports = function(db, mongoose) {
    // define schema
    var FormSchema = require("./form.schema.server.js")(mongoose);

    // define model
    var FormModel = mongoose.model('Form', FormSchema);

    // define api
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
        updateFieldForForm: updateFieldForForm,
        updateFieldsForForm: updateFieldsForForm
    };

    return api;

    function createFormForUser(userId, form) {
        var deferred = q.defer();

        FormModel
            .create(
                {
                    userId: userId,
                    title: form.title,
                    created: (new Date).getTime()
                },
                function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                }
            );

        return deferred.promise;
    }

    function findAllFormsForUser(userId) {
        var deferred = q.defer();

        FormModel
            .find(
                {userId: userId},
                function(err, forms) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(forms);
                    }
                }
            );

        return deferred.promise;
    }

    function findFormById(formId) {
        var deferred = q.defer();

        FormModel
            .findById(
                formId,
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                }
            );

        return deferred.promise;
    }

    function findAllForms() {
        var deferred = q.defer();

        FormModel
            .find(
                {},
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                }
            );

        return deferred.promise;
    }

    function deleteFormById(formId) {
        var deferred = q.defer();

        FormModel
            .remove(
                {_id: formId},
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                }
            );

        return deferred.promise;
    }

    function updateFormById(formId, newForm) {
        var deferred = q.defer();

        var newFields = [];

        if (newForm.fields) {
            newFields = newForm.fields;
        }

        FormModel
            .update(
                {_id: formId},
                {
                    $set: {
                        userId: newForm.userId,
                        title: newForm.title,
                        fields: newFields,
                        updated: (new Date).getTime()
                    }
                },
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                }
            );

        return deferred.promise;
    }

    function findFormByTitle(title) {
        var deferred = q.defer();

        FormModel
            .find(
                {title: title},
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                }
            );

        return deferred.promise;
    }

    function findAllFieldsById(formId) {
        var deferred = q.defer();

        FormModel
            .findById(
                formId,
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc.fields);
                    }
                }
            );

        return deferred.promise;
    }

    // ? not sure i am right
    function findFieldByFieldIdAndFormId(formId, fieldId) {
        var deferred = q.defer();

        FormModel
            .find(
                {
                    _id: formId,
                    fields: {$elemMatch: {_id: fieldId}}
                },
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc.fields[0]);
                    }
                }
            );

        return deferred.promise;
    }

    function deleteFieldByFieldIdAndFormId(formId, fieldId) {
        var deferred = q.defer();

        FormModel
            .update(
                {
                    _id: formId
                },
                {
                    $pull: {fields: {_id: fieldId}}
                },
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                }
            );

        return deferred.promise;
    }

    function createFieldForForm(formId, field) {
        var deferred = q.defer();

        FormModel
            .update(
                {
                    _id: formId
                },
                {
                    $push: {fields: field}
                },
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                }
            );

        return deferred.promise;
        //var newField = {
        //    _id: (new Date).getTime().toString(),
        //    label: field.label,
        //    type: field.type,
        //    placeholder: field.placeholder,
        //    options: field.options
        //};
        //
        //var fields = findAllFieldsById(formId);
        //fields.push(newField);
        //
        //var form = findFormById(formId);
        //var newForm = {
        //    _id: form._id,
        //    title: form.title,
        //    userId: form.userId,
        //    fields: fields
        //};
        //
        //updateFormById(formId, newForm);
        //
        //return newField;
    }

    function updateFieldForForm(formId, fieldId, field) {
        var deferred = q.defer();

        FormModel
            .update();

        return deferred.promise;
        //var fieldTemp = findFieldByFieldIdAndFormId(formId, fieldId);
        //if (fieldTemp) {
        //    fieldTemp.label = field.label;
        //    if (field.placeholder) {
        //        fieldTemp.placeholder = field.placeholder;
        //    }
        //    if (field.options) {
        //        fieldTemp.options = field.options;
        //    }
        //    return fieldTemp;
        //} else {
        //    return null;
        //}
    }

    // leave it here for further confirmation
    function updateFieldsForForm(formId, fields) {
        var form = findFormById(formId);
        var newForm = {
            _id: form._id,
            title: form.title,
            userId: form.userId,
            fields: fields
        };
        return updateFormById(formId, newForm);
    }

};