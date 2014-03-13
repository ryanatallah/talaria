'use strict';

angular.module('talariaApp', [
  'ngResource',
  'ngRoute'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/read', {
        templateUrl: 'views/parser/index.html',
        controller: 'ParserCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
