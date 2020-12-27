require 'aws-sdk-s3'

class S3
  def initialize(image_upload_bucket:)
    @image_upload_bucket = image_upload_bucket
    @client = Aws::S3::Client.new(region: 'ap-northeast-1')
  end

  def put(body:, key:, content_type:)
    @client.put_object({
      body:             Base64.decode64(body), 
      bucket:           @image_upload_bucket, 
      key:              key, 
      content_type:     content_type,
      content_encoding: 'base64'
    })
  end

  private

  def get_content_type(str)
    str2 = str.split(':')[1]
    str3 = str2.split(';')[0]
  end

end
