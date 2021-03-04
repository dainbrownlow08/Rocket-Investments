class TransactionsController < ApplicationController
  skip_before_action :authorized

  def index 
    transactions = Transaction.all
    render json: transactions
  end

  def create 
    today = Date.today
    today = "#{today.year}-#{today.month}-#{today.day}"
    transaction = Transaction.create(account_id: params["account"], symbol: params["symbol"], bos: params["bos"], quantity: params["transaction"]["quantity"].to_i, price: params["price"], date: today )
    render json: transaction
  end

end
