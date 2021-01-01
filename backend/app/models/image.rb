class Image
  IMAGE_UPLOAD_BUCKET = 'line-oekaki-images'

  class << self
    def upload(data:)
      file_name = Digest::SHA1.hexdigest(data)

      split        = data.split(',')
      body         = split[1]
      content_type = get_content_type(split[0]) # "data:image/png;base64"
      key          = "img/" + file_name

      path = 'public/' + key
      File.open(path, "w+b") do |f|
        f.write(body)
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
