module.exports = function(mongoose) {

    var UserSchema = mongoose.Schema(
        {
            username: String,
            password: String,
            firstName: String,
            lastName: String,
            emails: [String],
            phones: [String],
            roles: [String]
        }, {collection: 'assignment.formbuilder.user'});

    return UserSchema;

};