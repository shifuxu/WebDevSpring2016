module.exports = function(app, userModel, formModel) {
    app.get("/api/assignment/user/:userId/form", findAllFormsForUser);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateFormById);
    app.get("/api/assignment/form", findAllForms);

    function findAllFormsForUser(req, res) {
        var userId = req.params.userId;
        formModel
            .findAllFormsForUser(userId)
            .then(
                function(forms) {
                    res.json(forms);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findFormById(req, res) {
        var formId = req.params.formId;
        formModel
            .findFormById(formId)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteFormById(req, res) {
        var formId = req.params.formId;
        formModel
            .deleteFormById(formId)
            .then(
                function(doc) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        var user = null;
        formModel
            .createFormForUser(userId, form)
            .then(
                function(doc) {
                    user = doc;
                    return formModel.findAllFormsForUser(userId);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function(forms) {
                    res.json(forms);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateFormById(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        formModel
            .updateFormById(formId, form)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllForms(req, res) {
        formModel
            .findAllForms()
            .then(
                function(forms) {
                    res.json(forms);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

};