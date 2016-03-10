(function() {
    angular
        .module("MovieHubApp")
        .controller("MainController", mainController);

    function mainController($location) {
        var vm = this;

        function init() {
            vm.$location = $location;
        }
        init();
    }
})();
