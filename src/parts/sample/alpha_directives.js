(function(app) {
 var wsAlpha = function(){
 return {
 restrict: 'AE',
 controller : 'alphaCtrl',
 templateUrl : 'pages/alpha.html'
 };
 };
 
 app.directive('wsAlpha', wsAlpha);
 
 })(angular.module('wsapp'));
 