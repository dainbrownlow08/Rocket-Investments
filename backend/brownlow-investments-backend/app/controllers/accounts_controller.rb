class AccountsController < ApplicationController
  skip_before_action :authorized

  def index 
    accounts = Account.all
    render json: accounts
  end

  def create 
    account = Account.create(user_id: params["user_id"], name: "#{params["name"]} - #{params["accountType"]}")
    render json: account
  end

  def show 

  end

end
