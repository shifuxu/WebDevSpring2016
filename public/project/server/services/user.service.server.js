var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, movieModel, userModel, passport) {
    app.get("/api/project/omdb/loggedin", loggedin);
    app.get("/api/project/omdb/user/:username", findUserByUsername);
    app.get("/api/project/omdb/profile/:userId", profile);
    app.get("/api/project/omdb/user", findAllUsers);
    app.get("/api/project/omdb/loggedin/:userId", getUpdatedCurrentUser);
    app.get("/api/project/omdb/search/:username", searchUser);
    app.post("/api/project/omdb/admin/create", createUserFromAdmin);
    app.post("/api/project/omdb/login", passport.authenticate("project"), login);
    app.post("/api/project/omdb/logout", logout);
    app.post("/api/project/omdb/register", register);
    app.post("/api/project/omdb/user/:userId/follow/:username", followUser);
    app.put("/api/project/omdb/user/:userId", updateUser);
    app.delete("/api/project/omdb/:userId", deleteUserById);
    app.delete("/api/project/omdb/user/:userId/unfollow/:username", unfollowUser);

    // call passport js
    passport.use("project", new LocalStrategy(projectLocalStrategy));

    // implement local strategy
    function projectLocalStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function profile(req, res) {
        var userId = req.params.userId;
        var user = null;

        userModel
            .findUserById(userId)
            .then(
                function(doc) {
                    user = doc;
                    return movieModel.findMoviesByImdbIDs(user.likes);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
            .then(
                // fetch movies this user likes
                function(movies) {
                    // list of movies this user likes
                    user.likesMovies = movies;
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function register(req, res) {
        var user = req.body;
        // set default role as user
        if (typeof user.role == "undefined") {
            user.role = "user";
        }

        userModel
            .createUser(user)
            .then(
                function(user) {
                    return req.login(user, function(err) {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var user = req.body;
        userModel
            .updateUser(userId, user)
            .then(
                function(user) {
                    res.json(user);
                }, function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByUsername(req, res) {
        var username = req.params.username;
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req, res) {
        var userId= req.params.userId;
        userModel
            .deleteUserById(userId)
            .then(
                function(doc) {
                    res.send(200);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllUsers(req, res) {
        userModel
            .findAllUsers()
            .then(
                function(users) {
                    res.json(users);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function getUpdatedCurrentUser(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function followUser(req, res) {
        var userId = req.params.userId;
        var followedUsername = req.params.username;
        userModel
            .followUser(userId, followedUsername)
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function unfollowUser(req, res) {
        var userId = req.params.userId;
        var unfollowedUsername = req.params.username;
        userModel
            .unfollowUser(userId, unfollowedUsername)
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function searchUser(req, res) {
        var username = req.params.username;
        userModel
            .searchUser(username)
            .then(
                function(users) {
                    res.json(users);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createUserFromAdmin(req, res) {
        var user = req.body;
        userModel
            .createUserFromAdmin(user)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
};
