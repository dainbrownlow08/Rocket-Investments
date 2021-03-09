class DaysController < ApplicationController
  skip_before_action :authorized

  def index
    days = Day.all
    render json: days
  end

end
