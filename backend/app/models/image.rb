class Image
  IMAGE_UPLOAD_BUCKET = 'line-oekaki-images'

  class << self
    def upload(data:)
      p "upload start", Jets.env.production?, Jets.env.development?
      if Jets.env.production?
        return S3.new(
          image_upload_bucket: IMAGE_UPLOAD_BUCKET
        ).put(data)
      end
    end
  end
end
