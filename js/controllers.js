(function () {
  var Questionnaire = angular.module('Questionnaire');

  Questionnaire.controller('ListController', ['$scope', 'tempStorage', function($scope, tempStorage) {

    tempStorage.addQuestion({
      content: 'Do you like Angular JS?',
      options: [
        'Yes',
        'No'
      ]
    });

    $scope.questions = tempStorage.getQuestions();

    $scope.no_of_options = function (index) {
      return this.questions[index]['options'].length;
    }

  }]);

  Questionnaire.controller('AddController', ['$scope', 'tempStorage', function($scope, tempStorage) {

    $scope.question = {
      content: '',
      options: [],
      answer: null
    };

    $scope.no_of_options = 4;

    $scope.is_option_visible = function (index) {
      if (index < $scope.no_of_options) {
        return true;
      } else {
        return false;
      }
    };

    $scope.add_question = function () {
      
      if (!$scope.answer && $scope.answer < 0) {
        alert('Set one the options as correct answer!');
        return;
      }

      tempStorage.addQuestion($scope.question);

      $scope.question = {
        content: '',
        options: [],
        answer: null
      };
    }

  }]);
})();
