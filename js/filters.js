(function(){
	var app = angular.module('comics-filters', []);
	//Filtros
	  app.filter('stars', 
	      function() {
	        return function(cant) {
	          var aux = "";
	          for (i = 0; i < cant; i++)
	            aux += "<img src='img/interface/stars.png'/>";
	          aux = "Rating: " + cant;
	          return aux;
	        };
	      });
})();