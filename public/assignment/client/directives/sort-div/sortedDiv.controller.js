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
                axis: "y"
                //start: function(event, ui) {
                //    start = ui.item.index();
                //    console.log("start: " + start);
                //},
                //stop: function(event, ui) {
                //    end = ui.item.index();
                //    console.log("end: " + end);
                //    var temp = scope.data[start];
                //    scope.data[start] = scope.data[end];
                //    scope.data[end] = temp;
                //    scope.$apply();
                //}
            });
        }
        return {
            restrict: 'E',
            scope: {
                data: '=',  // data binds to fields array
                remove: '&', // function binds to directive
                edit: '&' // function binds to directive
            },
            replace: true,
            templateUrl: "directives/sort-div/sortedDiv.view.html",
            controllerAs: 'model',
            link: link
        };
    }
})();