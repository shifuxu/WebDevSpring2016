module.exports = function(app, ProjectUserModel, AssignmentUserModel, passport) {
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    // serialize the user object into the session
    function serializeUser(user, done) {
        done(null, user);
    }

    // retrieve the user object from the session
    function deserializeUser(user, done) {
        // determine which model should we use by judging whether the model contains
        // the attribute 'likes', if it has, then it will be for project; else, it
        // will be for assignment
        if(user.hasOwnProperty('likes')) {
            ProjectUserModel
                .findUserById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        } else {
            AssignmentUserModel
                .findUserById(user._id)
                .then(
                    function(user){
                        done(null, user);
                    },
                    function(err){
                        done(err, null);
                    }
                );
        }

    }
};