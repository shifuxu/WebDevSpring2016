module.exports = function(mongoose) {

    var fieldSchema = require("./field.schema.server.js")(mongoose);

    var formSchema = mongoose.schema(
        {
            userId: String,
            title: String,
            fields: [fieldSchema],
            created: Date,
            updated: Date
        }, {collection: 'assignment.formbuilder.form'});

    return formSchema;

};