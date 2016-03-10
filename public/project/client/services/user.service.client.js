(function() {
    angular
        .module("MovieHubApp")
        .factory("UserService", userService);

    function userService() {
        var users = [
            {   "_id":123,
                "firstName":"Alice",
                "lastName":"Wonderland",
                "username":"alice",
                "password":"alice",
                "email": "alice@alice.com"
            },
            {	"_id":234,
                "firstName":"Bob",
                "lastName":"Hope",
                "username":"bob",
                "password":"bob",
                "email": "bob@bob.com"
            }
        ];

        var service = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUsersByIds: findUsersByIds,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return service;

        function findUserByCredentials(username, password) {
            for (var u in users) {
                if (users[u].username == username && users[u].password == password) {
                    return users[u];
                }
            }

            return null;
        }

        function findUserById(userId, callback) {
            for (var u in users){
                if (users[u]._id == userId) {
                    return users[u];
                }
            }

            return null;
        }

        function findUsersByIds(userIds) {
            var usersTemp = [];
            for (var u in userIds) {
                var user = findUserById (userIds[u]);
                if (user) {
                    usersTemp.push ({
                        _id: user._id,
                        username: user.username,
                        password: user.password,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                    });
                }
            }
            return usersTemp;
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
                email: user.email
            };

            users.push(newUser);
            return newUser;
        }

        function deleteUserById(userId) {
            var user = findUserById(userId);
            if (user != null) {
                users.splice(users.indexOf(user), 1);
            } else {
                return null;
            }
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
    }
})();