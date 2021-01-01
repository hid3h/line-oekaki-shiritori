class Api::V1::WebhookController < ApplicationController
  # https://developers.line.biz/ja/reference/messaging-api/#webhooks
  def receive
    unless validate_signature
      logger.error("不正リクエスト")
      return render status: 401, json: { status: 401, message: 'Unauthorized' }
    end
    
    line_event = LineEvent.new(events: params['events'])
    temp = BookSearchReplyer.new(line_event: line_event)
    temp.execute if temp.executable?

    render :json => 'ok'
  end

  def test 
    text = params[:text]
    res = BookSearcher.new(text: text).fetch
    render :json => { "readinglifetest": res}
  end

  private

  def validate_signature
    http_request_body = request.raw_post # Request body string
    hash = OpenSSL::HMAC::digest(OpenSSL::Digest::SHA256.new, channel_secret, http_request_body)
    signature = Base64.strict_encode64(hash)
    # Compare X-Line-Signature request header string and the signature
    signature == request.headers['X-Line-Signature']
  end

  def channel_secret
    ENV["LINE_CHANNEL_SECRET"] || Rails.application.credentials.line[:channel_secret]
  end
end

# {
#   "events"=>[
#     {
#       "type"=>"message",
#       "replyToken"=>"b55dbb48zzzzzz7fzzzzzz",
#       "source"=>{"userId"=>"Uc7zzzzzzzzzzzzzzzz", "type"=>"user"},
#       "timestamp"=>1602378060070,
#       "mode"=>"active",
#       "message"=>{"type"=>"text", "id"=>"112345677", "text"=>"起きた"}
#     }
#   ],