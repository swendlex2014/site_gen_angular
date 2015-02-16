(function(app) {
    var configuration = function($routeProvider, $locationProvider){
        $routeProvider
        .when('/', { templateUrl: 'pages/_home.html', })
        .when('/alphabet/:ID', { templateUrl: 'pages/_alpha.html', })
        .when('/numero/:ID', { templateUrl: 'pages/_index.html', })
        .when('/chant/:ID', { templateUrl: 'pages/_chant.html', })        
        .when('/contact/', { templateUrl: 'pages/_contact.html', })        
        .otherwise({ redirectTo: '/' });
        $locationProvider.html5Mode(true);
    }
    app.config(['$routeProvider', '$locationProvider', configuration]); 
})(angular.module('wsapp'));