let urlJson = 'http://localhost:3000/movies'

fetch(urlJson)
	.then(function(response){
		return response.json();
	})
	.then(function(movies){
		// console.log(users);
		console.log(movies)

	})