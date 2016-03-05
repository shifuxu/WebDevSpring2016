module.exports = function (app, userModel, formModel) {
    app.get("/api/assignment/form/:formId/field");
    app.get("/api/assignment/form/::formId/field/:fieldId");
    app.delete("/api/assignment/form/:formId/field/:fieldId");
    app.post("/api/assignment/form/:formId/field");
    app.put("/api/assignment/form/:formId/field/:fieldId");
};