
(function() {
  'use strict';
  angular.module("portfolio",['ngAnimate'])
    .controller("MenuController",["$scope","$window","$document",function ($scope, $window, $document) {

      $scope.topBottomHeight={height:'0'};
      $scope.mainHeight={maxHeight:'0'};

      $scope.init=function () {
        setTimeout(function () {
          $scope.$apply(function () {
            $scope.topBottomHeight={height:'50%'};
            $scope.mainHeight={maxHeight:'400px'};
          });
        },0);
      };

      $scope.mainDiv = document.querySelector('.mainDiv');
      $scope.contentStart = document.getElementById('menu01').offsetTop;
      $scope.scroll={current:0,to:null,interval:null};

      $scope.moveTo=function (target) {
        var currentY=$scope.mainDiv.scrollTop;
        $scope.scroll.to=document.getElementById(target).offsetTop;
        console.log("currentY",currentY);
        console.log("$scope.scroll.to",$scope.scroll.to);
        $scope.scroll.interval=setInterval(function () {
          if($scope.mainDiv.scrollTop<$scope.scroll.to-10){
            $scope.mainDiv.scrollTop+=3;
          }else if($scope.mainDiv.scrollTop<$scope.scroll.to){
            $scope.mainDiv.scrollTop+=1;
          }else if($scope.mainDiv.scrollTop>$scope.scroll.to+10){
            $scope.mainDiv.scrollTop-=3;
          }else if($scope.mainDiv.scrollTop>$scope.scroll.to){
            $scope.mainDiv.scrollTop-=1;
          }else{
            clearInterval($scope.scroll.interval);
            $scope.scroll.interval=null;
          }
        },1);
      };
      $scope.mainDiv.addEventListener('scroll', function () {
        var currentY=$scope.mainDiv.scrollTop;
        if($scope.mainDiv.scrollTop>0&&$scope.mainDiv.scrollTop<$scope.contentStart){
          if(currentY>$scope.scroll.current){
            $scope.$apply(function () {
              if(!$scope.scroll.interval){
                $scope.moveTo('menu01');
              }
              $scope.mainHeight={'max-height':'90%'};
            });
          }else{
            $scope.$apply(function () {
              if(!$scope.scroll.interval){
                $scope.moveTo('menu00');
              }
              $scope.mainHeight={'max-height':'400px'};
            });
          }
        }
        $scope.scroll.current=currentY;
      });
    }]);
}());
