class Movie < ApplicationRecord
  
  has_many :days, dependent: :destroy
  has_many :reservations, dependent: :destroy



end
