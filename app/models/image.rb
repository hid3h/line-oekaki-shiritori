class Image
  class << self
    def upload(image_data_binary:)
      t = Tempfile.new
      t.binmode
      t << image_data_binary
      t.rewind

      uploader = PictureUploader.new
      uploader.store!(t)
      
      uploader.filename
    end
  end
end
