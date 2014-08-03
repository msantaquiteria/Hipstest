angular.module('hipsTestApp', [])
.controller('TestQuestionCtrl', ['$scope', '$http', '$timeout', '$anchorScroll', '$location',
    function($scope, $http, $timeout, $anchorScroll, $location) {
        $scope.question = null;
        $scope.answered = false;

        $scope.getRandomQuestion = function() {
            $http.get('/api/question/random')
                .success( function(data) {
                    $scope.question = data.data;
                    $scope.question.answers = shuffle($scope.question.answers);
                    $scope.answered = false;

                    // Scroll to the element
                    $location.hash('top');
                    $anchorScroll();
                })
                .error( function(err) {
                    console.log("ERROR: " + JSON.stringify(err));
                })
        }

        $scope.pickAnswer = function(answer, $event) {
            if ($scope.answered)
                return;

            $scope.answered = true;

            if (!answer.correcta)
                $($event.target).addClass("bg-wrong");

            $timeout( $scope.getRandomQuestion, 1000);
        }

        $scope.init = function() {
            $scope.getRandomQuestion();
        }
        $scope.init();

        var shuffle = function(o) { //v1.0 Cortesia de Google
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        };
    }
]);

