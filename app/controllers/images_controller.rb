class ImagesController < ApplicationController
  def create
    p params
    respond_to do |format|
      format.json { render :json => { name: "yamada" } }
    end
  end
end
