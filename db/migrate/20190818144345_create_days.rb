class CreateDays < ActiveRecord::Migration[6.0]
  def change
    create_table :days do |t|
      t.datetime :day_name
      t.references :movie, null: false, foreign_key: true
      t.timestamps
    end
  end
end
