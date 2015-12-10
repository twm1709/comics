(function(){
  var app = angular.module('comics-services', []);
  //Servicios
  var getUser = function(){

    if (!sessionStorage.usuario){
        return {logueado: false, info: ""};
      }
      else{
        return {logueado: true, info: JSON.parse(sessionStorage.usuario)};
      }
  };

  app.value('usuario', getUser());
  app.value('appData', {comics: [], genres: [], characters: []});
  /*
  angular.module('app')
    .factory('answer', function($q, $http, url) {
      return function(user) {
        var data = {
          nombre: 'juan', 
          apellido: 'gomez', 
          user: 'admin', 
          password: 'admin0', 
          admin: user.admin, 
          img: "img/interface/user.jpg"
        };
        return $http.post(url + '/answers', data)
          .then(function(response) {
            return response.data;
          },function(response) {
            return $q.reject(response.status + " " + response.data.error);
          });
      };
    });

  */
})();