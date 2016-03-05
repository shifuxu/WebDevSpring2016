module.exports = function(app, userModel, formModel) {
    app.get("/api/assignment/user/:userId/form", findAllFormsByUserId);
    app.get("/api/assignment/form/:formId", findFormById);
    app.delete("/api/assignment/form/:formId", deleteFormById);
    app.post("/api/assignment/user/:userId/form", createFormForUserId);
    app.put("/api/assignment/form/:formId", updateFormById);

    function findAllFormsByUserId(req, res) {

    }

    function findFormById(req, res) {

    }

    function deleteFormById(req, res) {

    }

    function createFormForUserId(req, res) {

    }

    function updateFormById(req, res) {

    }
};