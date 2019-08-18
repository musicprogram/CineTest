const container = document.querySelector('#container');

const UI = require('./UI.js');

const ui = new UI()
// creando una clase UI  para vistas separadas

container.innerHTML = ui.formularioVista();
////////////////////

//movies
// const Movie = require('./Movie.js');
//// inputs del formulario
const nameMovie = document.querySelector('#nameMovie');
const descriptionMovie = document.querySelector('#descriptionMovie');
const imgMovie = document.querySelector('#imgMovie');


////////////////////

const formNewMovie = document.querySelector('#formNewMovie');

formNewMovie.addEventListener('submit', function(e){
	e.preventDefault();

	// let movie = new Movie(nameMovie.value, descriptionMovie.value, imgMovie.value) //generando un nuevo objeto de la clase movie
	// console.log(movie);

	postRails(nameMovie.value, descriptionMovie.value, imgMovie.value) // metodo para crear en la base de datos

	formNewMovie.reset() //formatear campos  
})


let urlJson = 'http://localhost:3000/movies'; // url api



function postRails(nameMovie,descriptionMovie,imgMovie){ //crear en la BD en rails

	(async () => {
	  const rawResponse = await fetch(urlJson, {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({
	    	name: nameMovie,
	    	description: descriptionMovie,
	    	img: imgMovie
	    })
	  });
	  // const content = await rawResponse.json(); // el dato que se guardó
	 
	})();


}





fetch(urlJson) // index
	.then(function(response){
		return response.json();
	})
	.then(function(movies){
		// console.log(users);
		console.log(movies)

	})




