
(function() {
  'use strict';
  angular.module("portfolio",['ngAnimate'])
    .controller("MenuController",["$scope","$window","$document",function ($scope, $window, $document) {

      $scope.mainHeight={maxHeight:'0px',maxWidth:"100%"};

      $scope.init=function () {
        setTimeout(function () {
          $scope.$apply(function () {
            $scope.mainHeight={maxHeight:"400px", maxWidth:'700px',transition: "max-height, 3s"};
          });
        }, 200);
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
      setTimeout(function () {
        $scope.$apply(function () {
          $scope.menuItem[0].yStart=document.getElementById("section02").offsetTop;
          $scope.menuItem[0].yEnd=document.getElementById("section03").offsetTop;
          $scope.menuItem[1].yStart=document.getElementById("section03").offsetTop;
          $scope.menuItem[1].yEnd=document.getElementById("section04").offsetTop;
          $scope.menuItem[2].yStart=document.getElementById("section04").offsetTop;
          $scope.menuItem[2].yEnd=document.getElementById("section04").offsetTop+document.getElementById("section04").offsetHeight;
        });
      },3000);

      $scope.moveTo=function (target, offset) {
        var currentY=$scope.mainDiv.scrollTop;

        if(target) $scope.scroll.to  = document.getElementById(target).offsetTop;
        if(offset) $scope.scroll.to += document.getElementById(offset).offsetTop;

        clearInterval($scope.scroll.interval);
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
            $scope.scroll.to=null;
          }
        },1);
      };
      $scope.mainDiv.addEventListener('scroll', function () {
        $scope.$apply(function () {
          var currentY=$scope.mainDiv.scrollTop;
          if(currentY > 0 && currentY < $scope.contentStart){
            // force scroll zone
            if(currentY>$scope.scroll.current){
              if($scope.scroll.to){
                $scope.moveTo();
              } else{
                $scope.moveTo('section02');
              }
              $scope.mainHeight.maxHeight='100%';
              if(!$scope.visibleMenu.length){
                for (var i = 0; i < $scope.menuItem.length; i++) {
                  $scope.visibleMenu.push($scope.menuItem[i]);
                }
              }
            } else {
              $scope.moveTo('section00');
              $scope.mainHeight.maxHeight='400px';
              $scope.visibleMenu=[];
            }
          } else if (($scope.scroll.interval) &&
              ((currentY > $scope.scroll.current && currentY > $scope.scroll.to)||(currentY < $scope.scroll.current && currentY < $scope.scroll.to))){
            // $scope.moveTo() cancel event
            clearInterval($scope.scroll.interval);
            $scope.scroll.interval=null;
          }
          $scope.scroll.current=currentY;
          //portfolio side bar control
          if(currentY>$scope.menuItem[1].yStart && currentY+ $scope.mainDiv.clientHeight <$scope.menuItem[1].yEnd){
            document.querySelector('.side_bar').style.top=currentY-$scope.menuItem[1].yStart+20+"px";
          }
        });
      });
    }]);
}());
