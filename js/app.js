(function() {
  'use strict';
  angular.module("portfolio",['ngAnimate'])
    .controller("MenuController",["$scope","$window","$document",function ($scope, $window, $document) {
      $scope.topBottomHeight={'height':'50%'};
      $scope.mainHeight={'max-height':'400px'};
      $scope.scrollY=$window.scrollY;
      // $document.bind('scroll', function () {
      //   $scope.$apply(function () {
      //     $scope.topBottomHeight.height=$window.scrollY+"px";
      //     console.log($scope.topBottomHeight.height);
      //     $scope.scrollY=$window.scrollY;
      //   });
      // });
    }]);
}());
