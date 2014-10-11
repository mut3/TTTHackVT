'use strict';

angular.module('hackvtApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/images', {
        templateUrl: 'app/images/images.html',
        controller: 'ImagesCtrl'
      });
  });
