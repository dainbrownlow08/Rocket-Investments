require "active_support/time"

class UsersController < ApplicationController
  skip_before_action :authorized, only: [:create, :accounts, :index, :show]

  def index
    users = User.all
    render json: users
  end

  def show 
      user = User.find(params[:id])
      render json: user
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


  #helpers - create date range for returning all plot points

  def valid_date?(dt)
    begin
      Date.parse(dt)
      true
    rescue => e
      false
    end
  end

  def generate_date_range(first, last)
    first, last = "", first unless last
    if last.nil? || last.empty?
      last = (Time.now - 1.day).in_time_zone('Kolkata').strftime("%Y-%m-%d")
    end
    if first.empty?
      first = Time.strptime(last, "%Y-%m-%d").in_time_zone('Kolkata').beginning_of_month.strftime("%Y-%m-%d")
    end
    (first..last).select { |d|  valid_date?(d) }
  end
  

  private 

  def user_params
      params.require(:user).permit(:username, :password)
  end

end