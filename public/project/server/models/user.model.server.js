var users = require("./user.mock.json");

module.exports = function() {

    var api = {
        findUserByCredentials: findUserByCredentials,
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
        user._id = "ID_" + (new Date()).getTime();
        users.push(user);
        return user;
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
};