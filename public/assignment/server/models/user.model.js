var users = require("./user.mock.json");

module.exports = function () {
    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser
    };

    return api;

    function findUserByCredentials(credentials) {
        var username = credentials.username;
        var password = credentials.password;

        for (var u in users) {
            if (users[u].username == username && users[u].password == password) {
                return users[u];
            }
        }

        return null;
    }

    function findUserById(userId) {
        for (var u in users){
            if (users[u]._id == userId) {
                return users[u];
            }
        }

        return null;
    }

    function findUserByUsername(username) {
        for (var u in users){
            if (users[u].username == username) {
                return users[u];
            }
        }

        return null;
    }

    function findAllUsers() {
        return users;
    }

    function createUser(user) {
        var newUser = {
            _id: (new Date).getTime(),
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            roles: user.roles,
            email: user.email
        };

        users.push(newUser);
        return newUser;
    }

    function deleteUserById(userId) {
        var user = findUserById(userId);
        if (user != null) {
            users.splice(users.indexOf(user), 1);
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
            userTemp.roles = user.roles;
            userTemp.email = user.email;
            return userTemp;
        } else {
            return null;
        }
    }
};