module.exports = function(app, userModel, formModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.get("/api/assignment/user?username=alice&password=alice", findUserByCredential);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function createUser(req, res) {
        var user = req.body;
        user = userModel.createUser(user);
        res.json(userModel.findAllUsers());
    }

    function findAllUsers(req, res) {
        res.json(userModel.findAllUsers());
    }

    function findUserById(req, res) {
        var id = req.params.id;
        var user = userModel.findUserById(id);
        res.json(user);
    }

    function findUserByUsername(req, res) {
        var username = req.params.username;
        var user = userModel.findUserByUsername(username);
        res.json(user);
    }

    function findUserByCredential(req, res) {
        var username = req.params.username;
        var password = req.params.password;
        var credentital = {
            username: username,
            password: password
        };
        var user = userModel.findUserByCredentials(credentital);
        res.json(user);
    }

    function updateUserById(req, res) {
        var id = req.params.id;
        var user = req.body;
        var userTemp = userModel.updateUserById(id, user);
        res.json(userModel.findAllUsers());
    }

    function deleteUserById(req, res) {
        var id = req.params.id;
        var user = userModel.deleteUserById(id);
        res.json(userModel.findAllUsers());
    }

};