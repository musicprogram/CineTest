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
	          <label for="imgMovie">PostUrl</label>
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


		movies.forEach((movie, i)=>{
		return	indexMovies.innerHTML += `
				<li>
					${movie.name}
				</li>
	
			`
		})


	}



}


module.exports = UI;

