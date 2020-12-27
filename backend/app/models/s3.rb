require 'aws-sdk-s3'

class S3
  def initialize(image_upload_bucket:)
    @image_upload_bucket = image_upload_bucket
    @client = Aws::S3::Client.new(region: 'ap-northeast-1')
  end

  def put(data)
    file_name = Digest::SHA1.hexdigest(data)

    split = data.split(',')
    body = split[1]
    content_type = get_content_type(split[0]) # "data:image/png;base64"
    key = "img/" + file_name

    @client.put_object({
      body: Base64.decode64(body), 
      bucket: @image_upload_bucket, 
      key: key, 
      content_type: content_type,
      content_encoding: 'base64'
    })
    file_name
  end

  private

  def get_content_type(str)
    str2 = str.split(':')[1]
    str3 = str2.split(';')[0]
  end

end
