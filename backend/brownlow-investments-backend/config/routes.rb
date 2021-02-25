Rails.application.routes.draw do
  resources :transactions
  resources :users
  post '/sign_up', to: 'users#create'
  post '/login', to: 'auth#create'
  get '/persist', to: 'auth#show'
end
