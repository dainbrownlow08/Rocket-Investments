Rails.application.routes.draw do
  resources :stocks
  resources :days
  resources :accounts
  resources :users
  post '/sign_up', to: 'users#create'
  post '/login', to: 'auth#create'
  get '/persist', to: 'auth#show'
  get '/accounts/:user_id', to: 'users#accounts'
  get '/users/distro/:user_id', to: 'users#distro'
  get '/accounts/days/:id', to: 'accounts#getDays'
  get '/users/news/:user_id', to: 'users#tickerNews'
end
