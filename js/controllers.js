(function () {
  var Questionnaire = angular.module('Questionnaire');

  Questionnaire.controller('ListController', ['$scope', 'tempStorage', function($scope, tempStorage) {

    // tempStorage.addQuestion({
    //   content: 'Do you like Angular JS?',
    //   options: [
    //     'Yes',
    //     'No'
    //   ]
    // });

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

    $scope.no_of_options = 2;

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

      // remove options that are not required
      $scope.question.options = $scope.question.options.slice(0, $scope.no_of_options);

      tempStorage.addQuestion($scope.question);

      var $btn = $('button[type="submit"]');

      $btn.removeClass('btn-primary').addClass('btn-success').text('Added').attr('disabled', true);

      setTimeout(function (){
        $btn.removeClass('btn-success').addClass('btn-primary').text('Add').attr('disabled', false);
      }, 2000);

      // reset question
      $scope.question = {
        content: '',
        options: ['', '', '', '', ''],
        answer: null
      };
    }

  }]);

  Questionnaire.controller('EditController',
    ['$scope', '$routeParams', '$location', 'tempStorage',
    function($scope, $routeParams, $location, tempStorage) {

      $scope.question = tempStorage.getQuestion($routeParams.qnNo);
      $scope.no_of_options = $scope.question.options.length;

      $scope.is_option_visible = function (index) {
        if (index < $scope.no_of_options) {
          return true;
        } else {
          return false;
        }
      };

      $scope.update_question = function (){

        // remove options that are not required
        $scope.question.options = $scope.question.options.slice(0, $scope.no_of_options);

        tempStorage.updateQuestion($scope.question, $routeParams.qnNo);

        var $btn = $('button[type="submit"]');

        $btn.removeClass('btn-primary').addClass('btn-success')
          .text('Updated').attr('disabled', true);

        setTimeout(function (){
          $btn.removeClass('btn-success').addClass('btn-primary')
            .text('Update').attr('disabled', false);
        }, 2000);

      };

      $scope.delete_question = function () {
          if (confirm('Delete Question?')) {
            tempStorage.deleteQuestion($routeParams.qnNo);
            $location.path('/list');
          }
      };

    }]);

    Questionnaire.controller('PreviewController',
      ['$scope', 'tempStorage', function ($scope, tempStorage) {

        $scope.questions = tempStorage.getQuestions();

    }]);

})();
