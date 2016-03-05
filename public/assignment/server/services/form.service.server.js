module.exports = function(app, userModel, formModel) {
    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUserId);
    app.put("/api/assignment/form/:formId", updateFormById);

    function findAllFormsForUser(req, res) {
        var userId = req.params.userId;
        var forms = formModel.findAllFormsForUser(userId);
        res.json(forms);
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        var form = formModel.findFormById(formId);
        res.json(form);
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        var form = formModel.deleteFormById(formId);
        res.send(formModel.findAllForms());
    }

    function createFormForUserId(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        var newForm = formModel.createFormForUser(userId, form);
        res.json(formModel.findAllFormsForUser(userId));
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        var newForm = formModel.updateFormById(formId, form);
        res.json(formModel.findAllForms());
    }

};