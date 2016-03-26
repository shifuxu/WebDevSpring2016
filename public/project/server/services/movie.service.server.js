module.exports = function(app, movieModel, userModel) {
    app.post("/api/project/user/:userId/movie/:imdbID", userLikesMovie);
    app.get("/api/project/movie/:imdbID/user", findUserLikes);

    function findUserLikes (req, res) {
        var imdbID = req.params.imdbID;
        var movie = movieModel.findMovieByImdbID(imdbID);
        if(movie) {
            var userLikes = movie.likes;
            var users = userModel.findUsersByIds(userLikes);
            movie.userLikes = users;
        }
        res.json(movie);
    }

    function userLikesMovie(req, res) {
        var movieOmdb  = req.body;
        var userId = req.params.userId;
        var imdbID = req.params.imdbID;
        var movie = movieModel.findMovieByImdbID(imdbID);
        if(!movie) {
            movie = movieModel.createMovie(movieOmdb);
        }
        if(!movie.likes) {
            movie.likes = [];
        }
        movie.likes.push(userId);

        var user = userModel.findUserById(userId);
        if(!user.likes) {
            user.likes = [];
        }
        user.likes.push(imdbID);
        res.send(200);
    }
};