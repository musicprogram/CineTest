Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
	resources :movies do
		resources :days  #para que una pelicula pueda ser asignado a muchos días
	end

	resources :movies do
		resources :reservations
	end

end
