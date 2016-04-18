// add q library
var q = require("q");

module.exports = function(db, mongoose) {
    // load review schema from review model
    var ReviewSchema = require("./review.schema.server.js")(mongoose);

    // create movie from schema
    var ReviewModel = mongoose.model("Review", ReviewSchema);

    var api = {
        findReviewsByImdbID: findReviewsByImdbID,
        findReviewsByUserId: findReviewsByUserId
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

    function findReviewsByUserId(userId) {
        var deferred = q.defer();

        ReviewModel
            .find(
                {userId: userId},
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
};
