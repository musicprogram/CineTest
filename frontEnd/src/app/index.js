

require('./css/materialize.css'); // estilos materialize css
require('./css/styles.css'); // estilos personalizados css



const containerForm = document.querySelector('#containerForm');

const UI = require('./UI.js');

const ui = new UI()
// creando una clase UI  para vistas separadas

containerForm.innerHTML = ui.formularioVista();
////////////////////



/////////////////// Days fecha de Movie
const datepickerFecha = document.querySelector('#datepickerFecha');
const daysForm = document.querySelector('#daysForm');

$(document).ready(function(){
  $('.sidenav').sidenav();
  $('.modal').modal();

  // fechas para asignar los días de presentación de la pelicula
  const arrayDates = [] // array nuevo para agregar cada una de las fichas
	$('.datepicker').datepicker({
	  onClose(){
	    let fecha = $('.datepicker').val(); //capturar valior de la fecha
	    arrayDates.push(fecha) // push de la fecha al array
	    console.log(arrayDates)
	    daysForm.innerHTML += `
	    	<span class="new badge blue">
	    		${fecha}
	    	</span>
 
	    ` // agregar fechas en el formulario
	    datepickerFecha.value = ''; // limpiar el input flied de la fecha actual 

	    if(arrayDates.length >= 10){ // solo dejar agregar 10 fechas como máximo por pelicula
	    	datepickerFecha.style.display = 'none'; // desaparecer el campo de fechas
	    }
	  }
	})


})






//movies
const Movie = require('./movies/Movie.js');
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
const indexMovies = document.querySelector('#indexMovies');


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
	  const content = await rawResponse.json(); // el dato que se guardó
	 	// console.log(content)
	 	indexMovies.innerHTML += ui.MovieObject(content) //agregando el objeto pelicula a la vista
	})();


}






fetch(urlJson) // index
	.then(function(response){
		return response.json();
	})
	.then(function(movies){

		ui.indexMovies(movies);

	})




