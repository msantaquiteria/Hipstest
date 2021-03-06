angular.module('hipsTestApp', [])
.controller('TestQuestionCtrl', ['$scope', '$http', '$timeout', '$anchorScroll', '$location',
    function($scope, $http, $timeout, $anchorScroll, $location) {
        window.$scope = $scope;

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

            var apiRoute = '/question/random/';
            if ($scope.isSubjectslected() && $scope.currentSubject !== undefined)
                apiRoute += $scope.currentSubject.id;

            apiGET(apiRoute)
                .success( function(data) {
                    $('#question .MathJax').remove();
                    $scope.loadingNextQuestion = false
                    $scope.question = data.data;
                    $scope.question.answers = moveLastAnswers(shuffle($scope.question.answers));
                    $scope.question.answered = false;

                    $scope.questionHistory.push($scope.question);

                    // Scroll to the element
                    $location.hash('top');
                    $anchorScroll();

                    // Force Rerender of MathJax
                    $timeout ( function() { MathJax.Hub.Typeset("question") } );
                });
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

            $scope.loadingNextQuestion = true;
            $timeout( $scope.nextQuestion, 1000);
        }

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

        /*
            Busca las respuestas que probablemente tengan que ir ultimas y las coloca al final,
            tipicamente "Las anteriores son XXXX", "Todas las anteriores", ...

            Por ahora los criterios de eleccion son:
                * Contiene la palabra "anteriores"
        */
        function moveLastAnswers(answers) {
            var result = [];
            var atEndArr = [];
            var pendingIdx = [];

            answers.forEach( function(answer) {
                if (answer.contenido.indexOf('anteriores') >= 0)
                    atEndArr.push(answer);
                else
                    result.push(answer);
            });

            result = result.concat(atEndArr);
            return result;
        }

        /* SUBJECT HANDLING STUFF */
        $scope.subjectList = [];
        $scope.currentSubject = null;

        $scope.selectSubject = function(subject) {
            $scope.currentSubject = subject;
            // Cargamos una pregunta en base a la seleccion de asignatura
            $scope.nextQuestion();
        }

        $scope.getSubjectsList = function() {
            apiGET('/subject')
                .success( function(data) {
                    $scope.subjectList = data.data;
                });
        }

        // Helper para evitar confusiones y expresiones booleanas largas
        $scope.isSubjectslected = function() {
            return $scope.currentSubject !== null;
        }

        /* COMMON HELPERS */
        function apiGET(route) {
            return $http.get('/api' + route)
                    .error( function(err) {
                        console.log("ERROR: " + JSON.stringify(err));
                    });
        }

        /* INICIALIZACION DE LA APP, SIEMPRE AL FINAL*/
        $scope.init = function() {
            $scope.getSubjectsList();
            // A esto lo llamamos una vez se ha elegido asignatura, para evitar cargar una pregunta no deseada en el historial
            //$scope.nextQuestion();
        }
        $scope.init();
    }
]);

