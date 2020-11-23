class Api::V1::ImagesController < ApplicationController
  def post
    render :json => 'ok'
  end

  def index
    render :json => {test: 'oekimage getaki'}
  end
end
