'use strict';

angular.module('hackvtApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/map', {
        templateUrl: 'app/map/map.html',
        controller: 'MapCtrl'
      });
  });
