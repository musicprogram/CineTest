class Movie < ApplicationRecord
  
  has_many :days
  has_many :reservations



end
