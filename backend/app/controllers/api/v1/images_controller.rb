class Api::V1::ImagesController < ApplicationController
  def create
    data = params[:data]
    file_name = S3.new().put(data)
    render :json => {key: file_name}
  end

  def index
    render :json => {test: 'oekimage2 getaki'}
  end
end
