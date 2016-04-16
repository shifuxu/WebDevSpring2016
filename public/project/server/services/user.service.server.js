module.exports = function(app, movieModel, userModel) {
    app.get("/api/project/omdb/loggedin", loggedin);
    app.get("/api/project/omdb/user/:username", findUserByUsername);
    app.get("/api/project/omdb/profile/:userId", profile);
    app.get("/api/project/omdb/user", findAllUsers);
    app.get("/api/project/omdb/loggedin/:userId", getUpdatedCurrentUser);
    app.get("/api/project/omdb/search/:username", searchUser);
    app.post("/api/project/omdb/login", login);
    app.post("/api/project/omdb/logout", logout);
    app.post("/api/project/omdb/register", register);
    app.post("/api/project/omdb/user/:userId/follow/:username", followUser);
    app.put("/api/project/omdb/user/:userId", updateUser);
    app.delete("/api/project/omdb/:userId", deleteUserById);
    app.delete("/api/project/omdb/user/:userId/unfollow/:username", unfollowUser);

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
        // set default role as admin for testing
        user.role = "admin";

        userModel
            .createUser(user)
            .then(
                function(user) {
                    req.session.currentUser = user;
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function login(req, res) {
        var credentials = req.body;
        userModel
            .findUserByCredentials(credentials)
            .then(
                function(user) {
                    req.session.currentUser = user;
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
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
                    req.session.currentUser = user;
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
};
