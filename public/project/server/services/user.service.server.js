module.exports = function(app, movieModel, userModel) {
    app.get("/api/project/omdb/loggedin", loggedin);
    app.get("/api/project/omdb/user/:username", findUserByUsername);
    app.get("/api/project/omdb/profile/:userId", profile);
    app.get("/api/project/omdb/user", findAllUsers);
    app.post("/api/project/omdb/login", login);
    app.post("/api/project/omdb/logout", logout);
    app.post("/api/project/omdb/register", register);
    app.put("/api/project/omdb/user/:userId", updateUser);
    app.delete("/api/project/omdb/:userId", deleteUserById);

    function profile(req, res) {
        var userId = req.params.userId;
        var user = userModel.findUserById(userId);
        var movieImdbIDs = user.likes;
        var movies = movieModel.findMoviesByImdbIDs(movieImdbIDs);
        user.likesMovies = movies;
        res.json(user);
    }

    function register(req, res) {
        var user = req.body;
        user = userModel.createUser(user);
        req.session.currentUser = user;
        res.json(user);
    }

    function login(req, res) {
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials);
        req.session.currentUser = user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

    function updateUser(req, res) {
        var userId = Number(req.params.userId);
        var user = req.body;
        var userTemp = userModel.updateUser(userId, user);
        res.json(userTemp);
    }

    function findUserByUsername(req, res) {
        var username = req.params.username;
        var user = userModel.findUserByUsername(username);
        res.json(user);
    }

    function deleteUserById(req, res) {
        var userId= req.params.userId;
        var user = userModel.deleteUserById(userId);
        res.json(user);
    }

    function findAllUsers(req, res) {
        res.json(userModel.findAllUsers())
    }
};
