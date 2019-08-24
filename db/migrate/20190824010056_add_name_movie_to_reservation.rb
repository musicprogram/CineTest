class AddNameMovieToReservation < ActiveRecord::Migration[6.0]
  def change
    add_column :reservations, :name_movie, :string
  end
end
