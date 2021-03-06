module.exports = function(app, reviewModel) {
    app.get("/api/project/review/movie/:imdbID", findReviewsByImdbID);
    app.get("/api/project/review/user/:username", findReviewsByUsername);
    app.post("/api/project/review/user/:username/movie/:imdbID", userReviewsMovie);
    app.delete("/api/project/review/:reviewId", deleteCommentById);

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
            .findReviewsByUsername(username)
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
        var title = req.body.title;
        var review = {
            username: username,
            imdbID: imdbID,
            title: title,
            content: content
        };

        reviewModel
            .userReviewsMovie(review)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteCommentById(req, res) {
        var reviewId = req.params.reviewId;

        reviewModel
            .deleteCommentById(reviewId)
            .then(
                function(doc) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
};
