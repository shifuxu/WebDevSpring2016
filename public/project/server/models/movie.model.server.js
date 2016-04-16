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
        userLikesMovie: userLikesMovie,
        userUnlikesMovie: userUnlikesMovie
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
                        // check userId is not in the exist likes array
                        // avoid duplicates
                        if (doc.likes.indexOf(userId) < 0) {
                            // add id of user to the likes list of movie
                            doc.likes.push(userId);
                            // save changes
                            doc.save(
                                function (err, doc) {
                                    if (err) {
                                        deferred.reject(err);
                                    } else {
                                        deferred.resolve(doc);
                                    }
                                }
                            );
                        }
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

    function userUnlikesMovie(userId, imdbID) {
        var deferred = q.defer();

        MovieModel
            .findOne(
                {imdbID: imdbID},
                function(err, doc) {
                    if (err) {
                        deferred.reject(err);
                    }
                    // found the movie
                    if (doc) {
                        var index = doc.likes.indexOf(userId);
                        // remove userid from likes array
                        if (index > -1) {
                            doc.likes.splice(index, 1);
                            // save the change
                            doc.save(
                                function(err, doc) {
                                    if (err) {
                                        deferred.reject(err);
                                    } else {
                                        deferred.resolve(doc);
                                    }
                                }
                            );
                        }
                    } else {
                        // do nothing here
                    }
                }
            );

        return deferred.promise;
    }
};