class ReservationsController < ApplicationController

	before_action :set_reservation, only: [:show,:destroy, :new, :create]


 def show
    @reservation = Reservation.find(params[:id])

    if stale?(last_modified: @reservation.updated_at) # muy importante
      render json: @reservation
    end
  end

	def create
    @reservation = Reservation.create(day_params)
    @reservation.movie_id = @movie.id #asociando el id de la pelicula
    render json: @reservation
  end

	def destroy #destruir 
    @reservation = Reservation.find(params[:id])
    if @reservation.destroy
      head :no_content, status: :ok
    else
       render json: @reservation.errors, status: :unprocessable_entity
    end
  end

  private


  def set_reservation
    @movie = Movie.find(params[:movie_id]) # recupera el proyecto
    @reservation = Reservation.find(params[:id]) if params[:id] # recupera el id 
	end

  def day_params
    params.require(:reservation).permit(:cc, :email, :name, :movie_id)
  end


end
