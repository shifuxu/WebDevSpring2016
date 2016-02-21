(function(){
    angular
        .module("FormBuilderApp")
        .config(configuration)

    function configuration($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "home/home.view.html"

            })
            .otherwise({
                redirectTo: "/home"
            })
    }
})();