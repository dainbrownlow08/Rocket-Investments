class User < ApplicationRecord
  has_secure_password
  has_many :accounts
  has_many :days, through: :accounts
  has_many :stocks, through: :days
end
