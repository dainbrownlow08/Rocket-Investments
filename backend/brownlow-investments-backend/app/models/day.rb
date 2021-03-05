class Day < ApplicationRecord
  belongs_to :account
  has_many :stocks
end
