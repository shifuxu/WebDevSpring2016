(function(){
    angular
        .module("FormBuilderApp")
        .config(configuration)

    function configuration($routeProvider) {
        $routeProvider
            .when("/register", {
                templateUrl: "views/users/register.view.html"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html"
            })
            .when("/home", {
                templateUrl: "views/home/home.view.html"
            })
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html"
            })
            .when("/form-fields", {
                templateUrl: "views/forms/form-fields.view.html"
            })
            .otherwise("/home")
    }
})();