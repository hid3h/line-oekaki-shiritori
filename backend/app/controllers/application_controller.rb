class ApplicationController < ActionController::Base
  def health
    render :json => {"eshiritori": "ok"}
  end
end
