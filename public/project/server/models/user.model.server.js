// load q promise library
var q = require("q");

module.exports = function(db, mongoose) {

    // load user schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    // create user model from schema, the name should be different
    var UserModel = mongoose.model('Users', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        createUser: createUser,
        findUserById: findUserById,
        findUsersByIds: findUsersByIds,
        updateUser: updateUser,
        deleteUserById: deleteUserById,
        findAllUsers: findAllUsers
    };
    return api;

    function findUsersByIds (userIds) {
        var deferred = q.defer();

        // find all users in array of user IDs
        UserModel.find(
            {_id: {$in: userIds}},
            function (err, users) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(users);
                }
            }
        );

        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();

        UserModel
            .findById(
                userId,
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                }
            );

        return deferred.promise;
    }

    function createUser(user) {
        var deferred = q.defer();

        UserModel
            .create(
                user,
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                }
            );

        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();

        UserModel
            .findOne(
                {
                    username: credentials.username,
                    password: credentials.password
                },
                function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                }
            );

        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();

        UserModel
            .update(
                {_id: userId},
                {
                    $set: {
                        username: user.username,
                        password: user.password,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        role: user.role
                    }
                },
                function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                }
            );

        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();

        UserModel
            .findOne(
                {username: username},
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                }
            );

        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();

        UserModel
            .remove(
                {_id: userId},
                function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                }
            );

        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();

        UserModel
            .find(
                {},
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                }
            );

        return deferred.promise;
    }
};