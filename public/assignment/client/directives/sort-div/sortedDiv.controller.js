(function() {
    angular
        .module("FormBuilderApp")
        .directive("sortedDiv", sortedDiv);

    function sortedDiv(FieldsService, $routeParams) {
        var start = null;
        var end = null;
        var formId = $routeParams.formId;
        function link (scope, element, attrs) {
            element = $(element);
            element.sortable({
                axis: "y",
                start: function(event, ui) {
                    start = ui.item.index();
                },
                stop: function(event, ui) {
                    end = ui.item.index();
                    var temp = scope.data[start];
                    scope.data[start] = scope.data[end];
                    scope.data[end] = temp;
                    scope.$apply();
                    FieldsService
                        .updateFields(formId, scope.data)
                        .then(function(response) {
                            var fields = response.data;
                        });
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