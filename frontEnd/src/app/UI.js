class UI{
	formularioVista(){
		return `
				
				<form id="formNewMovie">				
					<div class="input-field col s6">
			          <input  id="nameMovie" type="text" class="validate" >
			          <label for="nameMovie">Título</label>
			        </div>


			        <div class="input-field col s6">
			          <input  id="descriptionMovie" type="text" class="validate" >
			          <label for="descriptionMovie">Descripción</label>
			        </div>

			        <div class="input-field col s6">
			          <input  id="imgMovie" type="text" class="validate" >
			          <label for="imgMovie">Url Img</label>
			        </div>
		           <div class="input-field col s6">
			         <div id="daysForm"></div>
			        </div>
			        
			        <div class="input-field col s6">
			          <input type="text" class="datepicker datepicker-day" id="datepickerFecha">
			          <label for="imgMovie">Agregar Días</label>
			        </div>
			        
					<div class="input-field right">
						<button type="submit" class="btn waves-effect waves-light blue darken-1 white-text modal-close">
							Crear nueva Película
						</button>	
					</div>
					<br>
				</form>	

			`
	}




	indexMovies(movies){


		movies.forEach((movie)=>{
			return	indexView.innerHTML += this.MovieObject(movie)			
		})


	}



	MovieObject(movie){
		return `
				
				<div id="${movie.id}" class="col m3 s12">
				  <div class="card">
				    <div class="card-content">
					      <img src="${movie.img}" class="responsive-img">
					      <p class="center-align">
					      		${this.verificarBotonReserva(movie)}
		  		          
	  		          
  		          </p>	
		  		         
							
				    </div>
				  </div>
				</div>

		`
	}

	verificarBotonReserva(movie){
		if(movie.chair > 0 ){
			return `
				<button class="btn waves-effect waves-light blue modal-trigger" name="reservationButton" href="#ModalReservationNew" id="btnReserv${movie.id}">reservation</button>	
 					<small id="reservation${movie.id}" class="blue-text">${movie.chair}</small>
		 `
		}else {
			return ` `
		}
	}



	buscadorFecha(){
		return `			
					  <input type="text" class="datepicker-search" id="searchDay">
		`
	}

	reservationForm(){ //formulario de reservas
		return `  
			<form id="formReservation">       
			    <div class="input-field col s6">
			      <input  id="nameReservation" type="text" class="validate" >
			      <label for="nameMovie">Name</label>
			    </div>
			    <div class="input-field col s6">
			      <input  id="emailReservation" type="text" class="validate" >
			      <label for="descriptionMovie">Email</label>
			    </div>
			    <div class="input-field col s6">
			      <input  id="ccReservation" type="text" class="validate" >
			      <label for="imgMovie">CC</label>
			    </div>			       
			    <div class="input-field right">
			      <button type="submit" class="btn waves-effect waves-light blue darken-1 white-text modal-close">
			        Agregar Reserva
			      </button> 
			    </div>
			    <br>
			</form> 
		
		`
	}


	indexReservations(reservations){
		reservations.forEach((reservation)=>{
			return bodyIndexReserva.innerHTML += this.reservationItem(reservation)			
		})

	}



		reservationItem(reservation){
		
			 					
				return `
					 <tr>
				      <td>${reservation.movie_id}</td>
				      <td>${reservation.name}</td>
				      <td>${reservation.email}</td>
				      <td>${reservation.cc}</td>
				    </tr>	

				`

	

			
		}




}


module.exports = UI;

