// import q library
var q = require("q");

module.exports = function (db, mongoose) {
    // define schema
    var UserSchema = require("./user.schema.server.js")(mongoose);

    // define model
    var UserModel = mongoose.model('User', UserSchema);

    // define api
    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUserById: updateUserById,
        findUserByUsername: findUserByUsername
    };

    return api;

    function findUserByCredentials(credentials) {
        var deferred = q.defer();

        var username = credentials.username;
        var password = credentials.password;

        UserModel
            .findOne(
                {username: username, password: password},
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

    function findUserById(userId) {
        var deferred = q.defer();

        UserModel
            .findById(
                userId,
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

    function createUser(user) {
        var deferred = q.defer();

        UserModel
            .create(
                user,
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

    function deleteUserById(userId) {
        var deferred = q.defer();

        UserModel
            .remove(
                {_id: userId},
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });

        return deferred.promise;
    }

    function updateUserById(userId, user) {
        var deferred = q.defer();

        UserModel.update(
            {_id: userId},
            {
                $set: {
                    username: user.username,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    emails: user.emails,
                    phones: user.phones,
                    roles: user.roles
                }
            },
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