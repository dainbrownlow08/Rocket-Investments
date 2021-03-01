Rails.application.routes.draw do
  resources :accounts
  resources :transactions
  resources :users
  post '/sign_up', to: 'users#create'
  post '/login', to: 'auth#create'
  get '/persist', to: 'auth#show'
  get '/accounts/:user_id', to: 'users#accounts'
end
