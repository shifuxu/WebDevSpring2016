(function() {
    angular
        .module("FormBuilderApp")
        .directive("sortedDiv", sortedDiv);

    function sortedDiv($routeParams, FieldsService) {
        var start = null;
        var end = null;
        var formId = null;

        function init() {
            formId = $routeParams.formId;
        }
        init();

        function link (scope, element, attrs) {
            element = $(element);
            element.sortable({
                axis: "y",
                start: function(event, ui) {
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    scope.data.splice(end, 0, scope.data.splice(start, 1)[0]);
                    scope.$apply();
                    // achieve the new formId
                    init();
                    FieldsService
                        .updateFields(formId, scope.data)
                        .then(
                            function(response) {
                                // do nothing here
                            }
                        );
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