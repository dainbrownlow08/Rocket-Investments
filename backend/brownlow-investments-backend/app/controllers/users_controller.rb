require "active_support/time"

class UsersController < ApplicationController
  skip_before_action :authorized, only: [:create, :accounts, :index, :show]

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
          dayTotal = day.stocks.sum{|stock| stock.price * stock.quantity}
          resp[acc.name] = {"#{day.date}":  dayTotal, **resp[acc.name]}
        end
      end
      render json: resp
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


  #helpers - create date range for returning all plot pointsy
  

  private 

  def user_params
      params.require(:user).permit(:username, :password)
  end

end