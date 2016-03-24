module.exports = function(mongoose) {

    var fieldSchema = mongoose.schema(
        {
            label: String,
            type: String,
            placehoder: String,
            options: [{"label": String, "value": String}]
        }, {collection: 'assignment.formbuilder.field'});

    return fieldSchema;

};