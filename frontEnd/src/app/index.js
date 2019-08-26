
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

let arrayDates = [] // array nuevo para agregar cada una de las fechas , para agregarlo a la tabla Days




let urlMoviesson = 'http://localhost:3000/movies'; // url api

let urlDaysson = 'http://localhost:3000/days';

const urlReservation = 'http://localhost:3000/reservations';



fetch(urlMoviesson) // index de Movies
	.then(function(response){
		return response.json();
	})
	.then(function(movies){

		ui.indexMovies(movies);

	})


fetch(urlReservation) // index de Movies
	.then(function(response){
		return response.json();
	})
	.then(function(movies){

		ui.indexReservations(movies);

	})









$(document).ready(function(){


  $('.sidenav').sidenav();
  $('.modal').modal();
  $('.datepicker-search').datepicker({ /// Buscador principal
  	format: 'yyyy-mm-dd',
  	onClose(){ 	

  			let ObjSearch = $('#searchDay').val();  
  			BuscarMovieRails(ObjSearch);
  		
  	}
  })
  // fechas para asignar los días de presentación de la pelicula
  
	$('.datepicker').datepicker({
		 format: 'mm/dd/yyyy',
	  onClose(){
	    let fecha = $('.datepicker').val(); //capturar valior de la fecha
	    if($('.datepicker').val() != ''){ // se valida que la fecha no este vacía
	    	let fechaObj = (new Date(fecha))
		    const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
				let formatted_date = months[fechaObj.getMonth()] + " " + fechaObj.getDate() + " "  + fechaObj.getFullYear()
			
			if(arrayDates.includes(formatted_date)){ // se valida que no se repita la fecha 
				alert('No se puede repetir la misma fecha para la película')
				 datepickerFecha.value = ''; // limpiar el input flied de la fecha actual 
			} else{
				arrayDates.push(formatted_date)
				//console.log(arrayDates)
		    daysForm.innerHTML += `
		    	<span class="white-text badge blue">
		    		${formatted_date}
		    	</span>
	 
		    ` // agregar fechas en el formulario
		    datepickerFecha.value = ''; // limpiar el input flied de la fecha actual 

		    if(arrayDates.length >= 10){ // solo dejar agregar 10 fechas como máximo por pelicula
		    	datepickerFecha.style.display = 'none'; // desaparecer el campo de fechas
		    }

			}
		    
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

	postRails(movie, arrayDates) // metodo para crear en la base de datos , se le pasa el parametro con arrays de fechas

	formNewMovie.reset() //formatear campos  
	console.log(arrayDates) // ver el array de fechas
	daysForm.innerHTML = ''; // Limpiar el formulario con las fechas 
})




const indexView = document.querySelector('#indexView');


function postRails(movie, arrayDates){ //crear en la BD en rails
	$('.modal').modal('close');
	(async () => {
	  const rawResponse = await fetch(urlMoviesson, {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(movie)
	  });
	  const content = await rawResponse.json(); // el dato que se guardó
	 	// console.log(content)
	 	indexView.innerHTML += ui.MovieObject(content) //agregando el objeto pelicula a la vista
	 	postFormatDays(content,arrayDates)
	})();


}

const Day = require('./days/Day.js');

function postFormatDays(content,arrayDatesObject){
	arrayDatesObject.forEach((date)=>{
		let dayDate = new Day( date, content.id)
		postDays(dayDate)
	})

	arrayDates = [];
}








function postDays(dayDate){ //crear en la BD en rails

		

		(async () => {
		  const rawResponse = await fetch(urlDaysson, {
		    method: 'POST',
		    headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    body: JSON.stringify(dayDate)
		  });
		    const content = await rawResponse.json(); // el dato que se guardó
		 	console.log(content)
		 	// indexMovies.innerHTML += ui.MovieObject(content) //agregando el objeto pelicula a la vista

		})();



	


}






function BuscarMovieRails(ObjSearch){
	//console.log(ObjSearch)

	const UrlSearchMethod = `${urlMoviesson}?q%5Bdays_day_name_eq%5D=${ObjSearch}` 
	// Url para buscar, se le envía el objeto buscando dentro de los días que hay pelicula
	// console.log(UrlSearchMethod)

	fetch(UrlSearchMethod) // 
	.then(function(response){
		return response.json();
	})
	.then(function(movies){
		indexView.innerHTML = '' // limpiar lo que hay 
		ui.indexMovies(movies) // agregar las películas encontradas
		console.log(movies.length) // retorno de busqueda 

	})



}











/////////////// BUscador 


const buscadorFecha = document.querySelector("#buscadorFecha");

buscadorFecha.innerHTML = ui.buscadorFecha();






/////////////////////////////// Reservations

let cantidadSilla;

let idMovie; //id de rails que se selecciona con el boton de reserva



const reservationIndex = document.querySelector("#reservationIndex");

reservationIndex.innerHTML = ui.reservationForm();


indexView.addEventListener("click",(e)=>{
	e.preventDefault()
	AddReservation(e.target)
})

function AddReservation(target){  
	// console.log(target)
	if(target.name === 'reservationButton'){
		idMovie = target.parentElement.parentElement.parentElement.parentElement.id;  ///id de rails que es el identificador de cada elemento
		cantidadSilla = parseInt(target.nextSibling.nextElementSibling.innerHTML);
		console.log(cantidadSilla) // seleccionar la cantidad de sillas que hay en la pelicula 
	}
}


const formReservation = document.querySelector("#formReservation");
// console.log(formReservation);

const nameReservation = document.querySelector('#nameReservation');
const emailReservation = document.querySelector('#emailReservation');
const ccReservation = document.querySelector('#ccReservation');

const Reservation = require('./reservations/Reservation.js');

/////////
formReservation.addEventListener('submit', function(e){
	e.preventDefault()
	let reservation = new Reservation(ccReservation.value, emailReservation.value, nameReservation.value, idMovie);

	reservationpostRails(reservation); // fecta hacia rails
	formReservation.reset(); //resetear campos del formulario
})

function reservationpostRails(reservation){ //crear en la BD en rails

	$('.modal').modal('close');
	(async () => {
	  const rawResponse = await fetch(urlReservation, {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(reservation)
	  });
	    const content = await rawResponse.json(); // el dato que se guardó
	 		// console.log(content)
	 		actualizarSillaMovie(content)
	 	// indexMovies.innerHTML += ui.MovieObject(content) //agregando el objeto pelicula a la vista
	 		// console.log(content.movie_id)
	})();


}



function actualizarSillaMovie(content){ //actualizar Movie chair 
	(async () => {
		let contChair = cantidadSilla - 1
	  const rawResponse = await fetch(urlMoviesson + '/' + content.movie_id , {
	    headers: { "Content-Type": "application/json; charset=utf-8" },
		  method: 'PUT',
		  body: JSON.stringify({
		    chair: contChair
		  })
	  });
	  const result = await rawResponse.json(); // el dato que se guardó
	 	//console.log(result.data)
	 	actualizarContSilla(result.data)
	 	// console.log(result.message)
	 

	})();

}



function actualizarContSilla(data){ 
	let url = `#reservation${data.id}`
	let reservationSmall = document.querySelector(url);
	console.log(reservationSmall)
	reservationSmall.innerHTML = data.chair

	if(data.chair <= 0){
		let urlReserv = `#btnReserv${data.id}`;
		let urlReservQuitar = document.querySelector(urlReserv);
		urlReservQuitar.style.visibility = "hidden";
		reservationSmall.style.visibility = "hidden";
	}
}




////////////////////////////////// vistas peliculas y reservaciones , sidebar

const indexReservaView = document.querySelector("#indexReservaView");

const bodyIndexReserva = document.querySelector("#bodyIndexReserva");

const ReservationSidenav = document.querySelector('#ReservationSidenav');

const MovieSidenav = document.querySelector('#MovieSidenav');

const tituloApp = document.querySelector('#tituloApp');



ReservationSidenav.addEventListener('click', (e)=>{
	e.preventDefault()
	
	

	fetch(urlReservation) // index de Movies
	.then(function(response){
		return response.json();
	})
	.then(function(reservations){
		tituloApp.innerHTML = 'Reservaciones' // título 
		// console.log(reservations);
		indexView.innerHTML = '';
		bodyIndexReserva.innerHTML = '';
		indexView.style.display = "none";
		indexReservaView.style.display = "";
		ui.indexReservations(reservations);

	})



})

MovieSidenav.addEventListener('click', (e)=>{
	e.preventDefault()
	
	fetch(urlMoviesson) // index de Movies
	.then(function(response){
		return response.json();
	})
	.then(function(movies){
		tituloApp.innerHTML = 'Películas' // título 
		// console.log(movies)
		indexView.innerHTML = '';
		bodyIndexReserva.innerHTML = '';
		indexReservaView.style.display = "none";
		indexView.style.display = "";

		ui.indexMovies(movies);

	})




})