Rails.application.routes.draw do
  root 'static_pages#index'
  get '*path', to: 'static_pages#index'
end
