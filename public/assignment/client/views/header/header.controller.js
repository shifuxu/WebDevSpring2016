(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", headerController);

    function headerController($location, $rootScope) {
        var vm = this;

        vm.logout = logout;

        function init() {
            vm.$location = $location;
        }
        init();

        function logout() {
            $rootScope.currentUser = null;
            $location.url("/home");
        }
    }
})();