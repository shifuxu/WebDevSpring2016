(function() {
    angular
        .module("MovieHubApp")
        .factory("MovieService", movieService);

    function movieService(UserService) {
        var movies = [];

        var service = {
            userLikesMovie: userLikesMovie,
            findUserLikes: findUserLikes,
            findMovieByImdbID: findMovieByImdbID,
            findMoviesByImdbIDs: findMoviesByImdbIDs,
            createMovie: createMovie
        };

        return service;

        function userLikesMovie(userId, movie) {

        }

        function findUserLikes(imdbID) {
            var movie = findMovieByImdbID(imdbID);
            if(movie) {
                var userLikes = movie.likes;
                var users = UserService.findUsersByIds(userLikes);
                movie.userLikes = users;
            }
        }

        function findMovieByImdbID(imdbID) {
            for(var m in movies) {
                if(movies[m].imdbID === imdbID) {
                    return movies[m];
                }
            }
            return null;
        }

        function findMoviesByImdbIDs(imdbIDs) {
            var moviesTemp = [];
            for (var id in imdbIDs) {
                var movie = findMovieByImdbID(imdbIDs[id]);
                if (movie) {
                    moviesTemp.push({
                        _id: movie._id,
                        title: movie.title,
                        poster: movie.poster,
                        imdbID: movie.imdbID
                    });
                }
            }
            return moviesTemp;
        }

        function createMovie(movie) {
            movie = {
                _id: "ID_" + (new Date()).getTime(),
                imdbID: movie.imdbID,
                poster: movie.Poster,
                title: movie.Title
            };
            movies.push(movie);
            return movie;
        }
    }
})();
