class Api::V1::ImagesController < ApplicationController
  def create
    data = params[:data]
    file_name = Image.upload(data: data)
    render :json => {key: file_name}
  end

  def index
    render :json => {test: 'oekimage2 getaki'}
  end
end
