
(function() {
  'use strict';
  angular.module("portfolio",['ngAnimate'])
    .controller("MenuController",["$scope","$window","$document",function ($scope, $window, $document) {

      $scope.mainHeight={maxHeight:'0',maxWidth:"100%"};

      $scope.init=function () {
        setTimeout(function () {
          $scope.$apply(function () {
            $scope.mainHeight={maxHeight:"400px", maxWidth:'700px'};
          });
        },0);
        setTimeout(function () {
          $scope.$apply(function () {
            for (var i = 0; i < $scope.menuItem.length; i++) {
              $scope.welcomeMenu.push($scope.menuItem[i]);
            }
          });
        },3000);
      };

      $scope.mainDiv = document.querySelector('.mainDiv');
      $scope.contentStart = document.getElementById('section01').offsetTop;
      $scope.scroll={action:false,current:0,to:null,interval:null};

      $scope.visibleMenu=[];
      $scope.welcomeMenu=[];
      $scope.menuItem=[
        {name:"About Me"  , imgUrl:"images/menu_about.jpg"     , targetId:"section02"},
        {name:"Portfolio" , imgUrl:"images/menu_portfolio.png" , targetId:"section03"},
        {name:"Contact"   , imgUrl:"images/menu_contact.jpg"   , targetId:"section04"}
      ];

      $scope.moveTo=function (target) {
        var currentY=$scope.mainDiv.scrollTop;
        $scope.scroll.to=document.getElementById(target).offsetTop;
        console.log(target);
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
        if($scope.mainDiv.scrollTop > 0 && $scope.mainDiv.scrollTop < $scope.contentStart && !$scope.scroll.action){
          $scope.scroll.action=true;
          if(currentY>$scope.scroll.current){
            $scope.$apply(function () {
              if(!$scope.scroll.interval){
                $scope.moveTo('section02');
              }
              $scope.mainHeight.maxHeight='90%';
              for (var i = 0; i < $scope.menuItem.length; i++) {
                $scope.visibleMenu.push($scope.menuItem[i]);
              }
            });
          } else {
            $scope.$apply(function () {
              if(!$scope.scroll.interval){
                $scope.moveTo('section00');
              }
              $scope.mainHeight.maxHeight='400px';
              $scope.visibleMenu=[];
            });
          }
        } else if($scope.scroll.action && currentY>$scope.scroll.current && $scope.mainDiv.scrollTop > $scope.scroll.to){
          $scope.scroll.action=false;
          clearInterval($scope.scroll.interval);
        } else if($scope.mainDiv.scrollTop===0 || $scope.mainDiv.scrollTop>=$scope.contentStart){
          $scope.scroll.action=false;
        }
        $scope.scroll.current=currentY;
      });
    }]);
}());
