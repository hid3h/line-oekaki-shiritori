require 'aws-sdk-s3'

class S3
  IMAGE_UPLOAD_BUCKET = 'line-oekaki-images'

  def initialize
    @s3 = Aws::S3::Resource.new(region: 'ap-northeast-1')
  end

  def put(data)
    file_name = Digest::SHA1.hexdigest(data)
    bucket = s3.bucket(IMAGE_UPLOAD_BUCKET)
    obj = bucket.object(file_name)
    obj.put(body: data)
    file_name
  end
end
