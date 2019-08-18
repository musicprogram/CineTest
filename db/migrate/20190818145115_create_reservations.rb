class CreateReservations < ActiveRecord::Migration[6.0]
  def change
    create_table :reservations do |t|
      t.string :cc
      t.string :email
      t.string :name
      t.references :movie, null: false, foreign_key: true

      t.timestamps
    end
  end
end
