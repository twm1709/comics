(function() {
  var app = angular.module('app', []);
  
  //Datos de la base
  var usuarios = [
  					{nombre: 'juan', user: 'admin', password: 'admin0', admin: 1}, 
  					{nombre: 'pedro', user: 'user', password: '123', admin: 1}
				];

  var comics = [
            {nombre: 'Amazing Fantasy', numero: 15, genero: 'Super-Heroes', creador: ['Stan Lee', 'Steve Ditko'], img: "img/comics/Amazing_Fantasy_Vol_1_15.jpg", cal: 4}, 
            {nombre: 'Action Comics', numero: 1, genero: 'Super-Heroes', creador: ['Jerry Siegel', 'Joe Schuster'], img: "img/comics/Action_Comics_1.jpg", cal: 3},
            {nombre: 'Amazing Spider-Man', numero: 33, genero: 'Super-Heroes', creador: ['Stan Lee', 'Steve Ditko'], img: "img/comics/Amazing_Spider-Man_Vol_1_33.jpg", cal: 3},
            {nombre: 'Detective Comics', numero: 27, genero: 'Super-Heroes', creador: ['Bill Finger', 'Bob Kane'], img: "img/comics/detective-comics27.jpg", cal: 5},
            {nombre: 'Tomb Of Dracula', numero: 1, genero: 'Terror', creador: ['Bram Stoker'], img: "img/comics/tomb_of_dracula.jpg", cal: 2}
        ];


  var crearBase = function(){
      if (!localStorage.usuarios){
        localStorage.usuarios = JSON.stringify(usuarios);
        localStorage.comics = JSON.stringify(comics);
      }
  };
  crearBase();

  //Servicios
  var verificarUsuario = function(){

    if (!sessionStorage.usuario){
        return {logueado: false, info: ""};
      }
      else{
        return {logueado: true, info: JSON.parse(sessionStorage.usuario)};
      }
  };

  var obtenerComics= function(){
    return JSON.parse(localStorage.comics);
  };

  app.value('usuario', verificarUsuario());
  app.value('comics', obtenerComics());
  

  //Filtros
  angular.module('app').filter('stars', function() {
                              return function(cant) {
                                var aux = "";
                                for (i = 0; i < cant; i++)
                                  aux += "<img src='img/interface/stars.png'/>";
                                
                                aux = "Rating: " + cant;
                                return aux;
                              };
                            });
  //Controladores
  app.controller('MainController', function($scope, $rootScope, usuario){
    $rootScope.logueado = usuario.logueado;
    $rootScope.usuarioActivo = usuario.info;
    if ($rootScope.usuarioActivo)
      $scope.usuario_nombre = $rootScope.usuarioActivo.nombre;
    $scope.logout = function(){
      sessionStorage.clear();
      $rootScope.logueado = false;
    };

  });

  app.controller('ComicsController', function($scope, comics){
    $scope.comics = comics;
  });

  app.controller('RegisterController', function($scope, $rootScope, usuario){
    $scope.user_input = "";
    $scope.clave_input = "";
    $scope.nombre_input = "";
    $scope.clave2_input = "";
    $scope.message = "";

    $scope.volver = function(){
      $rootScope.registrar = !$rootScope.registrar;
    };

    $scope.crearUsuario = function(){
      if ($scope.clave_input == $scope.clave2_input){
        lista_usuarios = JSON.parse(localStorage.usuarios);
        usuario_sel = lista_usuarios.filter(function(obj) { return obj.user == $scope.user_input; });
        
        if (usuario_sel.length == 0){
          usuario_nuevo = {nombre: $scope.nombre_input, user: $scope.user_input, password: $scope.clave_input, admin: 0};
          lista_usuarios.push(usuario_nuevo);
          localStorage.usuarios = JSON.stringify(lista_usuarios);
          $scope.message = "Usuario agregado";
          $scope.user_input = "";
          $scope.clave_input = "";
          $scope.clave2_input = "";
          $scope.nombre_input = "";
          
        }
        else{
          $scope.message = "Usuario ya existe";
        }
      }
      else{
        $scope.message = "Claves no coinciden";
      }

    };

  });
  
  app.controller('LoginController', function($scope,$rootScope, usuario){
    $scope.message = "";    
    $rootScope.logueado = usuario.logueado;
    $rootScope.registrar = false;

    $scope.login = function(){
      lista_usuarios = JSON.parse(localStorage.usuarios);
      usuario_sel = lista_usuarios.filter(function(obj) { return obj.user == $scope.user_input; });
      if (usuario_sel.length > 0){
        usuario_sel = usuario_sel[0];
        if (usuario_sel.password == $scope.clave_input){
          sessionStorage.usuario = JSON.stringify(usuario_sel);
          
          $rootScope.usuarioActivo = usuario_sel;
          //usuario.info = usuario_sel;
          $rootScope.logueado = true;
          $scope.user_input = "";
          $scope.clave_input = "";
        }
        else{
          $scope.message = "Clave incorrecta";
        }
      }
      else{
        $scope.message = "Usuario no existe";
      }
    };

    $scope.register = function(){
      $rootScope.registrar = !$rootScope.registrar;
      $scope.user_input = "";
      $scope.clave_input = "";
    };

  });

})();
