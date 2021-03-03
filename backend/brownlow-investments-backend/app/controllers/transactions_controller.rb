class TransactionsController < ApplicationController
  skip_before_action :authorized

  def index 
    transactions = Transaction.all
    render json: transactions
  end

  def create 
    transaction = Transaction.create(account_id: params["account"], symbol: params["symbol"], bos: params["bos"], quantity: params["transaction"]["quantity"].to_i)
    render json: transaction
  end

end
