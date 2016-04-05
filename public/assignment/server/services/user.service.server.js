var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, userModel) {
    var auth = authorized;
    app.post("/api/assignment/user", auth, createUser);
    app.get("/api/assignment/user", auth, findAllUsers);
    app.get("/api/assignment/user/:username", findUserByUsername);
    //app.get("/api/assignment/user/:id", findUserById);
    //app.get("/api/assignment/user?username=:username&password=:password", findUserByCredential);
    app.put("/api/assignment/user/:id", auth, updateUserById);
    app.delete("/api/assignment/user/:id", auth, deleteUserById);
    app.post("/api/assignment/login", passport.authenticate("local"), login);
    app.post("/api/assignment/logout", logout);
    app.get("/api/assignment/loggedin", loggedin);
    app.get("/api/assignment/loggedin/:id", getUpdatedCurrentUser);

    // call passport js
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    // implement local strategy
    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials({username: username, password: password})
            .then(
                function(user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function(err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    // serialize the user object into the session
    function serializeUser(user, done) {
        done(null, user);
    }

    // retrieve the user object from the session
    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user) {
                    done(null, user);
                },
                function(err) {
                    done(err, null);
                }
            );
    }

    // determine whether the user is admin or not
    function isAdmin(user) {
        if (user.roles.indexOf("admin") > 0) {
            return true;
        }
        return false;
    }

    // implement authorized function
    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function createUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(user);
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
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    //function findUserById(req, res) {
    //    var id = req.params.id;
    //    userModel
    //        .findUserById(id)
    //        .then(
    //            function (doc) {
    //                res.json(doc);
    //            },
    //            function (err) {
    //                res.status(400).send(err);
    //            }
    //        );
    //}

    function findUserByUsername(req, res) {
        var username = req.params.username;
        userModel
            .findUserByUsername(username)
            .then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    //function findUserByCredential(req, res) {
    //    var username = req.params.username;
    //    var password = req.params.password;
    //    var credentital = {
    //        username: username,
    //        password: password
    //    };
    //    userModel
    //        .findUserByCredentials(credentital)
    //        .then(
    //            function (doc) {
    //                req.session.currentUser = doc;
    //                res.json(doc);
    //            },
    //            function (err) {
    //                res.status(400).send(err);
    //            }
    //        );
    //}

    function updateUserById(req, res) {
        var id = req.params.id;
        var user = req.body;
        userModel
            .updateUserById(id, user)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUserById(req, res) {
        var id = req.params.id;
        userModel
            .deleteUserById(id)
            .then(
                function(doc) {
                    res.send(200);
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

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function getUpdatedCurrentUser(req, res) {
        var id = req.params.id;
        userModel
            .findUserById(id)
            .then(
                function (doc) {
                    req.user = doc;
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};