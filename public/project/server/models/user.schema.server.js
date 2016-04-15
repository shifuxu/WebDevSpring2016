module.exports = function(mongoose) {

    var MovieSchema = require("./movie.schema.server.js")(mongoose);

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema(
        {
            username: String,
            password: String,
            firstName: String,
            lastName: String,
            email: String,
            role: String,
            // usernames of the people this person follows
            follows: [String],
            // imdb ids of movies this user likes
            likes: [String],
            // movies this user likes
            likesMovies: [MovieSchema]
        }, {collection: 'project.omdb.user'});

    return UserSchema;
};