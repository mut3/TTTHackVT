'use strict';

describe('Controller: SearchtestCtrl', function () {

  // load the controller's module
  beforeEach(module('hackvtApp'));

  var SearchtestCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SearchtestCtrl = $controller('SearchtestCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
