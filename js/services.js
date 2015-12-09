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


})();