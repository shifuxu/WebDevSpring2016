module.exports = function (app, userModel, formModel) {
    app.get("/api/assignment/form/:formId/field", findAllFieldsById);
    app.get("/api/assignment/form/:formId/field/:fieldId", findFieldByFieldIdAndFormId);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldByFieldIdAndFormId);
    app.post("/api/assignment/form/:formId/field", createFieldForForm);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldForForm);

    function findAllFieldsById(req, res) {
        var formId = req.params.formId;
        var fields = formModel.findAllFieldsById(formId);
        res.json(fields);
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
        var field = formModel.deleteFieldByFieldIdAndFormId(formId, fieldId);
        res.json(formModel.findAllFieldsById(formId));
    }

    function createFieldForForm(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        var newField = formModel.createFieldForForm(formId, field);
        res.json(formModel.findAllFieldsById(formId));
    }

    function updateFieldForForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        var newField = formModel.updateFieldForForm(formId, fieldId, field);
        res.json(formModel.findAllFieldsById(formId));
    }

};