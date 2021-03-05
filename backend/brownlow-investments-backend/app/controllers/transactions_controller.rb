class TransactionsController < ApplicationController
  skip_before_action :authorized

  def index 
    transactions = Transaction.all
    render json: transactions
  end

  def create
    resp = 0
    acc = Account.find(params["account"])
    # validate transaction by going through quanitity owned of that stock and seeing if i have enough to sell
    #buy will always use cash or addtot total and make cash 0
    youOwn = Transaction.where(:account_id => params["account"]).where(:symbol => params["symbol"]).sum{|t| t.quantity}
    if(youOwn + params["transaction"]["quantity"] < 0)
      resp = ("You cannot sell more shares than you own.").to_json
    else
      if params["bos"] == "Sold"
        acc.update(cash: acc.cash + ((params["transaction"]["quantity"] *-1) * params["price"]))
        today = Date.today
        today = "#{today.year}-#{today.month}-#{today.day}"
        resp = Transaction.create(account_id: params["account"], symbol: params["symbol"], bos: params["bos"], quantity: params["transaction"]["quantity"], price: params["price"], date: today )
      else
        if acc.cash - (params["transaction"]["quantity"] * params["price"]) < 0
          acc.update(cash: 0)
          today = Date.today
          today = "#{today.year}-#{today.month}-#{today.day}"
          resp = Transaction.create(account_id: params["account"], symbol: params["symbol"], bos: params["bos"], quantity: params["transaction"]["quantity"], price: params["price"], date: today )
        else
          acc.update(cash: acc.cash - (params["transaction"]["quantity"] * params["price"]))
          today = Date.today
          today = "#{today.year}-#{today.month}-#{today.day}"
          resp = Transaction.create(account_id: params["account"], symbol: params["symbol"], bos: params["bos"], quantity: params["transaction"]["quantity"], price: params["price"], date: today )
        end
      end
    end
    render json: resp
  end
end
