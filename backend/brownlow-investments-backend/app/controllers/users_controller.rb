require "active_support/time"

class UsersController < ApplicationController
  skip_before_action :authorized, only: [:create, :accounts, :index, :show]

  def index
    users = User.all
    render json: users
  end

  def show 
      user = User.find(params[:id])
      # for each acc return a hash of k,v where keys are dates and values are total portfolio value for that day 
      today = DateTime.now

      accs = user.accounts


      accs.each do |acc|
        resp = {}
        trans = Transaction.where(:account_id => acc.id).group_by(&:date)
        if trans.keys[0] == nil
          resp={}
        else 
          first = trans.keys[0].to_s.split(" ")[0]
          last = DateTime.new(today.year,today.month,today.day).to_s.split("T")[0]
          dates = generate_date_range(first,last)
          dates.each do |day|
            dayArr = day.split("-")
            newDate = DateTime.new(dayArr[0].to_i,dayArr[1].to_i,dayArr[2].to_i)
            resp[newDate] = ""
          end
        end
        byebug

      end
    
  

      ############## - all days in range added to resp ^



      # trans = Transaction.where(:account_id => acc.id).group_by(&:date).map do |k,v| 
      #   tickers = v.group_by(&:symbol)
      #   [k,tickers]
      # end.to_h.map do |date,stocks|
      #   sums = stocks.map do |ticker,transactions|
      #     total = transactions.sum{|t| t.quantity * t.price}
      #     [ticker,total]
      #   end.to_h
      #   [date,sums]
      # end.to_h
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