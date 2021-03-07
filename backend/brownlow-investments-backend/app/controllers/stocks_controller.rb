class StocksController < ApplicationController
  skip_before_action :authorized

  def show
    stock = Stock.find(params[:id])
    render json: stock
  end

  def create
    
  end

  def update
    stock = Stock.find(params[:id])
    stock.update(price: params[:price])

    render json: stock
  end
end
