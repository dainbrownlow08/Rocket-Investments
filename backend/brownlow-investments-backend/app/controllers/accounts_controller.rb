class AccountsController < ApplicationController
  skip_before_action :authorized

  def index 
    accounts = Account.all
    render json: accounts
  end

  def create 
    today = Time.now.to_s.split(" ")[0]
    todayArr = today.split("-")
    today = DateTime.new(todayArr[0].to_i,todayArr[1].to_i,todayArr[2].to_i)

    account = Account.create(user_id: params["user_id"], name: "#{params["name"]} - #{params["accountType"]}")
    Day.create(date: today, account_id: account.id, cash: 0.0)
    render json: account
  end

  def getDays
    resp = {}
    accIds = params[:id].split(",")
    accIds.each do |id|
      acc = Account.find(id)
      resp[acc.name] = acc.days.last.id
    end
    render json: resp
  end

  def show
    today = Time.now.to_s.split(" ")[0]
    todayArr = today.split("-")
    today = DateTime.new(todayArr[0].to_i,todayArr[1].to_i,todayArr[2].to_i)

    #response in format {"SYMBOL":[ARRAY OF STOCK IDS THAT NEED TODAYS PRICE]}
    resp = {}

    accIds = params[:id].split(",")
    accIds.each do |id|
      account = Account.find(id.to_i)
      accountDays = account.days
      clone = accountDays.last
      accountDays = accountDays.map{|a| a.date}
      if clone.stocks == nil 
        resp = {}
      else
        cloneStocks = clone.stocks
        if !accountDays.include?(today)
          newDay = Day.create(account_id: id.to_i, date: today, cash: clone.cash, total: clone.total)
          cloneStocks.each do |stock|
            newStock = Stock.create(day_id: newDay.id, symbol: stock.symbol, quantity: stock.quantity, price: 0.0, sector: stock.sector)
            if !resp[stock.symbol]
              resp[stock.symbol] = [newStock.id]
            else
              resp[stock.symbol].push(newStock.id)
            end
          end
        end
      end
    end
    render json: resp
  end

end
