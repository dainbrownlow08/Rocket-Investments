class StocksController < ApplicationController
  skip_before_action :authorized

  def index
    stocks = Stock.all
    render json: stocks
  end

  def show
    stock = Stock.find(params[:id])
    render json: stock
  end

  def create
    day = Day.find(params["day"])
    if day.stocks.length != 0 
      dayStocks = day.stocks
      thisStock = dayStocks.find{|stock| stock.symbol == params["symbol"]}
      if thisStock != nil
        targetStock = thisStock
        if params["bos"] == "Bought"
          targetStock.update(quantity: targetStock.quantity + params["quantity"])
          render json: targetStock
        else
          if targetStock.quantity + params["quantity"] < 0
            render json: "Cannot sell stock you do not own 1".to_json
          elsif targetStock.quantity + params["quantity"] == 0
            targetStock.delete
            render json: "stock deleted".to_json
          else
            targetStock.update(quantity: targetStock.quantity + params["quantity"])
            render json: targetStock
          end
        end
      else
        if params["bos"] == "Bought"
          newStock = Stock.create(day_id: params["day"], symbol: params["symbol"], quantity: params["quantity"], price: params["price"], sector: params["sector"])
          render json: newStock
        else
          render json: "Cannot sell Stock you do not own 2".to_json
        end
      end
    else
      if params["bos"] == "Bought"
        newStock = Stock.create(day_id: params["day"], symbol: params["symbol"], quantity: params["quantity"], price: params["price"], sector: params["sector"])
        render json: newStock
      else
        render json: "Cannot sell Stock you do not own 3".to_json
      end
    end
  
  end

  def update
    stock = Stock.find(params[:id])
    stock.update(price: params[:price])

    render json: stock
  end
end
