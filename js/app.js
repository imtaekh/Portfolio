
(function() {
  'use strict';
  angular.module("portfolio",['ngAnimate'])
    .controller("MenuController",["$scope","$window","$document", "$http",function ($scope, $window, $document, $http) {

      //keep my heroku project awake!!
      $scope.wakeUpHeroku = function() {
        $http.get("http://iballoon.herokuapp.com");
        $http.get("http://stalkerrr.herokuapp.com");
        $http.get("http://mcinemas.herokuapp.com");
      };
      $scope.wakeUpHeroku();
      setInterval(function (argument) {
        $scope.wakeUpHeroku();
      },300000);
      /////////////////////////////////

      $scope.mainHeight={maxHeight:'0px',maxWidth:"100%"};

      $scope.init=function () {
        setTimeout(function () {
          $scope.$apply(function () {
            $scope.mainHeight={maxHeight:"400px", maxWidth:'700px',transition: "max-height, 3s"};
            document.querySelector('.contact').style.height=document.querySelector('.container').clientHeight+"px";
          });
        }, 500);
        setTimeout(function () {
          $scope.$apply(function () {
            for (var i = 0; i < $scope.menuItem.length; i++) {
              $scope.welcomeMenu.push($scope.menuItem[i]);
            }
          });
        },3000);
      };

      $scope.mainDiv = document.querySelector('.mainDiv');
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
            $scope.mainDiv.scrollTop+=6;
          }else if($scope.mainDiv.scrollTop<$scope.scroll.to){
            $scope.mainDiv.scrollTop+=1;
          }else if($scope.mainDiv.scrollTop>$scope.scroll.to+10){
            $scope.mainDiv.scrollTop-=6;
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
          var currentY = $scope.mainDiv.scrollTop;
          var contentStart = document.getElementById('section01').offsetTop;
          if(currentY === 0){
            $scope.mainHeight.maxHeight='400px';
            $scope.visibleMenu=[];
          }else if(currentY > 0 && currentY < contentStart){
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
          var sideBarHeight = document.querySelector(".side_bar").clientHeight;
          var portfolioHeight = $scope.menuItem[1].yEnd-$scope.menuItem[1].yStart;
          if(currentY > $scope.menuItem[1].yStart && currentY < $scope.menuItem[1].yEnd-sideBarHeight){
            document.querySelector('.side_bar').style.top=currentY-$scope.menuItem[1].yStart+20+"px";
          } else if(currentY < $scope.menuItem[1].yStart && document.querySelector('.side_bar').style.top!="20px"){
            document.querySelector('.side_bar').style.top="20px";
          } else if(currentY > $scope.menuItem[1].yEnd-sideBarHeight){
            document.querySelector('.side_bar').style.top=portfolioHeight-sideBarHeight+"px";
          }
          // console.log("$scope.mainDiv.scrollTop: ",$scope.mainDiv.scrollTop);
          // console.log("$scope.mainDiv.scrollHeight: ",$scope.mainDiv.scrollHeight);
          // console.log("$scope.mainDiv.clientHeight: ",$scope.mainDiv.clientHeight);
          if($scope.mainDiv.scrollTop>=document.querySelector(".contact").offsetTop && $scope.stars.interval===null){
            $scope.stars.start();
            // console.log("Start");
          }
        });
      });
      $scope.stars = {
        MAX_COUNT: 4,
        INTERVAL_MILISECOND: 60,
        HEIGHT: undefined,
        TARGET: document.querySelector('#section04'),
        list:["MEAN STACK","MONGO DB","EXPRESS JS","ANGULAR JS", "NODE JS", "JAVASCRIPT", "SOCKET.IO"," METEOR JS", "RUBY ON RAILS", "RUBY", "POSTGRESQL", "JQUERY", "HTML/CSS", "BOOTSTRAP", "GIT/GITHUB"],
        frameCount: 0,
        interval: null,
        array:[],
        start: function () {
          if(!this.interval){
            this.HEIGHT=parseInt(document.querySelector('#section04').clientHeight/2);
            this.frameCount=0;
            this.generator();
            this.interval=setInterval(this.loop,this.INTERVAL_MILISECOND);
          }
        },
        generator: function () {
          // console.log("generator");
          if(this.array.length<this.MAX_COUNT){
            var div = document.createElement("div");
            div.innerHTML=this.list[parseInt(Math.random()*this.list.length-1)];
            div.className="star";
            div.style.left=(Math.random()*100)+"%";
            div.style.fontSize=25+parseInt(Math.random()*20)+"px";
            div.style.bottom="-1px";
            div.style.width="0px";
            div.style.transition=2+parseInt(Math.random()*3)+"s linear";
            div.style.color="rgb("+parseInt(Math.random()*256)+","+parseInt(Math.random()*256)+","+parseInt(Math.random()*256)+")";
            div.style.opacity=0.8;
            this.TARGET.appendChild(div);
            this.array.push(div);
          }
        },
        loop: function () {
          $scope.stars.frameCount++;
          if($scope.stars.frameCount%10===0){
            $scope.stars.generator();
          }
          $scope.stars.array.forEach(function (el,i,arr) {
            if(el!="deleted"){
              var percentage = parseInt(getComputedStyle(el).bottom)/$scope.stars.HEIGHT;
              // console.log(parseInt(el.style.bottom));
              if(parseInt(el.style.bottom)<0){
                el.style.bottom=$scope.stars.HEIGHT+"px";
                el.style.opacity=0;
              }
              if(percentage>=1){
                el.parentNode.removeChild(el);
                arr[i]="deleted";
              }
            } else {
              arr.splice(i,1);
              i--;
            }
          });
          if($scope.stars.array.length===0){
            // console.log("end");
            clearInterval($scope.stars.interval);
            $scope.stars.interval = null;
          }
        }
      };


    }]);
}());
