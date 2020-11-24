require 'aws-sdk-s3'

class S3
  IMAGE_UPLOAD_BUCKET = 'line-oekaki-images'

  def initialize
    @s3 = Aws::S3::Resource.new(region: 'ap-northeast-1')
  end

  def put(data)
    split = data.split(',')
    body = split[1]

    file_name = Digest::SHA1.hexdigest(data)
    bucket = @s3.bucket(IMAGE_UPLOAD_BUCKET)
    obj = bucket.object('img/' + file_name)

    content_type = 'image/png'
    obj.put(body: Base64.decode64(body), content_type: content_type)
    file_name
  end
end
