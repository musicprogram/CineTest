class MoviesController < ApplicationController
  def index
    @movies = Movie.all
    render json: @movies
  end

  def create
    @movie = Movie.create(movie_params)
    render json: @movie
  end

  def show
    @movie = Movie.find(params[:id])

    if stale?(last_modified: @movie.updated_at) # muy importante
      render json: @movie
    end
  end

  def destroy #destruir 
    @movie = Movie.find(params[:id])
    if @movie.destroy
      head :no_content, status: :ok
    else
       render json: @movie.errors, status: :unprocessable_entity
    end
  end

  private

  def movie_params
    params.require(:movie).permit(:name,:description, :img, :chair)
  end
end
