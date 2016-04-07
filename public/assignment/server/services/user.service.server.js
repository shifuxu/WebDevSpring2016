var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(app, userModel) {
    var auth = authorized;
    var authAdmin = isAdmin;

    app.get("/api/assignment/user/:username", findUserByUsername);
    app.put("/api/assignment/user/:id", auth, updateUserById);
    app.post("/api/assignment/user", createUser);
    app.post("/api/assignment/login", passport.authenticate("local"), login);
    app.post("/api/assignment/logout", logout);
    app.get("/api/assignment/loggedin", loggedin);
    app.get("/api/assignment/loggedin/:id", getUpdatedCurrentUser);
    app.get("/api/assignment/admin/user/:id", authAdmin, findUserByIdFromAdmin);
    app.post("/api/assignment/admin/user", authAdmin, createUserFromAdmin);
    app.get("/api/assignment/admin/user", authAdmin, findAllUsersFromAdmin);
    app.put("/api/assignment/admin/user/:id", authAdmin, updateUserByIdFromAdmin);
    app.delete("/api/assignment/admin/user/:id", authAdmin, deleteUserByIdFromAdmin);

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
                    // if user exists, compare passwords with bcrypt.compareSync
                    // if (user && bcrypt.compareSync(password, user.password)) {
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
    function isAdmin(req, res, next) {
        if (!req.isAuthenticated() || req.user.roles.indexOf("admin") < 0) {
            res.send(403);
        } else {
            next();
        }
    }

    // implement authorized function
    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function createUser(req, res) {
        var user = req.body;
        // encode the password for user
        // user.password = bcrypt.hashSync(user.password);
        user.roles = ["student"];
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

    function findAllUsersFromAdmin(req, res) {
        userModel
            .findAllUsers()
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByUsername(req, res) {
        var username = req.params.username;
        userModel
            .findUserByUsername(username)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

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

    function findUserByIdFromAdmin(req, res) {
        var id = req.params.id;
        userModel
            .findUserById(id)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createUserFromAdmin(req, res) {
        var newUser = req.body;
        // newUser.password = bcrypt.hashSync(newUser.password);
        userModel
            .createUser(newUser)
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateUserByIdFromAdmin(req, res) {
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

    function deleteUserByIdFromAdmin(req, res) {
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
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
};