'use strict';

angular.module('talariaApp')
  .controller('ParserCtrl', function($scope, $timeout) {
    $scope.sourceText = 'Traditional reading involves publishing text in lines and moving your eyes sequentially from word to word. For each word, the eye seeks a certain point within the word, which we call the “Optimal Recognition Point” or ORP. After your eyes find the ORP, your brain starts to process the meaning of the word that you’re viewing. With each new word, your eyes move, called a “saccade”, and then your eyes seek out the ORP for that word. Once the ORP is found, processing the word for meaning and context occurs and your eyes move to the next word. When your eyes encounter punctuation within and between sentences, your brain is prompted to assemble all of the words that you have read and processes them into a coherent thought.';
    $scope.words = [];
    $scope.wordIndex = 0;
    $scope.readRate = 500;
    $scope.active = false;

    var focusMapping = function(length) {
      switch(length) {
        case 1:
          return 0;
        case 2:
        case 3:
        case 4:
          return 1;
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
          return 2;
        case 10:
        case 11:
        case 12:
        case 13:
          return 3;
      }
    };

    $scope.updateReader = function() {
      $scope.wordIndex++;
      if ($scope.wordIndex < $scope.words.length && $scope.active) {
        var newWord = $scope.words[$scope.wordIndex];
        $scope.partitionWord(newWord);
        $timeout($scope.updateReader, 1 / $scope.readRate * 60 * 1000);
      }
    };

    $scope.partitionWord = function(word) {
      var focusIndex = focusMapping(word.length);
      console.log('Focus for ' + word + ' at ' + focusIndex);
      $scope.wordLeft = word.slice(0,focusIndex);
      $scope.wordFocus = word[focusIndex];
      $scope.wordRight = word.slice(focusIndex + 1);
    };

    $scope.read = function() {
      $scope.words = $scope.sourceText.split(' ');
      $scope.wordIndex = 0;
      var word = $scope.words[$scope.wordIndex];
      $scope.partitionWord(word);
      $scope.active = true;
      $timeout($scope.updateReader, 1 / $scope.readRate * 60 * 1000);
    };

    $scope.stop = function() {
      $scope.active = false;
    };
  });

