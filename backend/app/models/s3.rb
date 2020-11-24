require 'aws-sdk-s3'

class S3
  IMAGE_UPLOAD_BUCKET = 'line-oekaki-images'

  def initialize
    @s3 = Aws::S3::Resource.new(region: 'ap-northeast-1')
  end

  def put(data)
    file_name = Digest::SHA1.hexdigest(data)
    bucket = @s3.bucket(IMAGE_UPLOAD_BUCKET)
    obj = bucket.object('img/' + file_name)

    content_type = 'image/png'
    obj.put(body: data, content_type: content_type)
    file_name
  end
end
