var users = require("./user.mock.json");

module.exports = function() {

    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        createUser: createUser,
        findUserById: findUserById,
        findUsersByIds: findUsersByIds,
        updateUser: updateUser
    };
    return api;

    function findUsersByIds (userIds) {
        var users = [];
        for (var u in userIds) {
            var user = findUserById (userIds[u]);
            if (user) {
                users.push ({
                    username: user.username,
                    _id: user._id
                });
            }
        }
        return users;
    }

    function findUserById(userId) {
        for(var u in users) {
            if( users[u]._id == userId ) {
                return users[u];
            }
        }
        return null;
    }

    function createUser(user) {
        var newUser = {
            _id: (new Date()).getTime(),
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        };
        users.push(newUser);
        return newUser;
    }

    function findUserByCredentials(credentials) {
        for(var u in users) {
            if( users[u].username == credentials.username && users[u].password == credentials.password) {
                return users[u];
            }
        }
        return null;
    }

    function updateUser(userId, user) {
        var userTemp = findUserById(userId);
        if (userTemp != null) {
            userTemp.firstName = user.firstName;
            userTemp.lastName = user.lastName;
            userTemp.password = user.password;
            userTemp.username = user.username;
            userTemp.email = user.email;
            return userTemp;
        } else {
            return null;
        }
    }

    function findUserByUsername(username) {
        for (var u in users){
            if (users[u].username == username) {
                return users[u];
            }
        }

        return null;
    }
};