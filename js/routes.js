(function(){
   var app = angular.module('comics-routes', ['ngRoute']);

   // routes
   app.config(function($routeProvider) {
	    $routeProvider
	      .when('/', {
	        templateUrl: '/views/interface/main-area.html'
	      })
	      .when('/login', {
	        templateUrl: '/views/users/login-area.html',
	      })
	      .when('/404', {
	        templateUrl: '/views/404.html'
	      })
	      .otherwise({
	        redirectTo: '/404'
	      });
	  });
  
})();