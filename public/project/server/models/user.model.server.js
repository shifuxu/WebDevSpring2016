var users = require("./user.mock.json");

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

        //var users = [];
        //for (var u in userIds) {
        //    var user = findUserById (userIds[u]);
        //    if (user) {
        //        users.push ({
        //            username: user.username,
        //            _id: user._id
        //        });
        //    }
        //}
        //return users;
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

        //for(var u in users) {
        //    if( users[u]._id == userId ) {
        //        return users[u];
        //    }
        //}
        //return null;
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

        //var roleVal = null;
        //if (typeof user.role == 'undefined') {
        //    roleVal = "user";
        //} else {
        //    roleVal = user.role;
        //}
        //
        //var newUser = {
        //    _id: (new Date()).getTime(),
        //    username: user.username,
        //    password: user.password,
        //    firstName: user.firstName,
        //    lastName: user.lastName,
        //    email: user.email,
        //    role: roleVal
        //};
        //users.push(newUser);
        //return newUser;
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

        //for(var u in users) {
        //    if( users[u].username == credentials.username && users[u].password == credentials.password) {
        //        return users[u];
        //    }
        //}
        //return null;
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

        //var userTemp = findUserById(userId);
        //if (userTemp != null) {
        //    userTemp.firstName = user.firstName;
        //    userTemp.lastName = user.lastName;
        //    userTemp.password = user.password;
        //    userTemp.username = user.username;
        //    userTemp.email = user.email;
        //    userTemp.role = user.role;
        //    return userTemp;
        //} else {
        //    return null;
        //}
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

        //for (var u in users){
        //    if (users[u].username == username) {
        //        return users[u];
        //    }
        //}
        //
        //return null;
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

        //var user = findUserById(userId);
        //if (user != null) {
        //    users.splice(users.indexOf(user), 1);
        //}
        //
        //return null;
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

        //return users;
    }
};