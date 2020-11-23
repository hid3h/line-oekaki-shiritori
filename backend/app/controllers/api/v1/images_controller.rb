class Api::V1::ImagesController < ApplicationController
  def create
    render :json => 'ok'
  end

  def index
    render :json => {test: 'oekimage getaki'}
  end
end
