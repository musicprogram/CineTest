class DaysController < ApplicationController
	before_action :set_day, only: [:destroy, :new, :create]

	def create
    @day = Day.create(day_params)
    @day.movie_id = @movie.id #asociando el id de la pelicula
    render json: @day
  end

	def destroy #destruir 
    @day = Day.find(params[:id])
    if @day.destroy
      head :no_content, status: :ok
    else
       render json: @day.errors, status: :unprocessable_entity
    end
  end

  private


  def set_day
    @movie = Movie.find(params[:movie_id]) # recupera el proyecto
    @day = Day.find(params[:id]) if params[:id] # recupera el id 
	end

  def day_params
    params.require(:day).permit(:day_name, :movie_id)
  end
end
