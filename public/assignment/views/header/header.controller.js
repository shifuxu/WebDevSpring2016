(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", headerController);

    function headerController($location, $scope, $rootScope) {
        $scope.$location = $location;
        $scope.logout = logout;

        function logout() {
            console.log("here");
            $rootScope.currentUser = null;
            $location.url("/home");
        }
    }
})();