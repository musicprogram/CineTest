class Reservation{
	constructor(cc,email,name, movie_id){
		this.cc = cc,
		this.email = email,
		this.name = name,
		this.movie_id = movie_id
	}
} // crear el objeto para mandarlo a rails 

module.exports = Reservation;