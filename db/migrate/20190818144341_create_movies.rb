class CreateMovies < ActiveRecord::Migration[6.0]
  def change
    create_table :movies do |t|
      t.string :name
      t.string :description
      t.string :img
      t.integer :chair, :default => 10

      t.timestamps
    end
  end
end
