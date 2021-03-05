class Account < ApplicationRecord
  belongs_to :user
  has_many :days
  has_many :stocks, through: :days
end
