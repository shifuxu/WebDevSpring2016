(function() {
    angular
        .module("MovieHubApp")
        .factory("UserService", userService);

    function userService($http, $rootScope) {

        var service = {
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            logout: logout,
            getProfile: getProfile,
            getUpdatedCurrentUser: getUpdatedCurrentUser
        };

        return service;

        function findUserByCredentials(credentials) {
            return $http.post("/api/project/omdb/login", credentials);
        }

        function findUserByUsername(username) {
            return $http.get("/api/project/omdb/user/"+ username);
        }

        function findAllUsers() {
            return $http.get("/api/project/omdb/user");
        }

        function createUser(user) {
            return $http.post("/api/project/omdb/register", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/project/omdb/" + userId);
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

        function getProfile() {
            return $http.get("/api/project/omdb/profile/" + $rootScope.currentUser._id);
        }

        function getUpdatedCurrentUser(userId) {
            return $http.get("/api/project/omdb/loggedin/" + userId);
        }
    }
})();
