module.exports = function(app, reviewModel) {
    app.get("/api/project/review/movie/:imdbID", findReviewsByImdbID);
    app.get("/api/project/review/user/:username", findReviewsByUsername);
    app.post("/api/project/review/user/:username/movie/:imdbID", userReviewsMovie);

    function findReviewsByImdbID(req, res) {
        var imdbID = req.params.imdbID;
        reviewModel
            .findReviewsByImdbID(imdbID)
            .then(
                function(docs) {
                    res.json(docs);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findReviewsByUsername(req, res) {
        var username = req.params.username;
        reviewModel
            .findReviewsByUserId(username)
            .then(
                function(docs) {
                    res.json(docs);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function userReviewsMovie(req, res) {
        var username = req.params.username;
        var imdbID = req.params.imdbID;
        var content = req.body.content;
        reviewModel
            .userReviewsMovie(username, imdbID, content)
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
