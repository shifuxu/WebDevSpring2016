// add q library
var q = require("q");

module.exports = function(db, mongoose) {
    // load movie schema from movie model
    var MovieSchema = require("./movie.schema.server.js")(mongoose);

    // create movie from schema
    var MovieModel  = mongoose.model("Movie", MovieSchema);

    var movies = [];

    var api = {
        findMovieByImdbID: findMovieByImdbID,
        findMoviesByImdbIDs: findMoviesByImdbIDs,
        createMovie: createMovie,
        userLikesMovie: userLikesMovie
    };
    return api;

    function userLikesMovie (userId, movie) {
        var deferred = q.defer();

        MovieModel
            .findOne(
                {imdbID: movie.imdbID},
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    }

                    // if there's a movie
                    if (doc) {
                        // add id of user to the likes list of movie
                        doc.likes.push(userId);
                        // save changes
                        doc.save(
                            function(err, doc) {
                                if (err) {
                                    deferred.reject(err);
                                } else {
                                    deferred.resolve(doc);
                                }
                            }
                        );
                    } else {
                        // if there's no movie
                        // create a new instance
                        movie = new MovieModel({
                            imdbID: movie.imdbID,
                            title: movie.Title,
                            poster: movie.Poster,
                            likes: []
                        });

                        // add user to likes
                        movie.likes.push(userId);
                        // save new instance
                        movie.save(
                            function(err, doc) {
                                if (err) {
                                    deferred.reject(err);
                                } else {
                                    deferred.resolve(doc);
                                }
                            }
                        );
                    }
                }
            );

        return deferred.promise;
    }

    function findMoviesByImdbIDs (imdbIDs) {
        var deferred = q.defer();

        MovieModel.find(
            {imdbID: {$in: imdbIDs}},
            function (err, movies) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(movies);
                }
            }
        );

        return deferred.promise;
    }

    function createMovie(movie) {
        var deferred = q.defer();

        MovieModel
            .create(
                movie,
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

    function findMovieByImdbID(imdbID) {
        var deferred = q.defer();

        MovieModel
            .findOne(
                {imdbID: imdbID},
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