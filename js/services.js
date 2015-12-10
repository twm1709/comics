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
    return comics;
  };

  var getGenres= function(){
    return genres;
  };

  var getCharacters= function(){
    return characters;
  };

  app.value('usuario', getUser());
  app.value('comics', getComics());
  app.value('genres', ['Super-Heroes', 'Horror', 'Sci-Fi']);
  app.value('characters', getCharacters());


})();