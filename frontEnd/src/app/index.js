$(document).ready(function(){
  $('.sidenav').sidenav();
  $('.modal').modal();

})

require('./css/materialize.css');
require('./css/styles.css');



const containerForm = document.querySelector('#containerForm');

const UI = require('./UI.js');

const ui = new UI()
// creando una clase UI  para vistas separadas

containerForm.innerHTML = ui.formularioVista();
////////////////////

//movies
const Movie = require('./Movie.js');
//// inputs del formulario
const nameMovie = document.querySelector('#nameMovie');
const descriptionMovie = document.querySelector('#descriptionMovie');
const imgMovie = document.querySelector('#imgMovie');


////////////////////

const formNewMovie = document.querySelector('#formNewMovie');

formNewMovie.addEventListener('submit', function(e){
	e.preventDefault();

	let movie = new Movie(nameMovie.value, descriptionMovie.value, imgMovie.value) //generando un nuevo objeto de la clase movie
	
	// console.log(movie);

	postRails(movie) // metodo para crear en la base de datos

	formNewMovie.reset() //formatear campos  
})


let urlJson = 'http://localhost:3000/movies'; // url api



function postRails(movie){ //crear en la BD en rails

	(async () => {
	  const rawResponse = await fetch(urlJson, {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(movie)
	  });
	  // const content = await rawResponse.json(); // el dato que se guardó
	 
	})();


}



const indexMovies = document.querySelector('#indexMovies');


fetch(urlJson) // index
	.then(function(response){
		return response.json();
	})
	.then(function(movies){

		ui.indexMovies(movies);

	})




