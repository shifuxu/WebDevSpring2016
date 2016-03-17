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
                //
                //    //var arr = [];
                //    //for (var d in scope.data) {
                //    //    arr.push(scope.data[d].type);
                //    //}
                //    //console.log(arr);
                //}
            });
        }
        return {
            restrict: 'E',
            scope: {
                data: '=',  // data binds to fields array
                remove: '&' // function binds to directive
            },
            replace: true,
            templateUrl: "directives/sortedDiv.html",
            link: link
        };
    }
})();