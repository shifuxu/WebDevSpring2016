module.exports = function(app, userModel, formModel) {
    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findAllUsers);
    app.get("/api/assignment/user/:id", findUserById);
    app.get("/api/assignment/user?username=username", findUserByUsername);
    app.get("/api/assignment/user?username=alice&password=alice", findUserByCredential);
    app.put("/api/assignment/user/:id", updateUserById);
    app.delete("/api/assignment/user/:id", deleteUserById);

    function createUser(req, res) {

    }

    function findAllUsers(req, res) {

    }

    function findUserById(req, res) {

    }

    function findUserByUsername(req, res) {

    }

    function findUserByCredential(req, res) {

    }

    function updateUserById(req, res) {

    }

    function deleteUserById(req, res) {

    }

};