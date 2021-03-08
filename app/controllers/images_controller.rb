class ImagesController < ApplicationController
  def create
    image_file_name = Image.upload(image_data_binary: image_data)

    respond_to do |format|
      format.json { render :json => { imageFileName: image_file_name } }
    end
  end

  private
  
  def image_data
    # 仕事メモ: bigqueryじどうせいせしuri_str.match(%r{data:(.*?);(.*?),(.*)$})
    split = params["imageData"].split(',')
    p "split", split
    body  = split[1]
    Base64.decode64(body)
  end
end
