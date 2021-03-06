class Image
  class << self
    def upload(data:)
      split = data.split(',')
      body  = split[1]

      image_data_binary = Base64.decode64(body)

      t = Tempfile.new
      t.binmode
      t << image_data_binary
      t.rewind

      uploader = PictureUploader.new
      uploader.store!(t)
      
      uploader.filename
    end

    private

    def get_content_type(str)
      str2 = str.split(':')[1]
      str3 = str2.split(';')[0]
    end
  end
  
end
