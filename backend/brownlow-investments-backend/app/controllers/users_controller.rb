
class UsersController < ApplicationController
  skip_before_action :authorized, only: [:create, :accounts]

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
    accounts = user.transactions.map{t => t.brokerage}.uniq
    render json: accounts
  end


  private 

  def user_params
      params.require(:user).permit(:username, :password)
  end

end