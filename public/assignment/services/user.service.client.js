(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", userService);

    function userService() {
        var users = [
            {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"]		},
            {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                "username":"bob",    "password":"bob",     "roles": ["admin"]		},
            {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]		},
            {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
            {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                "username":"ed",     "password":"ed",      "roles": ["student"]		}
        ];

        var service = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return service;

        function findUserByCredentials(username, password, callback) {
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

        function findUserByUsername(username, callback) {
            for (var u in users){
                if (users[u].username == username) {
                    return users[u];
                }
            }

            return null;
        }

        function findAllUsers(callback) {
            return users;
        }

        function createUser(user, callback) {
            var newUser = {
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                roles: user.roles
            };

            users.push(newUser);
            return newUser;
        }

        function deleteUserById(userId, callback) {
            var user = findUserById(userId);
            if (user != null) {
                users.pop(user);
            }
        }

        function updateUser(userId, user, callback) {
            var userTemp = findUserById(userId);
            if (userTemp != null) {
                userTemp.firstName = user.firstName;
                userTemp.lastName = user.lastName;
                userTemp.password = user.password;
                userTemp.username = user.username;
                userTemp.roles = user.roles;
            } else {
                return null;
            }
        }
    }
})();