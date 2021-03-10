require "active_support/time"

class UsersController < ApplicationController
  skip_before_action :authorized, only: [:create, :accounts, :index, :show, :distro, :tickerNews]

  def index
    users = User.all
    render json: users
  end

  def show 
      user = User.find(params[:id])
      accounts = user.accounts
      resp = {}
      accounts.map do |acc|
        resp[acc.name] = {}
        days = acc.days
        days.map do |day|
          dayTotal = day.stocks.sum{|stock| stock.price * stock.quantity} + day.cash 
          resp[acc.name] = {**resp[acc.name],"#{day.date}":  dayTotal}
        end
      end
      render json: resp
  end

  def tickerNews
    user = User.find(params[:user_id].to_i)
    stocks = user.stocks
    sampleStocks = []
    if stocks.length > 0
      stocks = stocks.map{|s| s.symbol}
      4.times do 
        sampleStocks.push(stocks.sample)
      end
      render json: sampleStocks
    else
      render json: stocks
    end
  end

  def create
      user = User.create(user_params)
      if user.valid? 
          my_token = encode_token({user_id: user.id})
          render json: {id: user.id, username: user.username, token: my_token}
      else 
          render json: {error:'failed to create a user'}
      end
  end

  def accounts 
    user = User.find(params[:id])
    accounts = user.accounts
    render json: accounts
  end

  def distro
    user = User.find(params[:user_id])
    accounts = user.accounts
    resp = {}
    accounts.map do |acc|
      day = acc.days.last
      if day.stocks.length == 0 
        resp = resp
      else
        stocks = day.stocks.each do |stock|
          if !resp[stock.sector]
            resp[stock.sector] = stock.quantity * stock.price
          else
            resp[stock.sector] += (stock.quantity * stock.price)
          end
        end
      end
    end
    render json: resp
  end

  private 

  def user_params
      params.require(:user).permit(:username, :password)
  end

end