Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get "/api/v1", to: 'application#health'

  namespace 'api' do
    namespace 'v1' do
      resources :images, only: [:create]
    end
  end
end
