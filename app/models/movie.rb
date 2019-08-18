class Movie < ApplicationRecord
  belongs_to :day
  has_many :reservations
end
