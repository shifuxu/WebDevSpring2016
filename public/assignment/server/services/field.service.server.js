module.exports = function (app, userModel, formModel) {
    app.get("/api/assignment/form/:formId/field", findAllFieldsById);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldIdAndFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFieldIdAndFormId);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldForForm);
    app.put("/api/assignment/form/:formId/fields", updateFieldsForForm);

    function findAllFieldsById(req, res) {
        var formId = req.params.formId;
        formModel
            .findAllFieldsById(formId)
            .then(
                function(fields) {
                    res.json(fields);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFieldByFieldIdAndFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = formModel.findFieldByFieldIdAndFormId(formId, fieldId);
        res.json(field);
    }

    function deleteFieldByFieldIdAndFormId(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        formModel
            .deleteFieldByFieldIdAndFormId(formId, fieldId)
            .then(
                function(doc) {
                    return formModel.findAllFieldsById(formId);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(fields) {
                    res.json(fields);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        formModel
            .createFieldForForm(formId, field)
            .then(
                function(doc) {
                    return formModel.findAllFieldsById(formId);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(fields) {
                    res.json(fields);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        formModel
            .updateFieldForForm(formId, fieldId, field)
            .then(
                function(doc) {
                    return formModel.findAllFieldsById(formId);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(fields) {
                    res.json(fields);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFieldsForForm(req, res) {
        var formId = req.params.formId;
        var fields = req.body;
        var newFields = formModel.updateFieldsForForm(formId, fields);
        res.json(formModel.findAllFieldsById(formId));
    }

};