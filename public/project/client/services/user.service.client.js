(function() {
    angular
        .module("MovieHubApp")
        .factory("UserService", userService);

    function userService($http, $rootScope) {

        var service = {
            findUserByCredentials: findUserByCredentials,
            findUserById: findUserById,
            findUsersByIds: findUsersByIds,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout: logout
        };

        return service;

        function findUserByCredentials(credentials) {
            return $http.post("/api/project/omdb/login", credentials);
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
            return $http.get("/api/project/omdb/user/"+ username);
        }

        function findAllUsers() {
            return users;
        }

        function createUser(user) {
            return $http.post("/api/project/omdb/register", user);
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
            return $http.put("/api/project/omdb/user/" + userId, user);
        }

        function getCurrentUser() {
            return $http.get("/api/project/omdb/loggedin");
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }

        function logout() {
            return $http.post("/api/project/omdb/logout");
        }
    }
})();
