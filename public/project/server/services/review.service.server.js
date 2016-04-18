module.exports = function(app, reviewModel) {
    app.get("/api/project/review/movie/:imdbID", findReviewsByImdbID);
    app.get("/api/project/review/user/:userId", findReviewsByUserId);

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

    function findReviewsByUserId(req, res) {
        var userId = req.params.userId;
        reviewModel
            .findReviewsByUserId(userId)
            .then(
                function(docs) {
                    res.json(docs);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
};
