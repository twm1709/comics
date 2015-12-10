//Datos de la base
  var usuarios = [
  					{nombre: 'juan', apellido: 'gomez', user: 'admin', password: 'admin0', admin: 1, img: "img/interface/user.jpg"}, 
  					{nombre: 'pedro', apellido: 'ruiz', user: 'user', password: '123', admin: 0, img: "img/interface/user.jpg"}
				];

  var comics = [
            {id: 1, name: 'Amazing Fantasy', issue: 15, genre: 'Super-Heroes', creator: ['Stan Lee', 'Steve Ditko'], img: "img/comics/Amazing_Fantasy_Vol_1_15.jpg", rating: 4, views: 10, summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, ", characters: ['Spider-Man']}, 
            {id: 2, name: 'Action Comics', issue: 1, genre: 'Super-Heroes', creator: ['Jerry Siegel', 'Joe Schuster'], img: "img/comics/Action_Comics_1.jpg", rating: 3, views: 5, summary: " sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", characters: ['Superman']},
            {id: 3, name: 'Amazing Spider-Man', issue: 33, genre: 'Super-Heroes', creator: ['Stan Lee', 'Steve Ditko'], img: "img/comics/Amazing_Spider-Man_Vol_1_33.jpg", rating: 3, views: 1, summary: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat", characters: ['Spider-Man']},
            {id: 4, name: 'Detective Comics', issue: 27, genre: 'Super-Heroes', creator: ['Bill Finger', 'Bob Kane'], img: "img/comics/detective-comics27.jpg", rating: 5, views: 15, summary: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", characters: ['Batman']},
            {id: 5, name: 'Tomb Of Dracula', issue: 1, genre: 'Horror', creator: ['Bram Stoker'], img: "img/comics/tomb_of_dracula.jpg", rating: 2, views: 3, summary: "Excepteur sint occaecat cupidatat non proident, ", characters: ['Dracula']},
            {id: 6, name: 'Star Trek', issue: 3, genre: 'Sci-Fi', creator: ['IDW'], img: "img/comics/Star_Trek_3.jpg", rating: 1, views: 4, summary: "sunt in culpa qui officia deserunt mollit anim id est laborum.", characters: ['Kirk', 'Spock']}
        ];
  //var genres = ['Super-Heroes', 'Horror', 'Sci-Fi'];
  var characters = [
                {name:'Spider-Man', img:""}, 
                {name:'Superman', img:""}, 
                {name:'Dracula', img:""}, 
                {name:'Batman', img:""}, 
                {name:'Kirk', img:""}, 
                {name:'Spock', img:""}
              ];