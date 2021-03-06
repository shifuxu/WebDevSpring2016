module.exports = function(mongoose) {

    var FieldSchema = require("./field.schema.server.js")(mongoose);

    var FormSchema = mongoose.Schema(
        {
            userId: String,
            title: String,
            fields: [FieldSchema],
            created: Date,
            updated: Date
        }, {collection: 'assignment.formbuilder.form'});

    return FormSchema;

};