module.exports = function(mongoose) {

    // use mongoose to declare a review schema
    var ReviewSchema = mongoose.Schema(
        {
            username: String,
            imdbID: String,
            // movie title
            title: String,
            content: String
        }, {collection: 'project.omdb.review'});

    return ReviewSchema;
};
