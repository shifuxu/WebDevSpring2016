// add q library
var q = require("q");

module.exports = function(db, mongoose) {
    // load review schema from review model
    var ReviewSchema = require("./review.schema.server.js")(mongoose);

    // create movie from schema
    var ReviewModel = mongoose.model("Review", ReviewSchema);

    var api = {
        findReviewsByImdbID: findReviewsByImdbID,
        findReviewsByUsername: findReviewsByUsername,
        userReviewsMovie: userReviewsMovie
    };

    return api;

    function findReviewsByImdbID(imdbID) {
        var deferred = q.defer();

        ReviewModel
            .find(
                {imdbID: imdbID},
                function(err, docs) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(docs);
                    }
                }
            );

        return deferred.promise;
    }

    function findReviewsByUsername(username) {
        var deferred = q.defer();

        ReviewModel
            .find(
                {username: username},
                function(err, docs) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(docs);
                    }
                }
            );

        return deferred.promise;
    }

    function userReviewsMovie(review) {
        var deferred = q.defer();

        ReviewModel
            .create(
                review,
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                }
            );

        return deferred.promise;
    }
};
