module.exports = function(app, db, mongoose) {

    var userModel = require("./models/user.model.server.js")(db, mongoose);
    var movieModel = require("./models/movie.model.server.js")(db, mongoose);
    var reviewModel = require("./models/review.model.server.js")(db, mongoose);

    var userService = require("./services/user.service.server.js") (app, movieModel, userModel);
    var movieService = require("./services/movie.service.server.js")(app, movieModel, userModel);
    var reviewService = require("./services/review.service.server.js")(app, reviewModel);
};