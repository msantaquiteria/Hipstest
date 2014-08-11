angular.module('hipsTestApp', [])
.controller('TestQuestionCtrl', ['$scope', '$http', '$timeout', '$anchorScroll', '$location',
    function($scope, $http, $timeout, $anchorScroll, $location) {
        $scope.questionHistory = [];
        $scope.currentQuestionIdx = -1; // Question Index inside questionHisotry

        $scope.question = null;

        $scope.loadingNextQuestion = false;

        $scope.nCorrect = 0;
        $scope.nWrong = 0;
        $scope.correctPercentage = 0;
        $scope.wrongPercentage = 0;
        $scope.blankPercentage = 0;

        $scope.$watch('nCorrect', calcAnswersPercentage);
        $scope.$watch('nWrong', calcAnswersPercentage);

        $scope.$watch('currentQuestionIdx', processQuestionIdxChange);

        $scope.prevQuestion = function() {
            $scope.currentQuestionIdx--;
        };

        $scope.nextQuestion = function() {
            $scope.currentQuestionIdx++;
        };

        $scope.getRandomQuestion = function() {
            $scope.loadingNextQuestion = true;
            $http.get('/api/question/random')
                .success( function(data) {
                    $scope.loadingNextQuestion = false
                    $scope.question = data.data;
                    $scope.question.answers = shuffle($scope.question.answers);
                    $scope.question.answered = false;

                    $scope.questionHistory.push($scope.question);

                    // Scroll to the element
                    $location.hash('top');
                    $anchorScroll();

                    // Force Rerender of MathJax
                    $timeout ( function() { MathJax.Hub.Typeset("question") } );
                })
                .error( function(err) {
                    console.log("ERROR: " + JSON.stringify(err));
                })
        }

        $scope.pickAnswer = function(answer, $event) {
            if ($scope.question.answered)
                return;

            $scope.question.answered = true;
            answer.picked = true;

            if (!answer.correcta)
                $scope.nWrong++;
            else
                $scope.nCorrect++;

            $timeout( $scope.nextQuestion, 1000);
        }

        $scope.init = function() {
            $scope.nextQuestion();
        }
        $scope.init();

        var shuffle = function(o) { //v1.0 Cortesia de Google
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        };

        function calcAnswersPercentage() {
            $scope.correctPercentage = Math.ceil(100*$scope.nCorrect/($scope.questionHistory.length));
            $scope.wrongPercentage = Math.floor(100*$scope.nWrong/($scope.questionHistory.length));
            $scope.blankPercentage = 100 - ($scope.correctPercentage + $scope.wrongPercentage);
        }

        function processQuestionIdxChange(newIdx, oldIdx) {
            if (newIdx < 0)
            {
                $scope.currentQuestionIdx = oldIdx;
                return;
            }

            if (newIdx < $scope.questionHistory.length) // We are moving inside the history
                $scope.question = $scope.questionHistory[newIdx];
            else // Getting new remote question
                $scope.getRandomQuestion();
        }

    }
]);

