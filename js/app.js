(function() {
  var app = angular.module('app', ['ngRoute', 'comics-directives']);
  
  var createDB = function(){
      if (!localStorage.users){
        localStorage.users = JSON.stringify(usuarios);
        localStorage.comics = JSON.stringify(comics);
        localStorage.genres = JSON.stringify(genres);
        localStorage.characters = JSON.stringify(characters);
      }
  };
  createDB();


  angular.module('app')
  .config(function($routeProvider) {
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

  //Servicios
  var getUser = function(){

    if (!sessionStorage.usuario){
        return {logueado: false, info: ""};
      }
      else{
        return {logueado: true, info: JSON.parse(sessionStorage.usuario)};
      }
  };

  var getComics= function(){
    return JSON.parse(localStorage.comics);
  };

  var getGenres= function(){
    return JSON.parse(localStorage.genres);
  };

  var getCharacters= function(){
    return JSON.parse(localStorage.characters);
  };

  app.value('usuario', getUser());
  app.value('comics', getComics());
  app.value('genres', getGenres());
  app.value('characters', getCharacters());

  var createDB = function(){
      if (!localStorage.users){
        localStorage.users = JSON.stringify(usuarios);
        localStorage.comics = JSON.stringify(comics);
        localStorage.genres = JSON.stringify(genres);
      }
  };
  createDB();

  app.controller('LoginController', function($scope,$rootScope, usuario){
                    $scope.message = "";    
                    $rootScope.logueado = usuario.logueado;
                    $rootScope.registrar = false;

                    $scope.login = function(){
                      lista_usuarios = JSON.parse(localStorage.users);
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
              lista_usuarios = JSON.parse(localStorage.users);
              usuario_sel = lista_usuarios.filter(function(obj) { return obj.user == $scope.user_input; });
              
              if (usuario_sel.length == 0){
                usuario_nuevo = {nombre: $scope.nombre_input, user: $scope.user_input, password: $scope.clave_input, admin: 0};
                lista_usuarios.push(usuario_nuevo);
                localStorage.users = JSON.stringify(lista_usuarios);
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

  app.controller('MainController', function($scope, $rootScope, usuario){
    $rootScope.logueado = usuario.logueado;
    $rootScope.usuarioActivo = usuario.info;
    $scope.viewUserProfile = false;
    $scope.viewComics = true;
    
    if ($rootScope.usuarioActivo)
      $scope.usuario_nombre = $rootScope.usuarioActivo.nombre;
    $scope.logout = function(){
      sessionStorage.clear();
      $rootScope.logueado = false;
    };

    $scope.isAuthorized = function(){
      if ($rootScope.usuarioActivo.admin == 1)
        return true;
      else
        return false;
    };
    
    
    $scope.goToProfile = function(){
      $scope.viewUserProfile = true;
      $scope.viewComics = false;
    };

    $scope.goToComics = function(){
      $scope.viewUserProfile = false;
      $scope.viewComics = true;
    };

  });

  app.controller('ComicsController', function($scope, comics, genres, characters, orderByFilter){
    $scope.comics = comics;
    $scope.viewAdvancedSearch = false;
    $scope.viewUserProfile = false;
    $scope.viewGenres = false;
    $scope.viewComicList = true;
    $scope.viewInfo = false;
    $scope.genres = genres;
    $scope.getStarArray= function(stars){
      return new Array(stars);
    };

    $scope.predicate = 'name';
    $scope.reverse = false;
    $scope.order = function(predicate) {
      $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
      $scope.predicate = predicate;
    };
    
    $scope.selected_genre = "";
    $scope.getGenre = function(){
      return $scope.selected_genre;
    };

    $scope.setGenre= function(genre){
      $scope.selected_genre = genre;
      $scope.viewComicList = true;
      $scope.viewGenres = false;
      $scope.viewAdvancedSearch = false;
      $scope.viewInfo = false;
    }
    $scope.listGenres = function(){
      $scope.viewGenres = true;
      $scope.viewComicList = false;
      $scope.viewInfo = false;
      $scope.viewAdvancedSearch = false;
    }
    $scope.mainTab = function(){
      $scope.showList();
      $scope.setGenre('');
    }
    $scope.showList = function(){
      $scope.viewGenres = false; 
      $scope.viewComicList = true;
      $scope.viewInfo = false;
      $scope.viewAdvancedSearch = false;
    }
    $scope.getReverse = function(){
      if (!$scope.reverse)
        return 'Ascending';
      else
        return 'Descending';

    };
    $scope.setSelectedComic = function(comic){
      $scope.selectedComic = comic;
      $scope.viewInfo = true;
      $scope.viewComicList = false;
      $scope.viewGenres = false;
      $scope.viewAdvancedSearch = false;
      $scope.selectedComic.views++;
    };

    $scope.getComicName = function(){
      return $scope.selectedComic.name;
    };

    $scope.showAdvancedSearch = function(){
      $scope.viewInfo = false;
      $scope.viewComicList = false;
      $scope.viewGenres = false;
      $scope.viewAdvancedSearch = true;
    };

    $scope.listCharacters = function(){
      
    };

  });

  app.controller('TabController', function(){
    this.tab = 1;

    this.setTab = function(newValue){
      this.tab = newValue;
    };

    this.isSet = function(tabName){
      return this.tab === tabName;
    };
  });

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
