class Image
  IMAGE_UPLOAD_BUCKET = 'line-oekaki-images'

  class << self
    def upload(data:)
      file_name = Digest::SHA1.hexdigest(data)

      split        = data.split(',')
      body         = split[1]
      content_type = get_content_type(split[0]) # "data:image/png;base64"
      key          = "img/" + file_name

      if Jets.env.production?
        S3.new(
          image_upload_bucket: IMAGE_UPLOAD_BUCKET
        ).put(
          body: body,
          key: key,
          content_type: content_type
        )
        return file_name
      end

      # ローカルの場合backendはdockerで閉じてるのでfrontend側に画像をアップするのは無理
      # 一旦file_nameだけ返しておく
      file_name
    end

    private

    def get_content_type(str)
      str2 = str.split(':')[1]
      str3 = str2.split(';')[0]
    end
  end
  
end
