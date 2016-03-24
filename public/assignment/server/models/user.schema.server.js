module.exports = function(mongoose) {

    var userSchema = mongoose.schema(
        {
            username: String,
            password: String,
            firstName: String,
            lastName: String,
            email: String,
            roles: [String]
        }, {collection: 'assignment.formbuilder.user'});

    return userSchema;

};