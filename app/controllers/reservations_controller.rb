class ReservationsController < ApplicationController
  def index
    @reservations = Reservation.all
    render json: @reservations
  end

  def create
    @reservation = Reservation.create(reservation_params)
    @reservation.name_movie = @reservation.movie.name
    @reservation.save
    render json: @reservation
  end


  private

  def reservation_params
    params.require(:reservation).permit(:cc, :email,:name ,:movie_id, :name_movie)
  end
end
