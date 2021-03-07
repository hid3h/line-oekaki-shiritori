class ApplicationController < ActionController::Base
  before_action :create_session

  def health
    render :json => {"eshiritori": "ok"}
  end

  private

  def create_session
    !!session[:user_id]
  end
end
