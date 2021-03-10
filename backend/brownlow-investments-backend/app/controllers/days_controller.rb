class DaysController < ApplicationController
  skip_before_action :authorized

  def index
    days = Day.all
    render json: days
  end

  def show
    day = Day.find(params[:id])
    render json: day
  end

  def update
    day = Day.find(params[:id].to_i)
    if params["dow"] == "Deposit"
      day.update(cash: day.cash + params["amount"].to_f)
      render json: day
    else
      if day.cash - params["amount"].to_f < 0
        render json: "Not enough cash to complete transaction".to_json
      else
        day.update(cash: day.cash - params["amount"].to_f)
        render json: day
      end
    end
  end

end
