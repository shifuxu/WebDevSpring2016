(function(){
    angular
        .module("FormBuilderApp")
        .controller("SiderbarController", siderbarController);

    function siderbarController($location) {
        var vm = this;

        function init() {
            vm.$location = $location;
        }
        init();
    }
})();
