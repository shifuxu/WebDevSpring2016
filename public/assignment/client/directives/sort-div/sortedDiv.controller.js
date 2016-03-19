(function() {
    angular
        .module("FormBuilderApp")
        .directive("sortedDiv", sortedDiv);

    function sortedDiv() {
        var start = null;
        var end = null;
        function link (scope, element, attrs) {
            element = $(element);
            element.sortable({
                axis: "y",
                start: function(event, ui) {
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    scope.$apply();
                }
            });
        }
        return {
            restrict: 'E',
            scope: {
                data: '=',
                remove: '&',
                edit: '&'
            },
            replace: true,
            templateUrl: "directives/sort-div/sortedDiv.view.html",
            controllerAs: 'model',
            link: link
        };
    }
})();