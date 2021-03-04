
class UsersController < ApplicationController
  skip_before_action :authorized, only: [:create, :accounts, :index, :show]

  def index
    users = User.all
    render json: users
  end

  def show 
      user = User.find(params[:id])
      acc = user.accounts.first
      trans = Transaction.where(:account_id => acc.id).group_by(&:date).map do |k,v| 
        tickers = v.group_by(&:symbol)
        [k,tickers]
      end.to_h.map do |date,stocks|
        sums =stocks.map do |ticker,transactions|
          total = transactions.sum{|t| t.quantity * t.price}
          [ticker,total]
        end.to_h
        [date,sums]
      end.to_h
      render json: trans
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


  private 

  def user_params
      params.require(:user).permit(:username, :password)
  end

end