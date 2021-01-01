class ApplicationController < ActionController::API
  def health
    render :json => {"eshiritori": "ok"}
  end
end
