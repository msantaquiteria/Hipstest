angular.module('hipsTestApp', [])
.controller('TestQuestionCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.question = null;

    $scope.getRandomQuestion = function() {
        $http.get('/api/question/random')
            .success( function(data) {
                $scope.question = data.data;
            })
            .error( function(err) {
                console.log("ERROR: " + JSON.stringify(err));
            })
    }

    $scope.init = function() {
        $scope.getRandomQuestion();
    }
    $scope.init();
    
}]);

