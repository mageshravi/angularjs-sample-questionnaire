(function() {
  var questions = [];
  var Questionnaire = angular.module('Questionnaire', ['ngRoute', 'ngSanitize']);

  Questionnaire.config([
    '$routeProvider',
    function ($routeProvider) {
      $routeProvider.
      when('/add', {
        templateUrl: 'partials/add.html',
        controller: 'AddController'
      }).
      when('/list', {
        templateUrl: 'partials/list.html',
        controller: 'ListController'
      }).
      when('/edit/:qnNo', {
        templateUrl: 'partials/edit.html',
        controller: 'EditController'
      }).
      when('/preview', {
        templateUrl: 'partials/preview.html',
        controller: 'PreviewController'
      }).
      otherwise({
        redirectTo: '/list'
      });
    }
  ]);

  Questionnaire.service(
    'tempStorage',
    function () {

      return {
        getQuestions: function () {
          return questions;
        },
        getQuestion: function (index) {
          if (index < questions.length) {
            return questions[index];
          } else {
            return false;
          }
        },
        addQuestion: function (qn) {
          questions.push(qn);
        },
        updateQuestion: function (qn, index) {
          if (index < questions.length) {
            questions[index] = qn;
          } else {
            throw "Question not found!";
          }
        },
        deleteQuestion: function (index) {
          if (index < questions.length) {
            questions.splice(index, 1);
          }
        },
      }
    }
  );

  Questionnaire.directive(
    'contenteditable',
    ['$sce', function($sce) {
      return {
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        link: function(scope, element, attrs, ngModel) {
          if (!ngModel) return; // do nothing if no ng-model

          // Specify how UI should be updated
          ngModel.$render = function() {
            element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
          };

          // Listen for change events to enable binding
          element.on('blur keyup change', function() {
            scope.$apply(function (){
              var html = element.html();
              // When we clear the content editable the browser leaves a <br> behind
              // If strip-br attribute is provided then we strip this out
              if ( attrs.stripBr && html == '<br>' ) {
                html = '';
              }
              ngModel.$setViewValue(html);
            });
          });

          // initialize
          ngModel.$render();
        }
      };
    }]);

})();
