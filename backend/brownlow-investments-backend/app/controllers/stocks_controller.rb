class StocksController < ApplicationController
  skip_before_action :authorized
end
