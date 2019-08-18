class UI{
	formularioVista(){
		return `
				
				<form id="formNewMovie">
					<div class="form-group">
					<label>name</label>
						<input type="text" id="nameMovie" class="form-control" required>
					</div>
					<label>description</label>
						<input type="text" id="descriptionMovie" class="form-control" required>
					</div>
					<label>img</label>
						<input type="text" id="imgMovie" class="form-control" required>
					</div>
					<div class="form-group">
						<input type="submit" class="btn btn-info btn-block">
					</div>
				</form>	
			`
	}
}


module.exports = UI;