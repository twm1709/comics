(function() {
  var app = angular.module('app', ['ngRoute','comics-directives', 'comics-services', 'comics-filters', 'comics-routes']);
  

  app.controller('MainController', function($scope, $rootScope, usuario, genres){
    $rootScope.logueado = usuario.logueado;
    $rootScope.usuarioActivo = usuario.info;
    $scope.viewUserProfile = false;
    $scope.viewComics = true;
    
    if ($rootScope.usuarioActivo)
      $scope.usuario_nombre = $rootScope.usuarioActivo.nombre;
    
    var createDB = function(){
      if (!localStorage.users){
        localStorage.users = JSON.stringify(usuarios);
        localStorage.comics = JSON.stringify(comics);
        localStorage.genres = JSON.stringify(genres);
        localStorage.characters = JSON.stringify(characters);
      }
    };
    createDB();
    
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
          $scope.apellido_input = "";
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
                  usuario_nuevo = {nombre: $scope.nombre_input, apellido: $scope.apellido_input, user: $scope.user_input, password: $scope.clave_input, admin: 0, img: '/img/interface/user.jpg'};
                  lista_usuarios.push(usuario_nuevo);
                  localStorage.users = JSON.stringify(lista_usuarios);
                  $scope.message = "User Added";
                  $scope.user_input = "";
                  $scope.clave_input = "";
                  $scope.clave2_input = "";
                  $scope.nombre_input = "";
                  $scope.apellido_input = "";
                  $scope.volver();
                  
                }
                else{
                  $scope.message = "User already exists";
                }
              }
              else{
                $scope.message = "Passwords don't match";
              }
              

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
    $scope.characters = characters;

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
      //$scope.viewGenres = false;
      $scope.viewAdvancedSearch = false;
      $scope.viewInfo = false;
    }
    
    $scope.listGenres = function(){
      $scope.selected_character = "";
      $scope.viewGenres = true;
      $scope.viewCharacters = false;
      $scope.viewComicList = false;
      $scope.viewInfo = false;
      $scope.viewAdvancedSearch = false;
    }

    $scope.selected_character = "";
    $scope.getCharacter = function(){
      return $scope.selected_character;
    };

    $scope.setCharacter= function(character){
      
      $scope.selected_character = character;
      $scope.viewComicList = true;
      $scope.viewAdvancedSearch = false;
      $scope.viewInfo = false;
    }
    
    $scope.listCharacters = function(){
      $scope.viewCharacters = true;
      $scope.viewGenres = false;
      $scope.viewComicList = false;
      $scope.viewInfo = false;
      $scope.viewAdvancedSearch = false;
      $scope.selected_genre = "";
    }

    $scope.mainTab = function(){
      $scope.showList();
      $scope.setGenre('');
      $scope.setCharacter('');
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

    $scope.addComic = function(){
      var newId = comics[comics.length - 1].id + 1;
      var newComic = {id: newId, name: $scope.newComicName, issue: $scope.newComicIssue, genre: $scope.newComicGenre, creator: $scope.newComicCreator, img: $scope.img, rating: $scope.rating, views: 0, summary: $scope.newComicSummary, characters: $scope.newComicCharacters};
      comics.push(newComic);
      localStorage.comics = JSON.stringify(comics);
      $scope.message = "Comic added";
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
  

})();
