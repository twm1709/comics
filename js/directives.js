(function(){

var app = angular.module('comics-directives', []);

//Directives
  

  app.directive('contentArea', function(){
    return{
      restrict: 'E',
      templateUrl: "views/interface/content-area.html"
    };
  });

  app.directive('advancedSearch', function(){
    return{
      restrict: 'E',
      templateUrl: "views/interface/advanced-search.html"
    };
  });
  
  app.directive('genreList', function(){
    return{
      restrict: 'E',
      templateUrl: "views/comics/genre-list.html"
    };
  });
  app.directive('characterList', function(){
    return{
      restrict: 'E',
      templateUrl: "views/comics/character-list.html"
    };
  });
  app.directive('userProfile', function(){
    return{
      restrict: 'E',
      templateUrl: "views/users/user-profile.html"
    };
  });
  app.directive('comicInfo', function(){
    return{
      restrict: 'E',
      templateUrl: "views/comics/comic-info.html"
    };
  });

  app.directive('comicsList', function(){
    return{
      restrict: 'E',
      templateUrl: "views/comics/comics-list.html"
    };
  });

  app.directive('sidebarTabsArea', function(){
    return{
      restrict: 'E',
      templateUrl: "views/interface/sidebar-tabs.html"
    };
  });

  app.directive('loginArea', function(){
    return{
      restrict: 'E',
      templateUrl: "views/users/login-area.html"/*,
      
      controller: function($scope,$rootScope, usuario){
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

                  },
      controllerAs: 'login'
      */
      
    };
  });

  app.directive('mainArea', function(){
    return{
      restrict: 'E',
      templateUrl: "views/interface/main-area.html"
    };
  });

  app.directive('footerArea', function(){
    return{
      restrict: 'E',
      templateUrl: "views/interface/footer-area.html"
    };
  });

  app.directive('headerArea', function(){
    return{
      restrict: 'E',
      templateUrl: "views/interface/header-area.html"
    };
  });

  app.directive('registerArea', function(){
    return{
      restrict: 'E',
      templateUrl: "views/users/register-area.html"/*,
      controller: function($scope, $rootScope, usuario){
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

        }*/
    }
  });

})();