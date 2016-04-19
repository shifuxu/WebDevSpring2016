// load q promise library
var q = require("q");

module.exports = function(db, mongoose, UserModel) {

    // load user schema
    // var UserSchema = require("./user.schema.server.js")(mongoose);

    // create user model from schema, the name should be different
    // var UserModel = mongoose.model('Users', UserSchema);

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        createUser: createUser,
        findUserById: findUserById,
        findUsersByIds: findUsersByIds,
        updateUser: updateUser,
        deleteUserById: deleteUserById,
        findAllUsers: findAllUsers,
        userLikesMovie: userLikesMovie,
        followUser: followUser,
        userUnlikesMovie: userUnlikesMovie,
        unfollowUser: unfollowUser,
        searchUser: searchUser,
        createUserFromAdmin: createUserFromAdmin
    };
    return api;

    function userLikesMovie(userId, movie) {
        var deferred = q.defer();

        UserModel
            .findById(
                userId,
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        // check if there are no duplicate imdbID
                        if (doc.likes.indexOf(movie.imdbID) < 0) {
                            // add movie id to user likes
                            doc.likes.push(movie.imdbID);
                            // save docs
                            doc.save(
                                function (err, doc) {
                                    if (err) {
                                        deferred.reject(err);
                                    } else {
                                        deferred.resolve(doc);
                                    }
                                }
                            );
                        }
                    }
                }
            );

        return deferred.promise;
    }

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

    function createUserFromAdmin(user) {
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

    function followUser(userId, followedUsername) {
        var deferred = q.defer();

        UserModel
            .findById(
                {_id: userId},
                function (err, doc) {
                    if (err) {
                        deferred.reject(err)
                    } else {
                        // check there is no duplicates followed user
                        if (doc.follows.indexOf(followedUsername) < 0) {
                            // add follow friends
                            doc.follows.push(followedUsername);
                            // save docs
                            doc.save(
                                function(err, doc) {
                                    if (err) {
                                        deferred.reject(err);
                                    } else {
                                        deferred.resolve(doc);
                                    }
                                }
                            );
                        }
                    }
                }
            );

        return deferred.promise;
    }

    // delete movie that this person likes
    function userUnlikesMovie(userId, imdbID) {
        var deferred = q.defer();

        UserModel
            .findById(
                userId,
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        var index = doc.likes.indexOf(imdbID);
                        // found the given imdbID in the likes array
                        if (index > -1) {
                            doc.likes.splice(index, 1);
                            // save the change
                            doc.save(
                                function(err, doc) {
                                    if (err) {
                                        deferred.reject(err);
                                    } else {
                                        deferred.resolve(doc);
                                    }
                                }
                            );
                        }
                    }
                }
            );

        return deferred.promise;
    }

    function unfollowUser(userId, unfollowedUsername) {
        var deferred = q.defer();

        UserModel
            .findById(
                userId,
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        var index = doc.follows.indexOf(unfollowedUsername);
                        // found the user that we want to unfollow
                        if (index > -1) {
                            // remove from the array
                            doc.follows.splice(index, 1);
                            // save doc
                            doc.save(
                                function(err, doc) {
                                    if (err) {
                                        deferred.reject(err);
                                    } else {
                                        deferred.resolve(doc);
                                    }
                                }
                            );
                        }
                    }
                }
            );

        return deferred.promise;
    }

    function searchUser(username) {
        return UserModel.find(
            {'username': {$regex: username, $options: 'i'}}
        );
    }
};